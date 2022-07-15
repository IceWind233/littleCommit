import {useEffect} from "react";

import {Button,
        Checkbox,
        Form,
        Input,
} from 'antd';
import {Link, NavLink, useNavigate} from 'react-router-dom'
import cookie from 'react-cookies'

export default function Login(){

    useEffect(()=>{
        console.log('Create By IceWind🍟🍟🍟')
        document.title='小众点评-登录'
    },[])

    const onFinish = (values) => {
        console.log('Success:', values);
        const {username, password} = values


        //    最好加个路由守卫

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div id={'login'}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className={'btn'} type="primary" htmlType="submit">
                    Submit
                </Button>
                <NavLink to={'/signup'}>Don't Have Account?</NavLink>
            </Form.Item>
        </Form>
    </div>
}