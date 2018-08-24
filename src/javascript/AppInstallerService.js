import {CustomField} from './CustomField'

const toSettingsRequest = (instanceId, appId, name, value) => {
  return {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: `apps/${instanceId}/state/app:${appId}/${name}`,
    data: { value }
  };
};

/**
 * @param {string} instanceId
 * @param {CustomField} customField
 * @return {{method: string, headers: {Accept: string, Content-Type: string}, url: string, body}}
 */
const toCustomFieldRequest = (instanceId, customField) =>
{
  const urlMap = {
    'ticket': `/ticket_custom_fields`,
    'organization': `/organization_custom_fields`,
    'person': `/person_custom_fields`,
  };
  const url = urlMap[customField.attachedTo];

  if (!url) {
    throw new Error('could not map custom field to create field request');
  }

  return {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: url,
    data: {
      title: customField.title,
      is_enabled: true,
      is_user_enabled: false,
      is_agent_field: true,
      alias: customField.getQualifiedAlias(instanceId),
      handler_class: customField.getHandlerClass()
    }
  };
};

export class AppInstallerService
{
  /**
   * @param {{post: function, put: function}}  api
   */
  constructor({ api })
  {
    this.props = { api }
  }

  /**
   * @param instanceId
   * @param {Array} changes
   * @return {Array}
   */
  createInstallTasks(instanceId, changes)
  {
    const tasks = [];
    const customFieldsAdditions = changes.filter(change => change.type === 'add' && change.module === 'customFields').map(change => change.value);

    if (customFieldsAdditions.length) {
      tasks.push(() => this.addCustomFields(instanceId, { customFields: customFieldsAdditions }))
    }

    tasks.push(() => this.setInstalled(instanceId, { status: true}));
    return tasks;
  }

  /**
   * @param {string} instanceId
   * @param {string} appId
   * @param {{}} values
   * @return {Promise.<{}>}
   */
  saveSettings(instanceId, appId, values)
  {
    const url = `batch`;
    const requests = Object.keys(values).reduce((acc, key) => {
      acc[key] = toSettingsRequest(instanceId, appId, key, values[key]);
      return acc;
    }, {});

    if (Object.keys(requests).length > 0) {
      return this.props.api.post(url, {requests }).then(() => values);
    }

    return Promise.resolve(values);
  }

  /**
   * @param {String} instanceId
   * @param {[]} customFields
   * @return {Promise.<[]>}
   */
  addCustomFields(instanceId, { customFields })
  {
    if (customFields instanceof Array && customFields.length > 0) {
      const url = `batch`;
      const requests = customFields.map(props => (new CustomField(props))).reduce((acc, customField) => {
        acc[customField.alias] = toCustomFieldRequest(instanceId, customField);
        return acc;
      }, {});
      return this.props.api.post(url, { requests }).then(() => customFields);
    }

    return Promise.resolve(customFields);
  }

  /**
   * @param instanceId
   * @param {boolean} status
   * @return {Promise.<{status: *}>}
   */
  setInstalled(instanceId, { status })
  {
    return this.props.api.put(`apps/${instanceId}`, { is_installed: status }).then(() => ({ status }));
  }
}