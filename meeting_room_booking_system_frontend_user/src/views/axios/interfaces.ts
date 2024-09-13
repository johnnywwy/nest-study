import { message } from "antd";
import axios from "axios";
import { UpdatePassword } from "../InfoModify/InfoModify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;

    if (data.code === 401 && !config.url.includes("/user/admin/refresh")) {
      const res = await refreshToken();

      if (res.status === 200) {
        return axios(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);

async function refreshToken() {
  const res = await axiosInstance.get("/user/admin/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
}

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/admin/login", {
    username,
    password,
  });
}

export async function userSearch(
  username: string,
  nickName: string,
  email: string,
  pageNo: number,
  pageSize: number
) {
  return await axiosInstance.get("/user/list", {
    params: {
      username,
      nickName,
      email,
      pageNo,
      pageSize,
    },
  });
}

export async function freeze(id: number) {
  return await axiosInstance.get("/user/freeze", {
    params: {
      id,
    },
  });
}

/**
 * 获取用户信息
 *
 * @returns 返回用户信息
 */
export async function getUserInfo() {
  return await axiosInstance.get("/user/info");
}

/**
 * 更新用户信息
 *
 * @param data 用户信息对象
 * @returns 异步返回更新后的用户信息
 */
export async function updateInfo(data: UserInfo) {
  return await axiosInstance.post("/user/admin/update", data);
}

/**
 * 更新用户信息验证码
 *
 * @returns 返回一个Promise对象，解析后为更新验证码的响应结果
 */
export async function updateUserInfoCaptcha() {
  return await axiosInstance.get("/user/update/captcha");
}

/**
 * 更新密码验证码
 *
 * @param email 邮箱地址
 * @returns 返回更新密码验证码的结果
 */
export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get("/user/update_password/captcha", {
    params: {
      address: email,
    },
  });
}

/**
 * 更新密码
 *
 * @param data 更新密码所需的数据
 * @returns 返回更新密码的响应结果
 */
export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post("/user/admin/update_password", data);
}
