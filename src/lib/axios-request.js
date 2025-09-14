import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
const Token = import.meta.env.VITE_STRAPI_API_KEY

/**
 * Default configurations
 * @type {import('axios').AxiosRequestConfig }
 */

const httpRequestConfig = {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Token}`,
    },
    timeout: 1000 * 60, // 1 minute
}

const httpRequest = axios.create(httpRequestConfig)

/**
 * Request interceptor configurations
 */
httpRequest.interceptors.request.use(
    config => {
        // TODO: Add any request-specific configurations here
        // For example:
        // - Daynamicly get or set Token
        // - you can add a loading indicator or log the request
        return config
    },
    error => {
        console.error('[Axios Request interceptor ERROR]:', error)
        return Promise.reject(error)
    }
)

/**
 * Response interceptor configurations
 */
httpRequest.interceptors.response.use(
    response => {
        // TODO: Handle successful response
        return response.data
    },
    error => {
        // TODO: Handle error response
        // useing: handleHttpError(error) => return: Uniform custom response message
        return Promise.reject(error)
    }
)

export { httpRequestConfig, httpRequest }

export default httpRequest
