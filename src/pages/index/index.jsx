import React, { Component } from "react";
import { api } from "@/api/index";
import { VideoList } from "@/components/videoList";
import { Button, PageHeader } from "antd";

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            currentPage: 1,
        };
    }
    componentDidMount() {
        this.getList(this.state.currentPage);
    }
    async getList(pn = 1) {
        const {
            data: {
                data: { list },
            },
        } = await api.get("/api/x/web-interface/popular", {
            params: {
                ps: 10,
                pn,
            },
        });
        const temp = [
            ...this.state.list,
            ...list,
        ];
        this.setState({
            list: temp,
        });
    }
    loadMoreData() {
        this.setState({
            currentPage: this.state.currentPage + 1,
        }, () => {
            this.getList(this.state.currentPage);
        });
    }
    transformNumber(number) {
        const result = number / 10000;
        return result.toFixed(1) + "万";
    }
    render() {
        const header = <PageHeader title="Bilibili" subTitle="热门视频" />;
        const LoadMore = <div className="textCenter mb10">
            <Button type="primary" onClick={this.loadMoreData.bind(this)}>加载更多数据</Button>
        </div>;
        return (
            <div className="Index">
                <VideoList
                    config={{
                        dataSource: this.state.list,
                        footer: LoadMore,
                    }}
                />
            </div>
        )
    }
}