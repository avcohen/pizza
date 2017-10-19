/* eslint-disable */
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Illustration.css';

import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';


class Feedback extends React.Component {
  constructor(){
    super();
    this.state = {
      illustrationData : null,
      activeCategory : null
    }
  }
  render() {
    return (
      <div className={s.root}>
        <svg className={s.top} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#272635" points="0,100 100,0 100,100"/>
        </svg>
        <div className={s.container}>
          <h3 className={s.sectionHeader}>illustration</h3>
          <ul className={s.category}>
            <li className={s.categoryItem}>flyers & posters</li>
            <li className={s.categoryItem}>t-shirts</li>
            <li className={s.categoryItem}>prints</li>
          </ul>
          <div className={s.imageContainer}>
            <img className={s.image} src={img1} alt=""/>
            <img className={s.image} src={img2} alt=""/>
            <img className={s.image} src={img3} alt=""/>
            <img className={s.image} src={img1} alt=""/>
            <img className={s.image} src={img2} alt=""/>
            <img className={s.image} src={img3} alt=""/>
            <img className={s.image} src={img1} alt=""/>
            <img className={s.image} src={img2} alt=""/>
            <img className={s.image} src={img3} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
