import { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { createFromIconfontCN, CustomerServiceOutlined } from "@ant-design/icons";

import { Spin, ConfigProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';

import { App } from "@/pages/app/App";
import { Music } from "@/pages/music/index"
import { MusicDetail } from "@/pages/music/detail"

import axios from "axios";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/c/font_3645834_gpgvsa2q7k.js"
});

export const Routes = [{
    path: "/",
    component: Music,
}, {
    path: "/music",
    component: Music,
    navName: "音乐",
    icon: <CustomerServiceOutlined />
}, {
    path: "/topList/:id",
    component: MusicDetail
}, {
    path: "/about",
    component: App,
    navName: "关于我",
    icon: <IconFont type="icon-guanyuwomen" />
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