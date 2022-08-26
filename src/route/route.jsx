import { useState } from "react";
import { HashRouter, Route } from "react-router-dom";

import { Spin } from "antd";

import { Index } from "@/pages/index";
import { App } from "@/pages/app/App";
import { api } from "@/api/index.js";

export const Routes = [{
    path: "/index",
    component: Index,
    navName: "B站视频"
}, {
    path: "/App",
    component: App,
    navName: "App"
}];

export const RouteList = props => {
    const [Loading, setLoading] = useState(false);

    api.interceptors.request.use(config => {
        setLoading(true);
        return config;
    });

    api.interceptors.response.use(config => {
        setLoading(false);
        return config;
    });

    return (
        <HashRouter>
            <Spin className="Loading" size="large" tip="Loading..." spinning={Loading} >
                {Routes.map(item => <Route path={item.path} key={item.path} component={item.component} />)}
            </Spin>
        </HashRouter>
    )
}