var React = require('react');
var cx = require('react/lib/cx');
var Animation = require('../utils/animation');
var foundationApi = require('../utils/foundation-api');

var Modal = React.createClass({
	getInitialState     : function () {
		return {open: 0};
	},
	getDefaultProps     : function () {
		return {
			overlay     : true,
			overlayClose: true,
			animationIn : 'fadeIn',
			animationOut: 'fadeOut'
		};
	},
	componentDidMount   : function () {
		foundationApi.subscribe(this.props.id, function (name, msg) {
			if (msg === 'open') {
				this.setState({open: 2});
			}
			else if (msg === 'close') {
				this.setState({open: 1});
			}
			else if (msg === 'toggle') {
				this.setState({open: this.state.open <= 1 ? 2 : 1});
			}
		}.bind(this));
	},
	componentWillUnmount: function () {
		foundationApi.unsubscribe(this.props.id);
	},
	hideOverlay         : function (e) {
		e.preventDefault();
		if (this.props.overlayClose) {
			// use foundationApi so others can listen on this
//      this.setState({open: false});
			foundationApi.publish(this.props.id, 'close');
		}
	},
	stopClickPropagation: function (e) {
		// remove this because will cause checkbox inside modal error By Gogoout
//    e.preventDefault();
		e.stopPropagation();
	},
	overlayTransitionEnd: function (isActive) {
		if (!isActive) {
			this.setState({open: 0});
			if (this.props.onHide) {
				this.props.onHide();
			}
		}
	},
	modalTransitionEnd  : function (isActive) {
		if (isActive) {
			if (this.props.onShow) {
				this.props.onShow();
			}
		}
	},
	// unmount children after modal closed because usually we don't want to continue the state of modal page by Gogoout
	renderChildren      : function () {
		if (this.state.open) {
			return (<div id = {this.props.id} data-closable = {true} className = 'modal'
			             onClick = {this.stopClickPropagation}>
				{this.props.children}
			</div>);
		}
		return <div/>;
	},
	render              : function () {
		var overlayStyle = {};
		if (!this.props.overlay) {
			overlayStyle.background = 'transparent';
		}
		return (
			<Animation active = {this.state.open>1} animationIn = "fadeIn" animationOut = "delay fadeOut"
			           onEnd = {this.overlayTransitionEnd}>
				<div className = 'modal-overlay' style = {overlayStyle} onClick = {this.hideOverlay}>
					<Animation
						active = {this.state.open>1}
						animationIn = {this.props.animationIn}
						animationOut = {this.props.animationOut}
						onEnd = {this.modalTransitionEnd}
						>
						{this.renderChildren()}
					</Animation>
				</div>
			</Animation >
		);
	},
});

module.exports = Modal;
