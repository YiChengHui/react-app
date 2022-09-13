import React, { Component } from "react";

import { Descriptions, Avatar, PageHeader, Card, Row, Col, Space, Divider, Button } from "antd";
import { ClockCircleOutlined, PlaySquareOutlined } from '@ant-design/icons';

import axios from "axios";

import { transformNumber, transformDate, toVideoPage } from "@/components/tools";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const PlayIcon = () => <PlaySquareOutlined />;
const ClockIcon = () => <ClockCircleOutlined />;

export class UpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upInfo: {
                name: "",
                face: "",
                top_photo: "",
            },
            pageNumber: 1,
            pageCount: 0,
            videoList: [],
        }
    }

    //获取UP信息
    async getUpInfo(mid) {
        let upInfo;
        if (localStorage.getItem(mid)) {
            upInfo = JSON.parse(localStorage.getItem(mid))
        } else {
            const { data: { data } } = await axios.get(`/api/bapi/x/space/acc/info`, {
                params: {
                    mid,
                    jsonp: "jsonp"
                }
            });
            upInfo = data;
            localStorage.setItem(mid, JSON.stringify(data));
        }
        this.setState({
            upInfo,
        });
    }

    //获取up所有视频
    async search(pn) {
        const { match: { params: { mid } } } = this.props;
        const { data: { data: { list, page: { count } } } } = await axios.get(`/api/bapi/x/space/arc/search`, {
            params: {
                mid,
                pn,
                ps: 20,
                tid: 0,
                index: 1,
                jsonp: "jsonp",
            }
        });
        const { vlist } = list;
        this.setState({
            videoList: this.state.videoList.concat(vlist),
            pageCount: count,
        });
    }

    //加载更多
    loadMore() {
        this.setState({
            pageNumber: this.state.pageNumber + 1,
        }, () => {
            this.search(this.state.pageNumber)
        });
    }


    componentDidMount() {
        const { match: { params: { mid } } } = this.props;
        this.getUpInfo(mid);
        this.search(this.state.pageNumber);
    }

    render() {
        const LoadMore = () => {
            const { pageCount, pageNumber } = this.state;
            if (pageNumber * 20 < pageCount) {
                return <div className="textCenter mb10">
                    <Button type="primary" onClick={this.loadMore.bind(this)}>加载更多</Button>
                </div>
            } else {
                return <div style={{ diaplay: "none" }}></div>;
            }
        };
        return (
            <div className="UpInfo">
                <PageHeader
                    onBack={() => this.props.history.replace("/index")}
                    title="首页"
                    subTitle={this.state.upInfo.name}
                />
                <Descriptions column={3}>
                    <Descriptions.Item span={3}>
                        <div className="header">
                            <div className="background">
                                <img fit="cover" src={this.state.upInfo.top_photo} alt="top_photo" />
                            </div>
                            <div className="image">
                                <Avatar size={80} src={this.state.upInfo.face} />
                            </div>
                            <div className="name">
                                <span>{this.state.upInfo.name}</span>
                                <br />
                                <span>{this.state.upInfo.sign}</span>
                            </div>
                        </div>
                    </Descriptions.Item>
                </Descriptions>

                <Row gutter={16} style={{ margin: 0, padding: 0 }}>
                    {
                        this.state.videoList.map(item => {
                            return <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }} xxl={{ span: 4 }} className="VideoItem" key={item.aid}>
                                <Card
                                    hoverable
                                    style={{ width: "100%" }}
                                    cover={<img height="128px" style={{ objectFit: "cover" }} alt="pic" src={item.pic} />}
                                    onClick={toVideoPage.bind(item, item.bvid)}
                                >
                                    <Card.Meta
                                        title={item.title}
                                        description={
                                            <div>
                                                <div className="description ellipsis">{item.description}</div>
                                                <div>
                                                    <Space>
                                                        <IconText icon={PlayIcon} text={transformNumber(item.play)} />
                                                        <IconText icon={ClockIcon} text={transformDate(item.created * 1000)} />
                                                    </Space>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Card>
                            </Col>
                        })
                    }
                </Row>
                <LoadMore />
                <Divider plain>已加载{this.state.videoList.length}个视频，共{this.state.pageCount}个视频</Divider>
            </div>
        )
    }
}