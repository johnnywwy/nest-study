import request from '../axios'

export interface LoginVO {
    username: string,
    password: string
}

export const login = async (data: LoginVO) => {
    return await request.post({ url: '/user/admin/login', data });
}

// export const createBusiness = async (data: BusinessVO) => {
//     return await request.post({ url: `/crm/business/create`, data })
//   }