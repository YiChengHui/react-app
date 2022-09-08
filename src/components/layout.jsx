import React, { useState } from "react";
import { HashRouter, useHistory } from "react-router-dom";
import { Routes, RouteList } from "@/route/route";

import { Layout, Menu } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, GithubFilled } from '@ant-design/icons';


const { Header, Sider, Content, } = Layout;

export const PageLayout = props => {
    const [collapsed, setCollapsed] = useState(false);

    const Menus = () => {
        const history = useHistory();
        function pageGo({ key }) {
            history.push({
                pathname: key
            })
        }
        return <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[Routes[0]["path"]]}
            items={
                Routes.filter(({ navName }) => navName).map(({ path, navName }) => {
                    return {
                        key: path,
                        label: navName,
                    };
                })
            }
            onClick={pageGo}
        />
    }

    return (
        <HashRouter>
            <Layout className="site-layout">
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" >
                        <a href="https://github.com/YiChengHui/bilibili-react" target="_blank">
                            <GithubFilled style={{
                                color: "#fff",
                                fontSize: "30px",
                            }} />
                        </a>
                    </div>
                    <Menus />

                </Sider>
                <Layout>
                    <Header className="site-layout-header"                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <Content className="site-layout-content">
                        <RouteList />
                    </Content>
                </Layout>
            </Layout>
        </HashRouter>
    )
}