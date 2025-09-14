import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function CreateNewResume(data) {
    return await httpRequest.post('/user-resumes', {
        data,
    })
}

export const useCreateResume = (options = {}) => {
    const { isPending: loading, mutateAsync: createResumeFn } = useMutation({
        mutationFn: CreateNewResume,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['user-resumes'] })
            options?.onSuccess?.(data, variables, context)
        },
        onError: (error, variables, context) => {
            options?.onError?.(error, variables, context)
        },
    })

    return {
        loading,
        createResume: createResumeFn,
    }
}
