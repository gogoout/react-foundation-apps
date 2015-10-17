var React = require('react'),
	classNames = require('classnames');

var Tab = React.createClass({
	getInitialState          : function () {
		return {isActive: this.props.isActive};
	},
	componentWillReceiveProps: function (newProps) {
		if (newProps.isActive !== this.state.isActive) {
			this.setState({isActive: newProps.isActive});
		}
	},
	render                   : function () {
		return (
			<div className = {classNames('tab-content',{'is-active': this.state.isActive})}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Tab;
