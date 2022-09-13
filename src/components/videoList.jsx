import React, { Component } from "react";

import { LikeOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Row, Col, Avatar, List, Space, Image } from 'antd';


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export class VideoList extends Component {
    transformNumber(number) {
        const result = number / 10000;
        return result.toFixed(1) + "万";
    }
    render() {
        const color = "#1890ff";
        const PlayIcon = () => <PlayCircleOutlined style={{ color }} />;
        const LinkIcon = () => <LikeOutlined style={{ color }} />;
        const StarIcon = () => <StarOutlined style={{ color }} />;
        return (
            <List
                className="VideoList"
                itemLayout="vertical"
                size="large"
                {...this.props.config}
                renderItem={item => (
                    <Row
                        className="listItem"
                        align="middle"
                    >
                        <Col xs={{ span: 0 }} sm={{ span: 4 }} md={{ span: 4 }} lg={{ span: 3 }} xl={{ span: 2 }} xxl={{ span: 2 }} className="videoImg">
                            <Image width={100} height={100} style={{ objectFit: "cover" }} alt="videoImg" src={item.pic} />
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 20 }} md={{ span: 20 }} lg={{ span: 21 }} xl={{ span: 22 }} xxl={{ span: 22 }} >
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={PlayIcon} text={this.transformNumber(item.stat.view)} key="view" />,
                                    <IconText icon={LinkIcon} text={this.transformNumber(item.stat.like)} key="like" />,
                                    <IconText icon={StarIcon} text={this.transformNumber(item.stat.favorite)} key="favorite" />,
                                ]}
                            >
                                <List.Item.Meta
                                    className="listmeta"
                                    avatar={
                                        <Avatar
                                            onClick={this.props.toUpInfo.bind(this, item.owner)}
                                            src={item.owner.face}
                                        />
                                    }
                                    title={<a href={item.short_link} target="_blank" rel="noreferrer"> <b>{item.title}</b></a>}
                                    description={
                                        <div className="description ellipsis" onClick={this.props.toUpInfo.bind(this, item.owner)}><b>{item.owner.name}</b>：{item.desc}</div>
                                    }
                                />
                                <div>
                                    <Col xs={{ span: 24 }} sm={{ span: 0 }} md={{ span: 0 }} lg={{ span: 0 }} xl={{ span: 0 }} xxl={{ span: 0 }} className="videoImg">
                                        <Image width={"100%"} height={200} style={{ objectFit: "cover" }} alt="videoImg" src={item.pic} />
                                    </Col>
                                    {item.content}
                                </div>
                            </List.Item>
                        </Col>
                    </Row>
                )}
            />
        )
    }
}