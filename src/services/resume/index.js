import httpRequest from '@/lib/axios-request'

export * from './find'
export * from './created'
export * from './delete'
export * from './updated'

export async function GetResumeById(id) {
    return await httpRequest.get('/user-resumes/' + id + '?populate=*')
}
