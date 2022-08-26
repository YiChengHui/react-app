import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageLayout } from "@/components/layout";
import reportWebVitals from './reportWebVitals';
import "@/style/index.less";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PageLayout />);

reportWebVitals();
