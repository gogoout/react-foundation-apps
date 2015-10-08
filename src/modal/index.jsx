var React = require('react');
var cx = require('react/lib/cx');
var Animation = require('../utils/animation');
var foundationApi = require('../utils/foundation-api');

var Modal = React.createClass({
  getInitialState: function () {
    return { open: false };
  },
  getDefaultProps: function () {
    return {
      overlay: true,
      overlayClose: true,
      animationIn: 'fadeIn',
      animationOut: 'fadeOut'
    };
  },
  componentDidMount: function () {
    foundationApi.subscribe(this.props.id, function (name, msg) {
      if (msg === 'open') {
        this.setState({open: true});
      } else if (msg === 'close') {
        this.setState({open: false});
      } else if (msg === 'toggle') {
        this.setState({open: !this.state.open});
      }
    }.bind(this));
  },
  componentWillUnmount: function () {
    foundationApi.unsubscribe(this.props.id);
  },
  hideOverlay: function (e) {
    e.preventDefault();
    if (this.props.overlayClose) {
      // use foundationApi so others can listen on this
//      this.setState({open: false});
      foundationApi.publish(this.props.id,'close');
    }
  },
  stopClickPropagation: function (e) {
    // remove this because will cause checkbox inside modal error By Gogoout
//    e.preventDefault();
    e.stopPropagation();
  },
  // unmount children after modal closed because usually we don't want to continue the state of modal page by Gogoout
  renderChildren:function(){
    if(this.state.open){
      return this.props.children;
    }
    return <div/>;
  },
  render: function() {
    var overlayStyle = {};
    if (!this.props.overlay) {
      overlayStyle.background = 'transparent';
    }
    return (
      <Animation active={this.state.open} animationIn="fadeIn" animationOut="fadeOut">
        <div className='modal-overlay' style={overlayStyle} onClick={this.hideOverlay} >
          <Animation
            active={this.state.open}
            animationIn={this.props.animationIn}
            animationOut={this.props.animationOut}
          >
            <div id={this.props.id} data-closable={true} className='modal' onClick={this.stopClickPropagation}>
              {this.renderChildren()}
            </div>
          </Animation>
        </div>
      </Animation>
    );
  },
});

module.exports = Modal;
