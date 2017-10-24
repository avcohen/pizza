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
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

import sliceTop from './slice-top.png';
import sliceBottom from './slice-bottom.png';

class Navigation extends React.Component {
  constructor(){
    super();
    this.state = {
      menuOpen : false
    }
    this.openMenu = this.openMenu.bind(this);
  }

  componentDidMount(){

  }

  openMenu(){
    console.log('menu toggled');
    this.setState({
      menuOpen : !this.state.menuOpen
    })
  }

  render() {

    return (
      <div className={s.root} role="navigation">

        <div className={s.sliceMenu} onClick={this.openMenu}>
          <img
            className={cx(s.sliceLayer, s.sliceLayerTop)}
            src={sliceTop}
            alt=""
          />
          <img
            className={cx(s.sliceLayer, s.sliceLayerBottom)}
            src={sliceBottom}
            alt=""
          />
        </div>

        {/* <div className={s.menuPane}>
          <nav className={s.nav}>
            <Link className={s.navLink} to="/about">consulting</Link>
            <Link className={s.navLink} to="/contact">illustration</Link>
            <Link className={s.navLink} to="/about">about</Link>
          </nav>
        </div> */}





        {/* <span className={s.spacer}> | </span>
        <Link className={s.link} to="/login">
          Log in
        </Link>
        <span className={s.spacer}>or</span>
        <Link className={cx(s.link, s.highlight)} to="/register">
          Sign up
        </Link> */}
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
