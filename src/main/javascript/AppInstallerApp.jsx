import React from 'react';
import PropTypes from 'prop-types';

import {UniformsSettingsForm} from './Uniforms';
import {ScreenInstall, PageApp} from './UI';
import {AppInstallerService} from './AppInstallerService';
import {AppInfoService} from './AppInfoService';
import {selectDefinitionsFromManifest} from './Setting';

function delay(interval, f)
{
  if (window && typeof window.setTimeout === 'function') {
    window.setTimeout(f, interval);
  } else {
    f();
  }
}

export class AppInstallerApp extends React.Component
{
  static propTypes = {
    dpapp: PropTypes.object.isRequired,
    installer: PropTypes.func.isRequired
  };

  constructor(props)  {
    super(props);
    this.initState();
  }

  componentDidMount()
  {
    const { id: appId } = this.props.dpapp.context.object;
    const {restApi: api, instanceId} = this.props.dpapp;
    const { storage } = this.props.dpapp;
    const { installType } = this.props.dpapp.context.toJS();

    const appInfoService = new AppInfoService();
    appInfoService.loadManifest({api, appId})
      .then(manifest => {
        return appInfoService.determineAssetEndpoint({api, appId, appVersion: manifest.appVersion}).then(assetEndpoint => ({manifest, assetEndpoint}));
      })
      .then(state => { // load setting values
        if (installType === 'update') {
          return appInfoService.loadSettingValues(state.manifest, storage).then(settings => ({ ...state, settings }));
        }
        return state;
      })
      .then(state => { //load changes
        let loadChangesPromise;

        if (installType === 'update') { // if it is an update and the instance is installed, just update settings
          loadChangesPromise = appInfoService.getInstanceInstallStatus({ api, instanceId }).then(isInstalled => !isInstalled);
        } else {
          loadChangesPromise = Promise.resolve(true);
        }
        return loadChangesPromise.then(loadChanges => loadChanges ? appInfoService.loadManifestChanges({api, appId}): [] )
          .then(changes => ({ ...state, changes }))
        ;
      })
      .then(state => ({ error:null,  route: '/settings', ...state}))
      .catch(error => ({ route: '/error', error }))
      .then(state => this.setState(state))
    ;
  }

  initState()  {
    this.state = {
      manifest:  null,
      error:     null,
      route:    '/loading',
      installProgress: 0,
      installSteps: 1,
      assetEndpoint: '',
      settings: {},
      changes: []
    };
  }

  /**
   * @param {{}} settings
   * @return {Promise.<*>}
   */
  onSaveSettings = (settings) =>
  {
    this.setState({ route: '/install' });
    if (!settings) {
      return Promise.resolve({ onStatus: this.onAfterSaveSettings });
    }

    const { restApi, appId, instanceId } = this.props.dpapp;
    const service = new AppInstallerService({ api: restApi });

    return service.saveSettings(instanceId, appId, settings)
      .then(() => ({ onStatus: this.onAfterSaveSettings }))
    ;
  };

  onAfterSaveSettings = (err) =>
  {
    const status = err ? 'error' : 'success';

    const { onInstallStatus } = this.props.dpapp.context.toJS();
    const { manifest } = this.state;
    const { restApi, instanceId } = this.props.dpapp;

    const service = new AppInstallerService({ api: restApi });
    const installTasks  = service.createInstallTasks(instanceId, this.state.changes);
    const installSteps  = 1 + installTasks.length;
    let installProgress = 1;

    this.setState({ installProgress, installSteps });

    //execute each task sequentially
    let taskPromise = Promise.resolve(installProgress);
    for (const task of installTasks) {
      taskPromise = taskPromise.then(progress => {
        return task().then(() => {
          const installProgress = progress + 1;
          this.setState({ installProgress });
          return installProgress;
        });
      });
    }

    taskPromise.then(installProgress => {
      this.setState({ installProgress });
      delay(500, () => this.props.dpapp.emit(onInstallStatus, { status, manifest }));
    });
  };

  render()
  {
    const { route } = this.state;

    if (route === '/error') {
      return (<div><p>The app installer encountered an error</p></div>);
    }

    if (route === '/settings') {

      const { manifest } = this.state;
      const definitions = selectDefinitionsFromManifest(manifest);

      const { installer:ScreenSettings } = this.props;
      const { assetEndpoint, settings } = this.state;
      const { installType } = this.props.dpapp.context.toJS();

      return (
        <PageApp icon={`${assetEndpoint}/icon.png`} description={manifest.description} title={manifest.title} version={manifest.appVersion}>
          <ScreenSettings
            dpapp={this.props.dpapp}
            installType={installType}
            finishInstall={this.onSaveSettings}
            settings={definitions}
            values={settings}
            settingsForm={UniformsSettingsForm}
          />
        </PageApp>
      );
    }

    if (route === '/install') {
      const {installProgress, installSteps, manifest, assetEndpoint} = this.state;
      const progress = Math.round(100 * installProgress / installSteps);

      return (
        <PageApp icon={`${assetEndpoint}/icon.png`} description={manifest.description} title={manifest.title} version={manifest.appVersion}>
          <ScreenInstall progress={progress}/>
        </PageApp>
      );
    }

    if (route === '/loading') {
      return (<p>Loading...</p>)
    }

    return null;
  }
}
