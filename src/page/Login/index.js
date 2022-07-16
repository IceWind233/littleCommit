import {useEffect, useState} from "react";

import {Button,
        Checkbox,
        Form,
        Input,
} from 'antd';
import {NavLink} from 'react-router-dom'
import cookies from 'react-cookies'
import ApolloClient, {gql} from "apollo-boost";

export default function Login(){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})
    const [account, setAccout] =useState()

    const getAccount = async () => {
        const res = await client.query({query:gql`
                query{
                users__c{
                    usersid__c
                    userspwd__c
                    usersname__c
                    }
                }
                `
        })
        setAccout(()=>res.data.users__c)
    }

    useEffect(()=>{
        console.log('Create By IceWind🍟🍟🍟')
        document.title='小众点评-登录'
        getAccount()


    },[])

    const onFinish = (values) => {
        console.log('Success:', values);
        const {username, password} = values
        const flag = account.filter(obj=>obj.usersname__c === username && obj.userspwd__c === password)
        console.log(flag, account[0].usersname__c === username && account[0].userspwd__c === password)
        if(flag === []) alert('输入正确的用户名及密码')
        else cookies.save(username, password)

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