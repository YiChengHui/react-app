import React, { useState, useEffect } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { Routes, RouteList } from "@/route/route";

import { bus } from "@/components/tools"

import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, GithubFilled } from "@ant-design/icons";


import { Player } from '@/pages/music/player';

const { Header, Sider, Content, } = Layout;
const isMobile = /Android|webOS|iPhone|iPad|Windows Phone|iPod|BlackBerry|SymbianOS|Nokia|Mobile|MicroMessenger/i.test(navigator.userAgent);
const navList = Routes.filter(({ navName }) => navName).map(({ path, navName, icon }) => {
    return {
        icon,
        key: path,
        label: navName,
    };
});

export const PageLayout = props => {
    const [collapsed, setCollapsed] = useState(false);
    const [showPlayer, setPlayShow] = useState(false);
    const [playInfo, setPlayInfo] = useState({});

    const Menus = props => {
        const { mode, theme } = props;
        const history = useHistory();
        function pageGo({ key }) {
            history.replace({
                pathname: key
            })
        }
        return <Menu
            theme={theme || "dark"}
            mode={mode || "inline"}
            defaultSelectedKeys={[Routes[0]["path"]]}
            items={navList}
            onClick={pageGo}
        />
    };

    const SlideNav = () => {
        if (isMobile) {
            return <div></div>;
        }
        return <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" >
                <a href="https://github.com/YiChengHui/bilibili-react" target="_blank" rel="noreferrer">
                    <GithubFilled style={{
                        color: "#fff",
                        fontSize: "30px",
                    }} />
                </a>
            </div>
            <Menus />
        </Sider>;
    };

    const NavHeader = () => {
        if (isMobile) {
            return <Menus
                mode="horizontal"
                theme="light"
                defaultSelectedKeys={[Routes[0]["path"]]}
            />
        }
        return <Header className="site-layout-header"                    >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
            })}
        </Header>;
    };

    useEffect(() => {
        bus.$on('playMusic', info => {
            setPlayShow(true);
            setPlayInfo(info);
        });
        return () => bus.$off('playMusic');
    }, []);

    return (
        <HashRouter>
            <Layout className="site-layout">
                <SlideNav />
                <Layout>
                    <NavHeader />
                    <Content className="site-layout-content">
                        <RouteList />
                        <Player show={showPlayer} info={playInfo} />
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    )
}