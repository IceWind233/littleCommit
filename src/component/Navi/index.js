import React, { useState } from 'react';

import {NavLink, Navigate, useRoutes} from "react-router-dom";
import {HomeOutlined,
        AppleOutlined,
        CarOutlined,
        DashboardOutlined,
        LoginOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.min.css';

import Home from "../../page/Home";
import DinningHall from "../../page/Food/DinningHall";
import FoodElse from "../../page/Food/FoodElse";
import Store from "../../page/Serve/Store";
import HairCut from "../../page/Serve/HairCut";
import Sport from "../../page/Sport";
import Krankenhaus from "../../page/Serve/Krankenhaus";
import Hotel from "../../page/Serve/Hotel";
import Login from "../../page/Login";
import ServeElse from "../../page/Serve/ServeElse";
import SignUp from "../../page/SignUp";
import './index.css'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const items = [
    getItem(<NavLink to={'/home'} className={'navi'}>首页</NavLink>, 'sub1', <HomeOutlined style={{ fontSize: '120%'}}/>),
    getItem('美食', 'sub2', <AppleOutlined style={{ fontSize: '120%'}}/>, [
        getItem(<NavLink className={'navi'} to={'/food/dinninghall'}>食堂</NavLink>, 'dinningHall'),
        getItem(<NavLink className={'navi'} to={'/food/foodelse'}>其他美食</NavLink>, 'foodElse'),
    ]),
    getItem(<NavLink className={'navi'} to={'/sport'}>运动</NavLink>,'sub3', <DashboardOutlined style={{ fontSize: '120%'}}/>),
    getItem('服务', 'sub4', <CarOutlined style={{ fontSize: '120%'}}/>, [
        getItem(<NavLink className={'navi'} to={'/serve/haircut'}>理发</NavLink>, 'hairCut'),
        getItem(<NavLink className={'navi'} to={'/serve/krankenhaus'}>医院</NavLink>, 'krankenhaus'),
        getItem(<NavLink className={'navi'} to={'/serve/hotel'}>酒店</NavLink>, 'hotel'),
        getItem(<NavLink className={'navi'} to={'/serve/store'}>超市</NavLink>, 'store'),
        getItem(<NavLink className={'navi'} to={'/serve/serviceelse'}>其他</NavLink>, 'serverElse'),
    ]),
    getItem(<NavLink to={'/login'}>登录/注册</NavLink>, 'sub6', <LoginOutlined style={{ fontSize: '120%'}}/>),
];

const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];

export default function Navi(props){
    const element = useRoutes([
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/food/dinninghall',
            element: <DinningHall/>
        },
        {
            path: '/food/foodelse',
            element: <FoodElse/>
        },
        {
            path: '/serve/store',
            element: <Store/>
        },
        {
            path: '/serve/haircut',
            element: <HairCut/>
        },
        {
            path: '/sport',
            element: <Sport/>
        },
        {
            path: '/serve/krankenhaus',
            element: <Krankenhaus/>
        },
        {
            path: '/serve/hotel',
            element: <Hotel/>
        },
        {
            path: '/serve/serviceelse',
            element: <ServeElse/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/signup',
            element: <SignUp/>
        },
        {
            path: '/',
            element: <Navigate to={'/home'} />
        }
    ])


    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>
            <Menu
                id={'Navi'}
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 300,
                    height: 905,
                    marginBottom: 5,
                    fontSize: 20,
                }}
                items={items}
            />
            <div id={'showRouter'}>
                {element}
            </div>
        </>

    );
}