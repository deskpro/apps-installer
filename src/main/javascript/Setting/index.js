export { SettingDefProps } from './SettingDefProps';
export { SettingTypes } from './SettingTypes';

export function selectDefinitionsFromManifest(manifest)
{
  if (!manifest || typeof manifest !== 'object') {
    throw new Error('expecting a manifest object');
  }

  let { settings } = manifest;
  return settings instanceof Array ? settings : []
}