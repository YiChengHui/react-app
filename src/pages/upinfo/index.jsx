import React, { Component } from "react";

import { Descriptions, Avatar, PageHeader, Card, Row, Col, Space, Divider } from "antd";
import { ClockCircleOutlined, PlaySquareOutlined } from '@ant-design/icons';

import { api } from "@/api/index";

import { transformNumber, transformDate } from "@/components/tools";

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
            const { data: { data } } = await api(`/api/x/space/acc/info`, {
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
    async search(pn, mid) {
        const { data: { data: { list, page: { count } } } } = await api.get(`/api/x/space/arc/search`, {
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
            videoList: vlist,
            pageCount: count,
        })
    }

    componentDidMount() {
        const { match: { params: { mid } } } = this.props;
        this.getUpInfo(mid);
        this.search(this.state.pageNumber, mid);
    }

    render() {
        const VideoItems = () => this.state.videoList.map(item => {
            return <Col xs={12} sm={12} md={8} lg={6} xl={6} xxl={4} className="VideoItem" key={item.aid}>
                <Card
                    hoverable
                    style={{ width: 240, }}
                    cover={<img height="128px" style={{ objectFit: "cover" }} alt="pic" src={item.pic} />}
                >
                    <Card.Meta
                        title={item.title}
                        description={
                            <div>
                                <p className="description ellipsis">{item.description}</p>
                                <p>
                                    <Space>
                                        <IconText icon={PlayIcon} text={transformNumber(item.play)} />
                                        <IconText icon={ClockIcon} text={transformDate(item.created * 1000)} />
                                    </Space>
                                </p>
                            </div>
                        }
                    />
                </Card>
            </Col>
        })
        return (
            <div className="UpInfo">
                <PageHeader
                    onBack={() => this.props.history.push("/index")}
                    title="首页"
                    subTitle={this.state.upInfo.name}
                />
                <Descriptions>
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

                <Row>
                    <VideoItems />
                    <Divider plain>共{this.state.pageCount}个视频</Divider>
                </Row>
            </div>
        )
    }
}