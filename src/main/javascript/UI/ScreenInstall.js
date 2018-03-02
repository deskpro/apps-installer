import React from 'react';
import PropTypes from 'prop-types';
import { Progress, ProgressBar } from '@deskpro/react-components';

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