import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Slider.css';

class SliderComponent extends React.Component {
  render() {
    return <div className={s.root}>slider</div>;
  }
}

export default withStyles(s)(SliderComponent);
