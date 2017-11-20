import {selectDefinitionsFromManifest} from './Setting';

export class AppInfoService
{
  /**
   * @param api
   * @param appId
   * @param appVersion
   * @return {Promise.<string>}
   */
  determineAssetEndpoint({ api, appId, appVersion })
  {
    return api.get('helpdesk/discover')
      .then(({ body }) => body.data.helpdesk_url)
      .then(helpdeskUrl => `${helpdeskUrl.replace(/\/+$/, '')}/file.php/apps/${appId}/v${appVersion}/files/assets`)
      ;
  }

  /**
   * @param api
   * @param instanceId
   * @return {Promise.<{}>}
   */
  getInstanceInstallStatus({ api, instanceId })
  {
    return api.get(`apps/${instanceId}/status`)
      .then(({ body }) => {
        return body;
      })
      .then(({ is_installed }) => is_installed)
    ;
  }

  loadManifestChanges({ api, appId  })
  {
    return api.get(`apps/packages/${appId}/manifest-changes`).then(({ body }) => body);
  }

  /**
   * @return {Promise.<{}>}
   */
  loadManifest({ api, appId  })
  {
    return api.get(`apps/packages/${appId}/manifest`).then(({ body }) => body);
  }

  /**
   * @param {{}} manifest
   * @param {Function} storage
   * @return {*}
   */
  loadSettingValues(manifest, storage) {
    const settings = selectDefinitionsFromManifest(manifest);
    if (settings.length) {
      const names = settings.map(setting => setting.name);
      return storage.getAppStorage(names);
    }

    return Promise.resolve({});
  }

}