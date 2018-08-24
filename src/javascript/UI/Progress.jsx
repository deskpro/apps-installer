import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Performs a key comparison between two objects, deleting from the first where
 * the keys exist in the second
 *
 * Can be used to remove unwanted component prop values. For example:
 *
 * ```jsx
 * render() {
 *   const { children, className, ...props } = this.props;
 *
 *    return (
 *      <div
 *        {...objectKeyFilter(props, Item.propTypes)}
 *        className={classNames('dp-item', className)}
 *       >
 *        {children}
 *      </div>
 *    )
 * }
 * ```
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {*}
 */
export function objectKeyFilter(obj1, obj2) {
  const obj2Keys = Object.keys(obj2);
  const newProps = Object.assign({}, obj1);
  Object.keys(newProps)
    .filter(key => obj2Keys.indexOf(key) !== -1)
    .forEach(key => delete newProps[key]);

  return newProps;
}


/**
 * Renders a progress bar.
 */
export default class Progress extends React.Component {
  static propTypes = {
    /**
     * The size of the progress bar.
     */
    size:      PropTypes.oneOf(['s', 'm', 'l', 'small', 'medium', 'large']),
    /**
     * The type of progress bar to render.
     */
    type:      PropTypes.oneOf(['primary', 'cta']),
    /**
     * CSS classes to apply to the element.
     */
    className: PropTypes.string,
    /**
     * Children to render.
     */
    children:  PropTypes.node
  };

  static defaultProps = {
    size:      'large',
    type:      'primary',
    className: '',
    children:  ''
  };

  render() {
    const {
      size, type, className, children, ...props
    } = this.props;

    return (
      <div
        className={classNames('dp-progress', `dp-progress--${type}`, `dp-progress--${size[0]}`, className)}
        {...objectKeyFilter(props, Progress.propTypes)}
      >
        {children}
      </div>
    );
  }
}
