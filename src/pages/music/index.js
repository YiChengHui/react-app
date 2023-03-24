import { Card, Row, Col, PageHeader, Image } from 'antd';
import { useEffect, useState } from "react";
import { transformDate, fallback } from "@/components/tools";
import { Player } from './player';
import axios from "axios";

const { Meta } = Card;

export function Music(prop) {
    const [listArr, setList] = useState([]);
    const [showPlayer] = useState(true);

    async function getList() {
        const { data: { list } } = await axios.get(`/api/music/toplist`);
        setList(list);
    }

    function toDetail(id) {
        prop.history.push(`/topList/${id}`);
    }

    useEffect(() => {
        getList()
    }, []);
    const TopList = () => {
        return <Row className="MusicList" gutter={"20px"}>
            {
                listArr.map(item => {
                    return <Col
                        xxl={4} xl={6} lg={8} sm={12} xs={12}
                        className="MusicListItem animate__animated animate__fadeInDown"
                        onClick={toDetail.bind(null, item.id)}
                        key={item.id}
                    >
                        <Card
                            className="musicCard"
                            hoverable
                            style={{ width: 240 }}
                            cover={<Image alt={item.name} src={item.coverImgUrl} fallback={fallback} preview={false} />}
                            actions={[
                                <div>{transformDate(item.updateTime)}</div>,
                                <div>{item.updateFrequency}</div>,
                            ]}
                        >
                            <Meta title={item.name} description={
                                <div className="desc">
                                    {item.description}
                                </div>
                            }
                            />
                        </Card>
                    </Col>
                })
            }
        </Row>
    }
    return (
        <div className="MusicIndex">
            {/* <PageHeader title="音乐榜单" />
            <TopList /> */}
            <Player show={showPlayer} />
        </div>
    )
}