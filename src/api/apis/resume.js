import httpRequest from '@/api/axios-qequest'

export async function CreateNewResume(data) {
    return await httpRequest.post('/user-resumes', {
        data,
    })
}
