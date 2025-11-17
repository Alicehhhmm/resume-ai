import { debounce } from 'lodash-es'
import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function UpdateResumeDetail(id, data) {
    return await httpRequest.put(`/resumes/${id}`, { data })
}

/**
 * 同步更新 React Query 缓存
 * 同时更新详情缓存和列表缓存，保证数据一致性
 * @param {Object} updatedResume - 更新后的简历数据
 * @param {Object} meta - 响应元数据
 */
function syncResumeCache(updatedResume, meta) {
    const { documentId } = updatedResume

    if (!documentId) return

    queryClient.setQueryData(['resume', { id: documentId }], updatedResume)

    queryClient.setQueryData(['resumes'], cache => {
        if (!cache?.data || !Array.isArray(cache.data)) {
            return { data: [updatedResume], meta }
        }

        const updatedList = cache.data.map(item => (item.documentId === documentId ? { ...item, ...updatedResume } : item))

        return { data: updatedList, meta }
    })
}

/**
 * 手动更新简历 Hook
 * 用于需要用户主动触发的更新场景（如保存按钮）
 * @returns {Object} { loading, updateResume }
 * @signature updateResume(params, callbackOptions?) => Promise<void>
 * @param {Object} params - 更新参数
 * @param {string} params.id - 简历 ID
 * @param {Object} params.data - 更新数据
 * @param {Object} [callbackOptions] - ( 用于自定义响应提示 ) 具体配置可查阅 TanStack Query 回调选项
 * @example
 * const { loading, updateResume } = useUpdateResume()
 * await updateResume({ id: '123', data: { title: '新标题' } })
 */
export const useUpdateResume = () => {
    const { isPending: loading, mutateAsync } = useMutation({
        mutationFn: ({ id, data }) => UpdateResumeDetail(id, data),
        onSuccess: response => {
            const { data: updatedResume, meta } = response
            syncResumeCache(updatedResume, meta)
        },
    })

    const updateResume = async (params, callbackOptions = {}) => {
        if (!params.id || !params.data) {
            throw new Error('updateResume requires an object with id and data properties')
        }

        return mutateAsync(params, callbackOptions)
    }

    return { loading, updateResume }
}

/**
 * 自动同步更新简历
 * 用于无需用户感知的后台自动保存场景
 * @param {Object} resume - 完整的简历对象（必须包含 documentId）
 * @returns {Promise<void>}
 */
export async function syncUpdateResume(resume) {
    const { documentId } = resume

    if (!documentId) return

    const response = await UpdateResumeDetail(documentId, resume)

    if (response) {
        const { data, meta } = response
        syncResumeCache(data, meta)
    }
}

/**
 * 防抖版简历更新
 * 用于频繁触发的场景（如输入框实时保存）
 * @type {Function}
 */
export const debouncedUpdateResume = debounce(syncUpdateResume, 1000)
