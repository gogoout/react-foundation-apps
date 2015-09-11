var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');

var Accordion = React.createClass({
  getInitialState: function () {
  // due to the bug:[#4461](https://github.com/facebook/react/issues/4461)
  // move setState in the `componentWillMount` to the `getInitialState`
    var sections = [];
    React.Children.forEach(this.props.children, function (child, index) {
      sections.push({active: false});
    });
    if (this.props.autoOpen) {
      sections[0].active = true;
    }
    return{sections: sections};
  },
  getDefaultProps: function () {
    return {
      autoOpen: true,
      multiOpen: false,
      collapsible: false
    };
  },
  select: function (selectSection) {
    var sections = this.state.sections;
    sections.forEach(function (section, index) {
      if(this.props.multiOpen) {
        if(index === selectSection) {
          section.active = !section.active;
        }
      } else {
        if(index === selectSection) {
          section.active = (this.props.collapsible === true)? !section.active: true;
        } else {
          section.active = false;
        }
      }
    }.bind(this));
    this.setState({sections: sections});
  },
  render: function () {
    var children = React.Children.map(this.props.children, function (child, index) {
      return cloneWithProps(child, {
        active: this.state.sections[index]? this.state.sections[index].active: false,
        activate: this.select.bind(this, index)
      });
    }.bind(this));
    return (
      <div className='accordion'>{children}</div>
    );
  }
});

module.exports = Accordion;
Accordion.Item = require('./item');