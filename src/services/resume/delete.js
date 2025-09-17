import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function deleteResumeById(id) {
    console.log('deleteResumeById', id)

    return await httpRequest.delete('/user-resumes/' + id)
}

export const useDeleteResume = () => {
    const { isPending: loading, mutateAsync: deleteResumeFn } = useMutation({
        mutationFn: id => deleteResumeById(id),
        onSuccess: (res, variables, context) => {
            const { documentId } = variables

            queryClient.setQueryData(['user-resumes'], cache => {
                if (!cache) return cache
                const { data, meta } = cache

                if (Array.isArray(data)) {
                    return {
                        data: data.filter(resume => resume.documentId !== documentId),
                        meta,
                    }
                }
            })
        },
    })

    const deleteResume = async (id, callbackOptions = {}) => {
        if (!id) {
            throw new Error('deleteResume requires an id')
        }

        return deleteResumeFn(id, callbackOptions)
    }

    return {
        loading,
        deleteResume,
    }
}
