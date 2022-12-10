import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageLayout } from "@/components/layout";
import reportWebVitals from './reportWebVitals';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import "@/style/index.less";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <PageLayout />
    </ConfigProvider>
);

reportWebVitals();
