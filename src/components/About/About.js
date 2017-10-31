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
import s from './About.css';
import Link from '../Link';


class About extends React.Component {
  render() {
    return (
      <div className={s.root} >
        <div className={s.container}>

          <div className={s.row}>
            <h2 className={s.sectionHeader}>about</h2>
            <div className={s.underLine}></div>
          </div>

          <div className={cx(s.row, s.wrap)}>
              {/* <img className={s.consultingImg} src={consultingImg} /> */}
              <div className={s.textContainer}>
                <p className={s.text}>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ac viverra arcu. Quisque leo dolor.</p>
              </div>
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(s)(About);
