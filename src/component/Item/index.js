
import {useEffect, useState} from "react";

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
    const [disable, setDisable] = useState(true)
    let comment, score

    const getComments = async () => {
        setVisual(visual=> visual + 1)
        let res = await client.query({query:gql`
                query{
                evaluate8__c{
                    evaluate8_name__c
                    evaluate8_comment__c
                    evaluate8_user_name__c
                    evaluate8_number__c
                    evaluate8_id__c
                }
            }
                `
        })
        res = res.data.evaluate8__c
            .filter(obj=>obj.evaluate8_name__c === info.name)

        setComments(()=>res)
        // setHeight(()=> visual % 2 === 0 ? 0 : height + 121 * comments.length )

    }
    const getCookies = () => {
        return cookies.load('userName')
    }

    useEffect(()=>{
        setDisable(true)
        if(getCookies() !== undefined) setDisable(false)
        setVisual(0)
        // setHeight(0)
        getComments()
        // eslint-disable-next-line
    },[props])

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
        <div className={'comment'} >
            {
                visual % 2 === 0 ? <div className={'comment-list'}>{comments
                        .filter(obj=>obj.evaluate8_name__c === info.name)
                        .map(obj=><Comments key={obj.evaluate8_id__c}
                                            cKey={obj.evaluate8_id__c}
                                            au={<span style={{fontSize: 15}}>{obj.evaluate8_user_name__c}</span>}
                                            content={<span style={{fontSize: 20}}>{obj.evaluate8_comment__c}</span>}
                                            like={obj.evaluate8_number__c}
                                            />)}
                    </div>
                    : <></>
            }
        </div>

    </div>
}