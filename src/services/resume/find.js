import httpRequest from '@/lib/axios-request'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '@/lib/tanstack-query'
import qs from 'qs'

export async function GetResumeById(id) {
    return await httpRequest.get(`/resumes/${id}?`)
}

export const useGetResumeById = cvId => {
    const { data, error, isLoading, isPending, isFetching, isSuccess } = useQuery({
        queryKey: ['resume', cvId],
        queryFn: () => GetResumeById(cvId),
        enabled: !!cvId,
        select: res => res?.data,
    })

    return {
        error,
        resume: data ?? null,
        loading: isLoading || isPending || isFetching,
        isSuccess,
    }
}

/**
 * @param {*} userEmail
 * @returns
 *
 * @see https://docs.strapi.io/cms/api/rest/filters
 */
export async function GetUserResumes(userEmail) {
    const query = qs.stringify(
        {
            filters: {
                userEmail: {
                    $eq: userEmail,
                },
            },
            populate: '*',
            sort: ['updatedAt:desc'],
        },
        {
            encodeValuesOnly: true,
        }
    )

    return await httpRequest.get(`/resumes?${query}`)
}

export const useGetUserResumes = userEmail => {
    const { data, error, isLoading, isFetching, isPending } = useQuery({
        queryKey: ['resumes'],
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
