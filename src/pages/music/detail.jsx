import { useState, useEffect } from "react";
import { PageHeader, Image, Row, Avatar, Skeleton, List } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { fallback, bus } from "@/components/tools";

import axios from "axios";

export function MusicDetail(prop) {
    // 开始播放
    async function startPlay(musicInfo) {
        const { data: { data: [{ url }] } } = await axios.get(`/api/music/song/url/v1`, {
            params: {
                id: musicInfo.id,
                level: 'standard'
            }
        });
        bus.$emit("playMusic", {
            ...musicInfo,
            musicSrc: url,
            picUrl: musicInfo.al?.picUrl.replace(`http`, `https`),
            owner: musicInfo.ar[0]?.name,
        });
    }

    const [detail, setDetail] = useState({
        playlist: {
            name: "",
            tracks: [],
        },
    });
    const [initLoading, setLoading] = useState(true);

    const MusicList = ({ tracks }) => {
        return <List
            itemLayout="horizontal"
            loading={initLoading}
            dataSource={tracks}
            renderItem={item => (
                <List.Item>
                    <Skeleton avatar title={false} active loading={initLoading}>
                        <List.Item.Meta
                            avatar={<Avatar size={50} src={item.al?.picUrl.replace(`http`, `https`)} />}
                            title={item?.name}
                            description={item.ar[0]?.name}
                        />
                        <PlayCircleOutlined style={{ fontSize: "20px" }} onClick={startPlay.bind(null, item)} />
                    </Skeleton>
                    <hr />
                </List.Item>
            )}
        />
    };

    useEffect(() => {
        const { match: { params: { id } } } = prop;
        const getDetail = async id => {
            const { data } = await axios.get(`/api/music/playlist/detail?id=${id}`);
            setDetail(data);
            setLoading(false);
        };
        getDetail(id);
    }, []);


    return <div className="MusicDetail">
        <PageHeader
            onBack={() => prop.history.replace("/")}
            title="音乐榜单"
        />
        <div className="content">
            <Row>
                <Image className="headerImage" src={detail.playlist.coverImgUrl} width="100%" fallback={fallback} preview={false} />
            </Row>
            <MusicList tracks={detail.playlist.tracks} />
        </div>
    </div>
}