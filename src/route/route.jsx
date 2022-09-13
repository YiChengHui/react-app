import { useState } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";

import { Spin, ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';

import { Index } from "@/pages/index";
import { App } from "@/pages/app/App";
import { UpInfo } from "@/pages/upinfo/index";

import axios from "axios";

export const Routes = [{
    path: "/index",
    component: Index,
    navName: "B站视频"
}, {
    path: "/UpInfo/:mid",
    component: UpInfo,
}, {
    path: "/App",
    component: App,
    navName: "关于我"
}];

export const RouteList = props => {
    const [Loading, setLoading] = useState(false);

    axios.interceptors.request.use(config => {
        setLoading(true);
        return config;
    });

    axios.interceptors.response.use(config => {
        setLoading(false);
        return config;
    }, error => {
        setLoading(false);
        return error;
    });

    return (
        <HashRouter>
            <ConfigProvider locale={zhCN}>
                <Spin className="Loading" size="large" tip="Loading..." spinning={Loading} >
                    <Redirect from="/" to="/index" />
                    {Routes.map(item => <Route path={item.path} key={item.path} component={item.component} />)}
                </Spin>
            </ConfigProvider>
        </HashRouter>
    )
}