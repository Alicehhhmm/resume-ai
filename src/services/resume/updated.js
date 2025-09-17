import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function UpdateResumeDetail(id, data) {
    return await httpRequest.put('/user-resumes/' + id, {
        data,
    })
}

export const useUpdateResume = () => {
    const { isPending: loading, mutateAsync: updateResumeFn } = useMutation({
        mutationFn: ({ id, data }) => UpdateResumeDetail(id, data),
        onSuccess: (res, variables, context) => {
            const newData = res.data

            queryClient.setQueryData(['user-resumes'], cache => {
                if (!cache) return cache
                const { data, meta } = cache

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
