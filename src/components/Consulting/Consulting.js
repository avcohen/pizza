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
import cx from 'classnames';
import s from './Consulting.css';
import Link from '../Link';
import consultingImg from './consultingImg.jpg';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root} id='consulting' >
        <div className={s.container}>

          <div className={s.row}>
            <h2 className={s.sectionHeader}>consulting</h2>
            <div className={s.underLine}></div>
          </div>

          <div className={cx(s.row, s.wrap)}>
              <img className={s.consultingImg} src={consultingImg} />
              <div className={s.textContainer}>
                <p className={s.text}>Falco has consulted in Sao Paulo, Bogota, Panama, Toronto, London, New York City, Chicago, Los Angeles, Seattle, Charleston, Iowa, and currently has projects in development in Argentina, Spain, Australia, Kuwait, India and Singapore</p>
                {/* <p className={s.tick}></p>
                <p className={cx(s.text,s.text2)}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, similique.</p>
                <p className={s.tick}></p> */}
                {/* <p className={cx(s.text,s.link)}>Lorem ipsum dolor sit amet.</p> */}
              </div>
          </div>

        </div>

      </div>
    );
  }
}

export default withStyles(s)(Footer);
