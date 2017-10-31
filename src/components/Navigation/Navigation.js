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
import MobileMenu from '../MobileMenu';

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
    window.addEventListener('scroll', this.toggleNavVisibilityOnScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.toggleNavVisibilityOnScroll);
  }

  openMenu(){
    this.setState({
      menuOpen : !this.state.menuOpen
    })
  }

  toggleNavVisibilityOnScroll(e){
    let scrollTop = window.scrollY
    let voidHeight = document.querySelector('#theVoid').offsetHeight;

    if (scrollTop > 0 || scrollTop < voidHeight){
      // in the void
      document.querySelector('#navBar').classList.remove(s.unhidden)
      document.querySelector('#navBar').classList.add(s.hidden)
    }
    if (scrollTop >= voidHeight) {
      document.querySelector('#navBar').classList.remove(s.hidden)
      document.querySelector('#navBar').classList.add(s.unhidden)
    }
    if (scrollTop === 0) {
      document.querySelector('#navBar').classList.remove(s.hidden)
      document.querySelector('#navBar').classList.add(s.unhidden)
    }
  }

  render() {
    let sliceTopClass = [s.sliceLayer, s.sliceLayerTop]
    if (this.state.menuOpen === true) {
      sliceTopClass.push(s.sliceLayerTopOpen);
    }

    return (
      <div className={cx(s.root,s.visible)} role="navigation">
        <div className={s.navContainer}>
          <div id="navBar"className={s.sliceMenu} onClick={this.openMenu}>
            <img
              className={cx(sliceTopClass)}
              src={sliceTop}
              alt=""
            />

            <img
              className={cx(s.sliceLayer, s.sliceLayerBottom)}
              src={sliceBottom}
              alt=""
            />
          </div>
        </div>

        <MobileMenu visibility={this.state.menuOpen}/>

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
