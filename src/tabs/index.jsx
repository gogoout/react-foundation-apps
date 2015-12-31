var React = require('react'),
	classNames = require('classnames');

var Tabs = React.createClass({
	getInitialState   : function () {
		return {
			selectedTab: 0
		};
	},
	_renderTabs       : function () {
		return React.Children.map(this.props.children, (child, index) => {
			return (
				<div className = {classNames('tab-item',{'is-active': index===this.state.selectedTab})}
				     onClick = {this.selectTab.bind(this, index, child.props.onSelect)}>
					{child.props.title}
				</div>
			);
		});
	},
	_renderTabContents: function () {
		return React.Children.map(this.props.children, (child, index) => {
			return React.cloneElement(child, {
				isActive: index === this.state.selectedTab
			});
		});
	},
	selectTab         : function (index,onSelect) {
		if (this.state.selectedTab !== index) {
			this.setState({selectedTab: index},function(){
				if(onSelect){
					onSelect();
				}
			});
		}
	},
	render            : function () {
		return (
			<div>
				<div className = 'tabs'>{this._renderTabs()}</div>
				<div className = 'tab-contents'>{this._renderTabContents()}</div>
			</div>
		);
	}
});

module.exports = Tabs;
Tabs.Tab = require('./tab');