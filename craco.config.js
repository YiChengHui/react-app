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
            "/api": {
                target: "https://api.bilibili.com/",
                changeOrigin: true,
                pathRewrite: {
                    "/api": "/"
                }
            }
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