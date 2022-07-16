import {
    Comment,
} from "antd";

export default function Comments(props){
    return <Comment author={props.au} content={props.content} key={props.key} />
}