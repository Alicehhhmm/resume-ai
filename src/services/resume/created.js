import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function CreateNewResume(data) {
    return await httpRequest.post('/resumes', {
        data,
    })
}

export const useCreateResume = () => {
    const { isPending: loading, mutateAsync: createResumeFn } = useMutation({
        mutationFn: CreateNewResume,
        onSuccess: (response, variables, context) => {
            const { data: newData, meta } = response

            queryClient.setQueryData(['resume', { id: newData.documentId }], newData)

            queryClient.setQueryData(['resumes'], cache => {
                if (!cache) return { data: [newData], meta }

                return {
                    data: [...cache.data, newData],
                    meta,
                }
            })
        },
    })

    const createResume = async (data, callbackOptions = {}) => {
        if (!data) {
            throw new Error('createResume requires data')
        }
        return createResumeFn(data, callbackOptions)
    }

    return {
        loading,
        createResume,
    }
}
