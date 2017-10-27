require('../main/sass/index.scss');
import { createApp } from '@deskpro/apps-sdk-core';
import settings from '../settings/javascript';

import { runAppWithInstaller } from '../main/javascript';
createApp(function (app) {
  return runAppWithInstaller(app, settings);
});