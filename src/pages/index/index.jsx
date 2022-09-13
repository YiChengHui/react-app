import React, { Component } from "react";
import axios from "axios";
import { VideoList } from "@/components/videoList";
import { Button } from "antd";

export class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            currentPage: 1,
            loading: false,
        };
    }
    componentDidMount() {
        this.getList(this.state.currentPage);
    }
    async getList(pn = 1) {
        this.setState({
            loading: true,
        });
        const {
            data: {
                data: { list },
            },
        } = await axios.get("/api/bapi/x/web-interface/popular", {
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
            loading: false,
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
        const LoadMore = <div className="textCenter mb10">
            <Button type="primary" loading={this.state.loading} onClick={this.loadMoreData.bind(this)}>加载更多</Button>
        </div>;
        return (
            <div className="Index">
                <VideoList
                    config={{
                        dataSource: this.state.list,
                        footer: LoadMore,
                    }}
                    toUpInfo={({ mid }) => {
                        this.props.history.replace(`/Upinfo/${mid}`)
                    }}
                />
            </div>
        )
    }
}