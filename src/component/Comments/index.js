import React, {useEffect, useState} from "react"

import {
    Comment,
    Tooltip
} from "antd"

import {LikeFilled, LikeOutlined} from '@ant-design/icons'
import ApolloClient ,{gql} from 'apollo-boost'


export default function Comments(props){

    const apikey = '2lBDx35pWMprMB5HZf4bKSJOhfNiVCPhYJDfz-LnWxX'

    const client = new ApolloClient({
        uri: 'http://101.43.154.87:3000/graphql',
        headers: {
            Authorization : `Bearer apikey,${apikey}`
        }})


    // let likes=props.like
    const [likes, setLikes] = useState(props.like)
    const [isLike, setIsLike] = useState(false)
    const [action, setAction] = useState(null)

    const updateLikes = async () => {
        console.log(props.cKey, likes)
        await client.mutate(
            {
                mutation: gql`
                    mutation{
                        evaluate8__c__update(
                            id: "${props.cKey}",
                            doc:{evaluate8_number__c: "${likes}"}
                        )
                        {
                            evaluate8_number__c
                        }
                    }
                `,
            }
            ).then(
                res=>console.log(res),
                err=>console.log(err)
            )
    }

    const like = () => {
        if (!isLike){
            setLikes(likes * 1 + 1)
            setAction('liked')
        }
        else {
            setLikes(likes * 1 - 1)
            setAction(null)
        }
        setIsLike((isLike)=>!isLike)
        updateLikes()
    }

    const actions = [
        <Tooltip key="comment-basic-like" title="Like" >
          <span onClick={like}>
            {action === 'liked' && isLike ? <LikeFilled style={{fontSize: '150%'}}/>: <LikeOutlined style={{fontSize: '150%'}}/>}
              <span className="comment-action" style={{fontSize: '150%'}}> {likes}</span>
          </span>
        </Tooltip>,
    ]

    return <Comment
        actions={actions}
        author={props.au}
        content={props.content}
        key={props.cKey}
        style={{width: 915}}/>
}