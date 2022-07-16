
import {useEffect, useState} from "react";

import {
    Image,
    Rate,
    Input,
    Button,
} from "antd";
import {nanoid} from "nanoid";
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

    const getComments = async () => {
        setVisual(visual=> visual + 1)
        let res = await client.query({query:gql`
                query{
                evaluate8__c{
                    evaluate8_name__c
                    evaluate8_comment__c
                    evaluate8_user_id__c
                }
            }
                `
        })
        res = res.data.evaluate8__c
            .filter(obj=>obj.evaluate8_name__c === info.name)

        setComments(()=>res)
        setHeight(()=> visual % 2 === 0 ? 0 : height + 76 * comments.length )

    }

    useEffect(()=>{
        setVisual(0)
        setHeight(0)
        getComments()

    }, [])

    const handleClick = () => {

        getComments()
        console.log(height, visual)
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
                <Rate onChange={c=>console.log(c)}/>
                <TextArea placeholder={'写段友好的评论吧！！'} rows={3}/>
                <Button id={'sub-btn'}>提交</Button>
            </div>
            <Button onClick={handleClick}>{((visual%2) === 0) ? '收起' : '查看'}评论</Button>
        </div>
        <div className={'comment'} style={{height: height}}>
            {
                visual % 2 === 0 ? comments
                        .filter(obj=>obj.evaluate8_name__c === info.name)
                        .map(obj=><Comments key={info.key}
                                            au={obj.evaluate8_user_id__c}
                                            content={obj.evaluate8_comment__c}/>)
                    : <></>
            }
        </div>

    </div>
}