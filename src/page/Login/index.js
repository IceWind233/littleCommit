import {useEffect, useState} from "react";

import {Button,
        Form,
        Input,
} from 'antd';
import {NavLink, useNavigate} from 'react-router-dom'
import cookies from 'react-cookies'
import ApolloClient, {gql} from "apollo-boost";

import './index.css'

export default function Login(){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})
    const [account, setAccount] = useState()
    const history = useNavigate()

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
        setAccount(()=>res.data.users__c)
    }

    useEffect(()=>{
        cookies.remove('userName')

        console.log('Create By IceWind🍟🍟🍟')
        document.title='小众点评-登录'
        getAccount()


    },[])

    const onFinish = (values) => {
        console.log('Success:', values);
        const {username, password} = values
        const flag = account.filter(obj=>obj.usersname__c === username && obj.userspwd__c === password)
        if(flag === []) alert('输入正确的用户名及密码')
        else {
            cookies.save('userName', username)
            history('/home')
            alert('登录成功')
        }

        //    最好加个路由守卫

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div id={'login'}>
        <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 30 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '输入密码' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button className={'btn'} type="primary" htmlType="submit">
                    登录
                </Button>
                <NavLink to={'/signup'}> 没有账号?</NavLink>
            </Form.Item>
        </Form>
    </div>
}