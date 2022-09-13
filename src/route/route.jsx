import { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { createFromIconfontCN } from "@ant-design/icons";

import { Spin, ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';

import { Index } from "@/pages/index";
import { App } from "@/pages/app/App";
import { UpInfo } from "@/pages/upinfo/index";

import axios from "axios";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_3645834_gpgvsa2q7k.js"
});

export const Routes = [{
    path: "/",
    component: Index,
}, {
    path: "/index",
    component: Index,
    navName: "B站视频",
    icon: <IconFont type="icon-bilibili" style={{ fontSize: '16px', color: '#1890ff' }} />
}, {
    path: "/UpInfo/:mid",
    component: UpInfo,
}, {
    path: "/about",
    component: App,
    navName: "关于我",
    icon: <IconFont type="icon-guanyuwomen" style={{ fontSize: '16px', color: '#1890ff' }} />,
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
                <Spin className="Loading" size="large" tip="Loading..." spinning={Loading}>
                    <Switch>
                        {Routes.map((item, index) => <Route exact path={item.path} key={index} component={item.component} />)}
                    </Switch>
                </Spin>
            </ConfigProvider>
        </HashRouter>
    )
}