import { useState } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";

import { Spin } from "antd";

import { Index } from "@/pages/index";
import { Music } from "@/pages/music";
import { App } from "@/pages/app/App";
import { api } from "@/api/index.js";

export const Routes = [{
    path: "/index",
    component: Index,
    navName: "B站视频"
}, {
    path: "/music",
    component: Music,
    navName: "音乐"
}, {
    path: "/App",
    component: App,
    navName: "App"
}];

export const RouteList = props => {
    const [Loading, setLoading] = useState(false);
    // const [showAlert, setAlert] = useState(false);

    api.interceptors.request.use(config => {
        setLoading(true);
        return config;
    });

    api.interceptors.response.use(config => {
        setLoading(false);
        return config;
    }, error => {
        setLoading(false);
        return error;
    });

    return (
        <HashRouter>
            <Spin className="Loading" size="large" tip="Loading..." spinning={Loading} >
                <Redirect from="/" to="/music" />
                {Routes.map(item => <Route path={item.path} key={item.path} component={item.component} />)}
            </Spin>
        </HashRouter>
    )
}