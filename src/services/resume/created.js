import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function CreateNewResume(data) {
    return await httpRequest.post('/user-resumes', {
        data,
    })
}

export const useCreateResume = () => {
    const { isPending: loading, mutateAsync: createResumeFn } = useMutation({
        mutationFn: data => CreateNewResume(data),
        onSuccess: (res, variables, context) => {
            const newData = res.data

            queryClient.setQueryData(['user-resumes'], cache => {
                if (!cache) return cache
                const { data, meta } = cache

                if (Array.isArray(data)) {
                    return {
                        data: [...data, newData],
                        meta,
                    }
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
