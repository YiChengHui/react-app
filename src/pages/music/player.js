import { CloudDownloadOutlined, StepBackwardOutlined, PlayCircleOutlined, StepForwardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Row, Col, Image, Divider, List } from 'antd';
import { fallback } from "@/components/tools";
export function Player() {
    const [listShow, setListShow] = useState(false);

    const [listData, setListData] = useState([
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ]);


    function showList() {
        setListShow(!listShow);
    }

    return (
        <div className='Player'>
            <Row >
                <Col span={8} className="info">
                    <Row>
                        <Col span={4}>
                            <Image height={50} width={50} src='http://yichenghui.net/wp-content/uploads/2022/09/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20220913160828-1.jpg' fallback={fallback} />
                        </Col>
                        <Col span={20}>
                            <div className='muiscName'>
                                <span className='description ellipsis'>这是一段很长很长很</span>
                                <span className='owner'>歌手</span>
                            </div>
                            <div className='downloadIcon'>
                                <CloudDownloadOutlined />
                            </div>
                        </Col>
                    </Row>


                </Col>
                <Col span={8} className="iconsGroup">
                    <StepBackwardOutlined />
                    <PlayCircleOutlined />
                    <StepForwardOutlined />
                </Col>
                <Col span={8} className="duration">
                    <span className='time'>00:00&nbsp;/&nbsp;03:59</span>
                    <span className='text'>词</span>
                    <span className='icon' onClick={showList}>
                        <MenuFoldOutlined />
                    </span>
                </Col>
            </Row>
            <List
                className={listShow ? 'sliderList show' : 'sliderList hide'}
                size="large"
                header={
                    <div className='closeSlide'>
                        <MenuUnfoldOutlined onClick={showList} />
                    </div>
                }
                bordered
                dataSource={listData}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    )
}