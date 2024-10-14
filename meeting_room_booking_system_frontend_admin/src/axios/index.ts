import { service } from "./service"

const default_headers = 'Bearer'

const request = (option: any) => {
    const { url, method, params, data, headersType, responseType, ...config } = option
    return service({
        url: url,
        method,
        params,
        data,
        ...config,
        responseType: responseType,
        headers: {
            'Content-Type': headersType || default_headers
        }
    })
}

export default {
    get: async <T = any>(option: any) => {
        const res = await request({ method: 'GET', ...option })
        return res.data as unknown as T
    },
    post: async <T = any>(option: any) => {
        const res = await request({ method: 'POST', ...option })
        console.log('resresres',res);
        
        return res.data as unknown as T
    },
    postOriginal: async (option: any) => {
        const res = await request({ method: 'POST', ...option })
        return res
    },
    delete: async <T = any>(option: any) => {
        const res = await request({ method: 'DELETE', ...option })
        return res.data as unknown as T
    },
    put: async <T = any>(option: any) => {
        const res = await request({ method: 'PUT', ...option })
        return res.data as unknown as T
    },
    download: async <T = any>(option: any) => {
        const res = await request({ method: 'GET', responseType: 'blob', ...option })
        return res as unknown as Promise<T>
    },
    upload: async <T = any>(option: any) => {
        option.headersType = 'multipart/form-data'
        const res = await request({ method: 'POST', ...option })
        return res as unknown as Promise<T>
    }
}