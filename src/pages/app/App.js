import { Component } from "react";

import axios from "axios";

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
		}
	}
	async getDetail() {
		const { data: { data: { post_content } } } = await axios.get(`/api/server/note/detail?id=170`);
		this.setState({
			content: post_content
		});
	};

	createMarkup(__html) {
		return { __html };
	}

	componentDidMount() {
		this.getDetail();
	}
	render() {
		const AboutMe = () => {
			return <div dangerouslySetInnerHTML={this.createMarkup(this.state.content)} />;
		};

		return (
			<div className="App">
				<AboutMe />
			</div>
		)
	}
}