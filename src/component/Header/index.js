
import {useNavigate} from "react-router-dom";

import Logo from '../../static/logo2x.png'
import './index.css'

export default function Header(props){
    const history = useNavigate()
    const handleClick = ()=>{
        history('/home')
    }

    return <div id={'Header'}>
        <div to={'/home'} className={'Title'} onClick={handleClick}>
            <img className={'Logo'} src={Logo} alt={'logo'}/>
            <span>小众点评</span>
        </div>

    </div>
}