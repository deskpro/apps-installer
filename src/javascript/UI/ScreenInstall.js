import React from 'react';
import PropTypes from 'prop-types';
import Progress from './Progress'
import ProgressBar from './ProgressBar'

export class ScreenInstall extends React.Component
{
  static propTypes = {
    progress: PropTypes.number.isRequired
  };

  render() {
    return (
      <Progress size="large" type="primary" style={{ border: '1px solid #ccc' }}>
        <ProgressBar percent={this.props.progress}>{this.props.progress} %</ProgressBar>
      </Progress>
    );
  }
}
