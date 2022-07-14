
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
    const {...info} = props
    const TextArea = Input
    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'
    const [height, setHeight] = useState(0)
    const [visual, setVisual] = useState(1)
    const [comments, setComments] = useState([])


    useEffect(()=>{

    }, [])

    const handleClick = () => {
        // client.query({query:gql `
        //     query{
        //         cuisine7__c{
        //             cuisinename__c
        //         }
        //     }
        // `
        // }).then(
        //     res=>{
        //         setComments(()=>res.data.cuisine7__c)
        //         console.log(res.data)
        //         setHeight(()=>(visual%2 === 0) ? height + comments.length * 76 : height - comments.length * 76)
        //         setVisual((visual)=>visual + 1)
        //         setHeight(()=>(visual%2 === 0) ? height + comments.length * 76 : height - comments.length * 76)
        //     },
        //     err=>console.error(err)
        // )

    }

    return <div key={info.key} className={'main-item'}>
        <div className={'item'} >
            <Image className={'Image'} src={props.p_src} alt={info.sort + ' Pic'}/>
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
            <Button onClick={handleClick}>{((visual%2) !== 0) ? '收起' : '查看'}评论</Button>
        </div>
        <div className={'comment'} style={{height: height}}>
            {
                // (visual%2 !== 0) && comments.map(obj=><Comments key={nanoid()} au={obj.cuisinename__c} content={obj.__typename}/>)
            }
        </div>

    </div>
}