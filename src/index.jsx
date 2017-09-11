import React from 'react';
import PropTypes from 'prop-types';
export default class Welcome extends React.Component {

  render() {
    return <div>{this.props.content}</div>;
  }
}
Welcome.displayName = 'Welcome';
Welcome.propTypes = {
  /**
   * content of element
   */
  content: PropTypes.string
};
Welcome.defaultProps = {
  content: 'Hello Tmall'
};
