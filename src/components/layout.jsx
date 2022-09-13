import React, { useState } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { Routes, RouteList } from "@/route/route";

import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, GithubFilled } from "@ant-design/icons";


const { Header, Sider, Content, } = Layout;
const isMobile = /Android|webOS|iPhone|iPad|Windows Phone|iPod|BlackBerry|SymbianOS|Nokia|Mobile/i.test(navigator.userAgent);
const navList = Routes.filter(({ navName }) => navName).map(({ path, navName }) => {
    return {
        key: path,
        label: navName,
    };
});

export const PageLayout = props => {
    const [collapsed, setCollapsed] = useState(false);

    const Menus = props => {
        const { mode, theme } = props;
        const history = useHistory();
        function pageGo({ key }) {
            history.push({
                pathname: key
            })
        }
        const items = isMobile ? [{
            label: "菜单",
            key: "SubMenu",
            children: navList
        }] : navList;
        return <Menu
            theme={theme || "dark"}
            mode={mode || "inline"}
            defaultSelectedKeys={[Routes[0]["path"]]}
            items={items}
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

    return (
        <HashRouter>
            <Layout className="site-layout">
                <SlideNav />
                <Layout>
                    <NavHeader />
                    <Content className="site-layout-content">
                        <RouteList />
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    )
}