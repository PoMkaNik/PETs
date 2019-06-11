import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";

class Power extends Component {
	componentWillMount() {
		this.props.fetchPowerData();
	}

	renderPowerData() {
		console.log("render", this.props.data);
		return this.props.data.map(item => (
			<li className="list-group-item" key={item._id}>
				<div>{item.time}</div>
			</li>
		));
	}

	render() {
		if (!this.props.data) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<h3>Power Data</h3>
					<ul className="list-group">{this.renderPowerData()}</ul>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return { data: state.power.data }; // first data comes from index_reducer, second data comes from individual reducer
}

export default connect(mapStateToProps, actions)(Power);
