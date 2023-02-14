const CracoLessPlugin = require("craco-less");
const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },
    devServer: {
        proxy: {
            "/api/bapi": {
                target: "https://api.bilibili.com/",
                changeOrigin: true,
                pathRewrite: {
                    "/api/bapi": "/"
                }
            },
            "/api/server": {
                target: "http://server.yichenghui.net/index.php/",
                changeOrigin: true,
                pathRewrite: {
                    "/api/server": "/"
                }
            },
            "/api/music": {
                target: "https://yichenghui.net/",
                changeOrigin: true,
            },
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};