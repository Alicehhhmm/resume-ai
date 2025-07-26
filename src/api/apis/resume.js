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

export async function UpdateResumeDetail(id, data) {
    return await httpRequest.put('/user-resumes/' + id, {
        data,
    })
}

export async function GetResumeById(id) {
    return await httpRequest.get('/user-resumes/' + id + '?populate=*')
}

export async function DeleteResumeById(id) {
    return await httpRequest.delete('/user-resumes/' + id)
}
