import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function deleteResumeById(id) {
    return await httpRequest.delete('/resumes/' + id)
}

export const useDeleteResume = () => {
    const { isPending: loading, mutateAsync: deleteResumeFn } = useMutation({
        mutationFn: ({ id }) => deleteResumeById(id),
        onSuccess: (response, variables, context) => {
            const { id } = variables

            queryClient.removeQueries({
                queryKey: ['resume', { id }],
                exact: true,
            })

            queryClient.setQueryData(['resumes'], cache => {
                if (!cache) return cache
                const { data, meta } = cache

                return {
                    data: data.filter(resume => resume.documentId !== id),
                    meta,
                }
            })
        },
    })

    const deleteResume = async (params, callbackOptions = {}) => {
        if (!params?.id) {
            throw new Error('deleteResume requires an id')
        }

        return deleteResumeFn(params, callbackOptions)
    }

    return {
        loading,
        deleteResume,
    }
}
