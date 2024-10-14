import { Button, Checkbox, Form, Input } from 'antd';
import './login.css';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';

interface LoginUser {
    username: string;
    password: string;
}

const layout1 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

export function Login() {
    const navigate = useNavigate();

    const onFinish = useCallback(async (values: LoginUser) => {
        console.log(values);

        const res = await login(values.username, values.password);
        console.log('res', res);

    }, []);

    return <div id="login-container">
        <h1>会议室预订系统</h1>
        <Form
            {...layout1}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label=" ">
                <Button className='btn' type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    </div>
}
