
import {useEffect, useState} from "react"

import {Form, Button, Input} from 'antd'
import {useNavigate} from "react-router-dom";
import ApolloClient, {gql} from "apollo-boost";

export default function SignUp(props){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})


    const [flag, setFlag] = useState(true)
    const [pswd, setPswd] = useState('')
    const [user, setUser] = useState('')
    const history = useNavigate()

    useEffect(()=>{
        document.title='小众点评-注册'
    },[])

    const formItemLayout={
        labelCol: {sm: {span: 6, offset: 1}}
    }

    const onFinish = (value)=>{
        setTimeout(()=>{

        }, 1000)
        // alert('Create Account Successfully\nJumping To Login In 3s After Click Confirm.')
        history('/login')
    }

    const onFinishFailed = (err)=>{
        alert(err)
    }

    const getUser = (event)=>{
        setUser((user)=>event.target.value)

    }

    const getPswd = (event)=>{
        setPswd((pswd)=>event.target.value)
    }

    const saveAccount = () => {
        client.mutate({mutation: gql`
                mutation{
                users__c__insert(
                    doc: {
                        usersname__c: "${user}",
                        userspwd__c: "${pswd}",
                    }){
                        usersname__c
                        userspwd__c
                    }
                }

        `})
    }
    const confirmPswd = (event) => {
        setFlag(pswd !== event.target.value)
        console.log(flag)
    }


    return <>
        <Form id={'signUpForm'}
              labelAlign={'right'}
              {...formItemLayout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
        >

            <div id={'f-title'}>注册账号</div>

            <Form.Item className={'formItem'}
                       name={'username'}
                       label={'用户名'}
                       rules={[{ required: true, message: '输入用户名!' }]}>
                <Input className={'s-input'}
                       placeholder={'用户名'}
                       onChange={c => getUser(c)}
                />
            </Form.Item>

            <Form.Item className={'formItem'}
                       name={'password'}
                       label={'密码'}
                       rules={[{ required: true, message: '输入密码!' }]}>
                <Input className={'s-input'}
                       type={'password'}
                       placeholder={'密码'}
                       onChange={c => getPswd(c)}
                />
            </Form.Item>

            <Form.Item className={'formItem'}
                       label={'确认密码'}
                       rules={[{ required: true, message: '输入正确的密码'}]}>
                <Input className={'s-input'}
                       type={'password'}
                       placeholder={'确认密码'}
                       onChange={c => confirmPswd(c)}
                />
            </Form.Item>

            <Button id={'s-btn'} onClick={saveAccount} htmlType="submit" disabled={flag}>
                提交
            </Button>
        </Form>
    </>
}