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
                        <Col span={3} className="videoImg" >
                            <Image height={100} alt="videoImg" src={item.pic} />
                        </Col>
                        <Col span={21}>
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
                                    avatar={<Avatar
                                        onClick={this.props.toUpInfo.bind(this, item.owner)}
                                        src={item.owner.face}
                                    />}
                                    title={<a href={item.href}> <b>{item.title}</b></a>}
                                    description={item.desc}
                                />
                                {item.content}
                            </List.Item>
                        </Col>
                    </Row>
                )}
            />
        )
    }
}