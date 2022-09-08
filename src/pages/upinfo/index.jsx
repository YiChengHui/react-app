import { Component } from "react";

import { Row, Col, Descriptions, Avatar } from "antd";

import { api } from "@/api/index";

export class UpInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upInfo: {
                name: "",
                face: "",
                top_photo: "",
            },
        }
    }


    async getUpInfo(mid) {
        // api.get(`/api/x/space/arc/search`, {
        //     params: {
        //         mid,
        //         ps: 20,
        //         pn: 1,
        //         tid: 0,
        //         index: 1,
        //         jsonp: "jsonp",
        //     }
        // })
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
        console.log(upInfo);
    }

    componentDidMount() {
        const { match: { params: { mid } } } = this.props;
        this.getUpInfo(mid);
    }

    render() {
        return (
            <div className="UpInfo">
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
                    <Descriptions.Item span={3}>
                        
                    </Descriptions.Item>

                </Descriptions>
            </div>
        )
    }
}