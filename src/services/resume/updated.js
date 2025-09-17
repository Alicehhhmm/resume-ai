import httpRequest from '@/lib/axios-request'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'

export async function UpdateResumeDetail(id, data) {
    return await httpRequest.put('/user-resumes/' + id, {
        data,
    })
}

export const useUpdateResume = (options = {}) => {
    const { isPending: loading, mutateAsync: updateResumeFn } = useMutation({
        mutationFn: UpdateResumeDetail,
        onSuccess: (data, variables, context) => {
            const newData = data.data

            queryClient.setQueryData(['user-resumes', newData.resumeId], cache => {
                return cache ? [...cache, newData] : [newData]
            })
            options?.onSuccess?.(data, variables, context)
        },
        onError: (error, variables, context) => {
            options?.onError?.(error, variables, context)
        },
    })

    return {
        loading,
        updateResume: updateResumeFn,
    }
}
