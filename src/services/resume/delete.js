import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function deleteResumeById(id) {
    return await httpRequest.delete('/user-resumes/' + id)
}

export const useDeleteResume = () => {
    const { isPending: loading, mutateAsync: deleteResumeFn } = useMutation({
        mutationFn: deleteResumeById,
        onSuccess: (data, variables, context) => {
            const newData = data.data

            // 移除对应的 resume 详情缓存
            queryClient.removeQueries({ queryKey: ['user-resume', newData.removeId] })

            // 刷新用户简历列表缓存
            queryClient.setQueryData(['user-resumes'], cache => {
                if (!cache) return [newData]
                return cache.filter(resume => resume.resumeId !== newData.removeId)
            })
        },
    })

    return {
        loading,
        deleteResume: deleteResumeFn,
    }
}
