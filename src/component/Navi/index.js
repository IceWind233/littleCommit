import React, { useState } from 'react';

import {NavLink, Navigate, useRoutes} from "react-router-dom";
import {HomeOutlined,
        AppleOutlined,
        ShoppingCartOutlined,
        FireOutlined,
        CarOutlined,
        LoginOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css';

import './index.css'
import Home from "../../page/Home";
import DinningHall from "../../page/Food/DinningHall";
import FoodElse from "../../page/Food/FoodElse";
import Store from "../../page/Shop/Store";
import ShopElse from "../../page/Shop/ShopElse";
import HairCut from "../../page/Serve/HairCut";
import Sport from "../../page/Serve/Sport";
import Krankenhaus from "../../page/Serve/Krankenhaus";
import Hotel from "../../page/Serve/Hotel";
import Daily from "../../page/Daily";
import Login from "../../page/Login";

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
    getItem(<NavLink to={'/home'}>Home</NavLink>, 'sub1', <HomeOutlined style={{ fontSize: '120%'}}/>),
    getItem('美食', 'sub2', <AppleOutlined style={{ fontSize: '120%'}}/>, [
        getItem(<NavLink to={'/food/dinninghall'}>食堂</NavLink>, 'dinningHall'),
        getItem(<NavLink to={'/food/foodelse'}>其他美食</NavLink>, 'foodElse'),
    ]),
    getItem('购物', 'sub3', <ShoppingCartOutlined style={{ fontSize: '120%'}}/>, [
        getItem(<NavLink to={'/shop/store'}>超市</NavLink>, 'Store'),
        getItem(<NavLink to={'/shop/shopelse'}>其他超市</NavLink>, 'shopElse'),

    ]),
    getItem('服务', 'sub4', <CarOutlined style={{ fontSize: '120%'}}/>, [
        getItem(<NavLink to={'/serve/haircut'}>理发</NavLink>, 'hairCut'),
        getItem(<NavLink to={'/serve/sport'}>运动</NavLink>, 'sport'),
        getItem(<NavLink to={'/serve/krankenhaus'}>医院</NavLink>, 'krankenhaus'),
        getItem(<NavLink to={'/serve/hotel'}>酒店</NavLink>, 'hotel'),
    ]),
    getItem(<NavLink to={'/daily'}>动态</NavLink>, 'sub5',  <FireOutlined style={{ fontSize: '120%'}}/>),
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
            path: '/shop/store',
            element: <Store/>
        },
        {
            path: '/shop/shopelse',
            element: <ShopElse/>
        },
        {
            path: '/serve/haircut',
            element: <HairCut/>
        },
        {
            path: '/serve/sport',
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
            path: '/daily',
            element: <Daily/>
        },
        {
            path: '/login',
            element: <Login/>
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