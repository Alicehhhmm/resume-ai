import httpRequest from '@/lib/axios-request'
import { useQuery } from '@tanstack/react-query'

/**
 * @param {*} userEmail
 * @returns
 *
 * @see https://docs.strapi.io/cms/api/rest/filters
 */
export async function GetUserResumes(userEmail) {
    return await httpRequest.get('/user-resumes?filters[userEmail][$eq]=' + userEmail)
}

export const useGetUserResumes = userEmail => {
    const { data, error, isLoading, isFetching, isPending } = useQuery({
        queryKey: ['user-resumes', userEmail],
        queryFn: () => GetUserResumes(userEmail),
        enabled: !!userEmail,
        select: res => res?.data ?? [],
    })

    return {
        error,
        resumes: data,
        loading: isLoading || isPending || isFetching,
    }
}
