import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios, { Axios, AxiosRequestConfig } from "axios";

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}

let refreshing = false;
const queue: PendingTask[] = [];

axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.authorization = "Bearer " + accessToken;
  }
  return config;
});

axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("来了吗");

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({ config: config, resolve });
      });
    }

    let { data, config } = error.response;
    if (data.statusCode === 401 && !config.url.includes("/user/refresh")) {
      refreshing = true;
      const res = await refreshToken();

      refreshing = false;

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axios(config));
        });

        return axios(config);
      } else {
        alert("登录过期，请重新登录");
        return Promise.reject(res.data);
      }
    } else {
      return error.response;
    }
    // const token = localStorage.getItem("access_token");
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    // return config; // 添加了这一行来返回config
  }
);

async function refreshToken() {
  const res = await axios.get("http://localhost:3000/user/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token || "");
  localStorage.setItem("refresh_token", res.data.refresh_token || "");
  return res;
}
function App() {
  // const [count, setCount] = useState(0);
  const [aaa, setAaa] = useState();
  const [bbb, setBbb] = useState();

  const login = async () => {
    console.log("aaaaaaaaaa");

    const res = await axios.post("http://localhost:3000/user/login", {
      username: "东东",
      password: "123456",
    });
    console.log("res", res);

    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
  };

  async function query() {
    await login();
    // if (!localStorage.getItem("access_token")) {
    //   await login();
    // }
    const { data: aaaData } = await axios.get("http://localhost:3000/aaa");

    const { data: bbbData } = await axios.get("http://localhost:3000/bbb");

    setAaa(aaaData);
    setBbb(bbbData);
  }

  useEffect(() => {
    query();
  }, []);
  return (
    <div>
      <h2>aaa</h2> {aaa}
      <h2>bbb</h2> {bbb}
    </div>
  );
}

export default App;
