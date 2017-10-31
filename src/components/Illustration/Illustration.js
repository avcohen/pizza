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
import cx from 'classnames';

import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';


class Illustration extends React.Component {
  constructor(){
    super();
    this.state = {
      illustrationData : null,
      activeCategory : null
    }
  }
  render() {
    return (
      <div
        className={cx(
          s.root,
          s['edge--top'],
          s['edge--bottom--reverse'],
          s['-dark'],
        )}
      >
        <div className={s.container}>
          <div className={s.row}>
            <h2 className={s.sectionHeader}>illustration</h2>
            <div className={s.underLine}></div>
          </div>

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

export default withStyles(s)(Illustration);
