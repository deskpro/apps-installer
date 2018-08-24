import React from 'react';
import ReactDOM from 'react-dom';
import { createApp } from '@deskpro/apps-sdk';
import {AppInstallerApp} from './AppInstallerApp';
import {ScreenSettingsDefault} from './UI';

require('../sass');

function render(dpapp, installer) {
  ReactDOM.render(
    <AppInstallerApp dpapp={dpapp} installer={installer}/>,
    document.getElementById('root')
  );
}

export default function(installer)
{
  const actualInstaller = installer || ScreenSettingsDefault;

  createApp(function (app) {
    return render(app, actualInstaller);
  });
}
