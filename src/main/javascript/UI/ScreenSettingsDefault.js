import React from 'react';
import PropTypes from 'prop-types';

export class ScreenSettingsDefault extends React.Component
{
  static propTypes = {
    install: PropTypes.func.isRequired,
    settings: PropTypes.array.isRequired,
    settingsForm: PropTypes.func.isRequired
  };

  onSettings(settings)
  {
    const { install } = this.props;
    install(settings).then(({ onStatus }) => onStatus);
  }

  render()
  {
    const { settings, install, settingsForm: SettingsForm } = this.props;

    if (settings.length) {
      let formRef;
      return (
        <div className={'settings'}>
          <SettingsForm settings={settings} ref={ref => formRef = ref} onSubmit={this.onSettings.bind(this)} />
          <button className={'btn-action'} onClick={() => formRef.submit()}>Update Settings</button>
        </div>
      );
    }

    return (
      <div className={'no-settings'}>
        <p>Click the button below to finish the installation.</p>
        <button className={'btn-action'} onClick={install.bind(null, [])}>Finish Install</button>
      </div>
    );
  }
}