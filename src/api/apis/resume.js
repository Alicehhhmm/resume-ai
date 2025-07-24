import httpRequest from '@/api/axios-qequest'

export async function CreateNewResume(data) {
    return await httpRequest.post('/user-resumes', {
        data,
    })
}

/**
 * @param {*} userEmail
 * @returns
 *
 * @see https://docs.strapi.io/cms/api/rest/filters
 */
export async function GetUserResumes(userEmail) {
    return await httpRequest.get('/user-resumes?filters[userEmail][$eq]=' + userEmail)
}
