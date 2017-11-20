import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import AutoForm from 'uniforms-unstyled/AutoForm';
import {UniformsSettingsTransformer} from './UniformsSettingsTransformer'
import {Empty} from './Empty'

export class UniformsSettingsForm extends React.Component
{
  static propTypes = {
    settings: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props)  {
    super(props);
    this.formRef = null;
  }

  // shouldComponentUpdate(nextProps, nextState)
  // {
  //   return false;
  // }

  submit()
  {
    this.formRef.submit();
  }

  render()
  {
    const { settings, values, onSubmit } = this.props;
    const schema = UniformsSettingsTransformer.defsToSchemaBridge(settings);

    return (<AutoForm submitField={Empty} ref={ref => this.formRef = ref} schema={schema} model={values} onSubmit={onSubmit}/>);
  }
}