
import {useCallback, useEffect, useState} from "react"

import {Form, Button, Input} from 'antd'
import {useNavigate} from "react-router-dom";
import cookie from "react-cookies";

export default function SignUp(props){
    const [pswd, setPswd] = useState('')
    const [user, setUser] = useState('')
    const [flag, setFlag] = useState(true)
    const history = useNavigate()

    useEffect(()=>{
        document.title='小众点评-注册'
    },[])

    const formItemLayout={
        labelCol: {sm: {span: 6, offset: 1}}
    }

    const onFinish = (value)=>{
        alert('Create Account Successfully\nJumping To Login In 3s After Click Confirm.')
        setTimeout(()=>{
            history('/login')
        }, 3000)
    }

    const onFinishFailed = (err)=>{
        alert(err)
    }

    const getUser = useCallback((e)=>{
        setUser(e.target.value)
    },[])

    const getPswd = useCallback((value)=>{

        setPswd(value.target.value)
    }, [])

    const setDisable = (e)=>{
        if(e.target.value === pswd){
            setFlag(false)
        }
        else if(e.target.value !== pswd){
            setFlag(true)
        }
    }
    const saveCookie = ()=>{
        cookie.save(user, pswd, {path: '/'})
    }

    return <>
        <Form id={'signUpForm'}
              labelAlign={'right'}
              {...formItemLayout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
        >

            <div id={'f-title'}>Sign Up Your Account</div>

            <Form.Item className={'formItem'}
                       name={'username'}
                       label={'Username'}
                       rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input className={'s-input'}
                       placeholder={'username'}
                       onChange={c=>getUser(c)}
                />
            </Form.Item>

            <Form.Item className={'formItem'}
                       name={'password'}
                       label={'Password'}
                       rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input className={'s-input'}
                       type={'password'}
                       placeholder={'password'}
                       onChange={getPswd}
                />
            </Form.Item>

            <Form.Item className={'formItem'}
                       label={'Confirm Password'}
                       rules={[{ required: true, message: 'input correct password'}]}>
                <Input className={'s-input'}
                       type={'password'}
                       placeholder={'confirm the password'}
                       onChange={c => setDisable(c)}
                />
            </Form.Item>

            <Button id={'s-btn'} htmlType="submit" disabled={flag} onClick={saveCookie}>
                Submit
            </Button>
        </Form>
    </>
}