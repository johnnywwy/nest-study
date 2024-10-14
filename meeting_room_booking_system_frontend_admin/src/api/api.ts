import { axiosInstance } from "../interfaces/interfaces";

export async function login(username: string, password: string) {
    return await axiosInstance.post('/user/admin/login', {
        username, password
    });
}

