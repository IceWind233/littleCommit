import {useEffect} from "react";

import './index.css'


export default function Home(){
    useEffect(()=>{
        document.title='小众点评-主页'
    }, [])

    return<div className={'home'}>
        小众点评<br/>
        一个更关注天工大的网站<br/>

    </div>
}