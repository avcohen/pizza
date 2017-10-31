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
import s from './MobileMenu.css';
import Link from '../Link';

class MobileMenu extends React.Component {
  constructor(){
    super();
  }

  render() {
    if (this.props.visibility === false ) {
      return '';
    }
    else return (
      <div className={s.root}>
        <div className={s.container}>
          <nav>
            <a href="" >consulting</a>
            <a href="" >press</a>
            <a href="" >illustration</a>
            <a href="" >about</a>
            <a href="" >contact</a>
            <a href="" className={s.socialLinks}><span>lol</span>  <span>tel</span></a>
          </nav>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(MobileMenu);
