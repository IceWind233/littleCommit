
import {useCallback, useEffect, useState} from "react";

import {
    Image,
    Rate,
    Input,
    Button,
} from "antd";
import cookies from "react-cookies";
import ApolloClient ,{gql} from 'apollo-boost'

import './index.css'
import Comments from "../Comments";

export default function Item(props){
    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'

    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})


    const {...info} = props
    const TextArea = Input
    const [height, setHeight] = useState(0)
    const [visual, setVisual] = useState(0)
    const [comments, setComments] = useState([])
    const [disable, setdisable] = useState(true)
    let username, comment, score

    const getComments = async () => {
        setVisual(visual=> visual + 1)
        let res = await client.query({query:gql`
                query{
                evaluate8__c{
                    evaluate8_name__c
                    evaluate8_comment__c
                    evaluate8_user_name__c
                }
            }
                `
        })
        res = res.data.evaluate8__c
            .filter(obj=>obj.evaluate8_name__c === info.name)

        setComments(()=>res)
        setHeight(()=> visual % 2 === 0 ? 0 : height + 76 * comments.length )

    }
    const getCookies = () => {
        return cookies.load('userName')
    }

    useEffect(()=>{
        setdisable(true)
        console.log(getCookies())
        if(getCookies() !== undefined) setdisable(false)
        setVisual(0)
        setHeight(0)
        getComments()

    },[])

    const handleClick = () => {
        getComments()
    }

    const setScore = (event) => {
        score = event
        console.log(score)
    }

    const handleSubmit = async () => {
        await client.mutate({mutation:gql`
                mutation{
                evaluate8__c__insert(doc:{
                    evaluate8_name__c: "${info.name}",
                    evaluate8_comment__c: "${comment}",
                    evaluate8_score__c: "${score}",
                    evaluate8_user_name__c: "${getCookies()}",
                }){
                    evaluate8_name__c
                    evaluate8_comment__c
                    evaluate8_score__c
                    evaluate8_user_name__c
                }
            }
                `
        })
        alert('提交成功')
    }
    const getComment = (event) => {
        comment = event.target.value
            console.log(comment, '<->', event.target.value)
        }


    return <div key={info.key} className={'main-item'}>
        <div className={'item'} >
            <Image className={'Image'} src={props.pic} alt={info.sort + ' Pic'}/>
            <div className={'rate'}>
                <Rate disabled defaultValue={info.score}/><br/>
                <span className={'intro'}>名称：{info.name},<br/> 位置：{info.address}</span> <br/>
            </div>
            <br/>
            <div className={'commit'}>
                <Rate onChange={c=>setScore(c)} defaultValue={0} disabled={disable}/>
                <TextArea placeholder={disable ? '请登录后评论😜' : '写段友好的评论吧！！'} rows={3} disabled={disable} onChange={c => getComment(c)}/>
                <Button id={'sub-btn'} onClick={handleSubmit} disabled={comment}>提交</Button>
            </div>
            <Button onClick={handleClick}>{((visual%2) === 0) ? '收起' : '查看'}评论</Button>
        </div>
        <div className={'comment'} style={{height: height}}>
            {
                visual % 2 === 0 ? comments
                        .filter(obj=>obj.evaluate8_name__c === info.name)
                        .map(obj=><Comments key={info.key}
                                            au={obj.evaluate8_user_name__c}
                                            content={obj.evaluate8_comment__c}
                                            />)
                    : <></>
            }
        </div>

    </div>
}