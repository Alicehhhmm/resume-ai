import { debounce } from 'lodash-es'
import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function UpdateResumeDetail(id, data) {
    return await httpRequest.put('/resumes/' + id, {
        data,
    })
}

export const useUpdateResume = () => {
    const { isPending: loading, mutateAsync: updateResumeFn } = useMutation({
        mutationFn: ({ id, data }) => UpdateResumeDetail(id, data),
        onSuccess: (response, variables, context) => {
            const { data: newData, meta } = response

            queryClient.setQueryData(['resume', { id: newData.documentId }], newData)

            queryClient.setQueryData(['resumes'], cache => {
                if (!cache) return { data: [newData], meta }

                const { data } = cache

                if (Array.isArray(data)) {
                    return {
                        data: data.map(item => (item.documentId === variables.id ? { ...item, ...newData } : item)),
                        meta,
                    }
                }
            })
        },
    })

    // params： { id, data }
    const updateResume = async (params, callbackOptions = {}) => {
        if (!params.id || !params.data) {
            throw new Error('updateResume requires an object with id and data properties')
        }

        return updateResumeFn(params, callbackOptions)
    }

    return {
        loading,
        updateResume,
    }
}

export async function syncUpdateResume(resume) {
    const { documentId } = resume
    if (!documentId) return

    const response = await UpdateResumeDetail(documentId, resume)

    if (response) {
        const { data: newData, meta } = response

        queryClient.setQueryData(['resume', { id: documentId }], newData)

        queryClient.setQueryData(['resumes'], cache => {
            if (!cache) return { data: [newData], meta }

            return {
                data: [...cache.data, newData],
                meta,
            }
        })
    }
}

export const debouncedUpdateResume = debounce(syncUpdateResume, 1000)
