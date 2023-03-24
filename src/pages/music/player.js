import { CloudDownloadOutlined, StepBackwardOutlined, PlayCircleOutlined, StepForwardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Image, List } from 'antd';
import { fallback } from "@/components/tools";
let timer = null;
export function Player(prop) {
    const audioRef = useRef(null); // video的dom
    const [currentTime, setCurrentTime] = useState(0); // 当前播放位置
    const [listShow, setListShow] = useState(false); // 列表展示
    const [playState, setPlayState] = useState(false); // 播放状态
    const [playerClassName, setPlayerClassName] = useState('Player animate__animated'); // 播放组件显示隐藏动画

    const [listData] = useState([
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ]); // 列表数据

    const [musicSrc] = useState('./起风了.mp3'); // 播放音乐url

    // 查看列表
    function showList() {
        setListShow(!listShow);
    }

    // 开始播放或者暂停
    function play() {
        setPlayState(!playState);
    }

    useEffect(() => {
        const { current: audioDom } = audioRef;
        if (playState) {
            audioDom.play();
            timer = setInterval(() => {
                const { currentTime, duration } = audioDom;
                setCurrentTime(`${currentTime / duration * 100}%`);
            }, 100);
        } else {
            audioDom.pause();
            clearInterval(timer);
        }
    }, [playState]);

    // 播放按钮
    const PlayButton = useCallback(() => {
        return playState ? <PauseCircleOutlined onClick={play} /> : <PlayCircleOutlined onClick={play} />
    }, [playState]);

    // 进度条
    function Slider(prop) {
        return (
            <div className='Slider'>
                <div className='step'>
                    <div className='color' style={{ width: prop.left }}></div>
                    <div className='control' style={{ left: prop.left }}></div>
                </div>
            </div>
        )
    }
    // 显隐watch
    useEffect(() => {
        if (prop.show) {
            setPlayerClassName('Player PlayerShow')
        } else {
            setPlayerClassName('Player PlayerHide')
        }
    }, [prop.show])

    return (
        <div className={playerClassName}>
            <Slider left={currentTime} />
            <Row >
                <Col span={8} className="info">
                    <Row>
                        <Col span={4}>
                            <Image height={50} width={50} src='https://bkimg.cdn.bcebos.com/pic/810a19d8bc3eb13533fac918ec57bfd3fd1f4134ee75?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxNTA=,g_7,xp_5,yp_5' fallback={fallback} />
                        </Col>
                        <Col span={20}>
                            <div className='muiscName'>
                                <span className='description ellipsis'>起风了</span>
                                <span className='owner'>买辣椒也用券</span>
                            </div>
                            <div className='downloadIcon'>
                                <CloudDownloadOutlined />
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} className="iconsGroup">
                    <StepBackwardOutlined />
                    <PlayButton />
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
            <audio style={{ display: "none" }} ref={audioRef}>
                <source src={musicSrc} />
            </audio>

        </div>
    )
}