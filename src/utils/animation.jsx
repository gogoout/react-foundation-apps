// some parts of code from react/lib/ReactCSSTransitionGroupChild.js
var React = require('react');
var ReactTransitionEvents = require('react/lib/ReactTransitionEvents');
var CSSCore = require('react/lib/CSSCore');


function addClasses(node, classes) {
	classes.replace(/\s+/g, ' ').split(' ').forEach(function (each) {
		CSSCore.addClass(node, each);
	})
}
function removeClasses(node, classes) {
	classes.replace(/\s+/g, ' ').split(' ').forEach(function (each) {
		CSSCore.removeClass(node, each);
	})
}
var Animation = React.createClass({
	getInitialState   : function () {
		return {};
	},
	getDefaultProps   : function () {
		return {
			active      : false,
			animationIn : '',
			animationOut: ''
		};
	},
	reflow            : function (node) {
		return node.offsetWidth;
	},
	reset             : function (node) {
		node.style.transitionDuration = 0;
		CSSCore.removeClass(node, 'ng-enter');
		CSSCore.removeClass(node, 'ng-leave');
		CSSCore.removeClass(node, 'ng-enter-active');
		CSSCore.removeClass(node, 'ng-leave-active');
		removeClasses(node, this.props.animationIn);
		removeClasses(node, this.props.animationOut);
	},
	finishAnimation   : function () {
		var node = this.getDOMNode();
		this.reset(node);
		CSSCore.removeClass(node, this.props.active ? '' : 'is-active');
		this.reflow(node);
		ReactTransitionEvents.removeEndEventListener(node, this.finishAnimation);
		if (this.props.onEnd) {
			this.props.onEnd(this.props.active);
		}
	},
	animate           : function (animationClass, animationType) {
		var node = this.getDOMNode();
		var initClass = 'ng-' + animationType;
		var activeClass = initClass + '-active';


		this.reset(node);
		node.style.transitionDuration = '';
		addClasses(node, animationClass);
		CSSCore.addClass(node, initClass);
		CSSCore.addClass(node, 'is-active');

		//force a "tick"
//		this.reflow(node);
		delete node.style.transitionDuration;
		if (this.props.onStart) {
			this.props.onStart(this.props.active);
		}

		window.requestAnimationFrame(()=> {
			ReactTransitionEvents.addEndEventListener(node, this.finishAnimation);
			//activate
			CSSCore.addClass(node, activeClass);
		});

	},
	componentDidUpdate: function (prevProps) {
		if (prevProps.active !== this.props.active) {
			var animationClass = this.props.active ? this.props.animationIn : this.props.animationOut;
			var animationType = this.props.active ? 'enter' : 'leave';
			this.animate(animationClass, animationType);
		}
	},
	render            : function () {
		return React.Children.only(this.props.children);
	}
});

module.exports = Animation;