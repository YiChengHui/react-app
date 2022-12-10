import { useEffect, useState } from "react";
import { Row, Col, Avatar, Space } from "antd";
import {
    UserOutlined, StepBackwardOutlined, StepForwardOutlined,
    PlayCircleFilled, PauseCircleFilled, SoundOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
export function Music(props) {
    const [listSwitch, setListSwitch] = useState(false);
    const [playSwitch, setPlaySwitch] = useState(false);
    const [playListClass, setPlayListClass] = useState("playList fixed hide")
    const PlayIcon = props => playSwitch ? <PauseCircleFilled {...props} /> : <PlayCircleFilled {...props} />;

    const play = event => {
        setPlaySwitch(!playSwitch);
    };

    const playListSwitch = status => {
        setListSwitch(status);
        setPlayListClass(`playList fixed ${status ? "show" : "hide"}`);
    }

    return <div className="musicPage">
        <Row style={{ height: "50px", lineHeight: "50px" }}>
            <Col span={8}>
                <Space size={8}>
                    <Avatar shape="square" size={50} icon={<UserOutlined />} />
                    <span>歌曲-歌手</span>
                </Space>
            </Col>
            <Col span={8} style={{ textAlign: "center", height: "50px", lineHeight: "50px" }}>
                <Space align="center">
                    <StepBackwardOutlined style={{ fontSize: "25px" }} />
                    <PlayIcon style={{ fontSize: "30px", color: "#1890ff" }} onClick={play} />
                    <StepForwardOutlined style={{ fontSize: "25px" }} />
                    <SoundOutlined style={{ fontSize: "20px" }} />
                </Space>
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
                <MenuFoldOutlined style={{ fontSize: "30px" }} onClick={playListSwitch.bind(null, true)} />
            </Col>
        </Row>
        <Row className={ playListClass }>
            <MenuUnfoldOutlined style={{ fontSize: "30px" }} onClick={playListSwitch.bind(null, false)} />
        </Row>
    </div>
}