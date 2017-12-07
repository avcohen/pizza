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
    this.closeMenu = this.closeMenu.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    this.unHideMobileTitle = this.unHideMobileTitle.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.toggleNavVisibilityOnScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.toggleNavVisibilityOnScroll);
  }

  openMenu(){
    this.unHideMobileTitle();
    this.setState({
        menuOpen : !this.state.menuOpen
    })
  }

  closeMenu(){
      this.unHideMobileTitle();
    this.setState({
      menuOpen : false
    })

  }

  scrollToSection(e){
    const target = e.target.getAttribute("data-scrollTarget");
    const section = document.querySelector(`#${target}`)
    section.scrollIntoView({
        block : 'start',
        behavior: 'smooth'
    });

  }

  hideMobileTitle(){
    let mobileHeader = document.querySelector('#mobileHeader');
    mobileHeader.innerHTML = ''
  }

  unHideMobileTitle(){
    let mobileHeader = document.querySelector('#mobileHeader');
    mobileHeader.innerHTML = 'anthony falco'
  }

  toggleNavVisibilityOnScroll(e){
    let scrollTop = window.scrollY
    let voidHeight = document.querySelector('#theVoid').offsetTop;
    let mobileNavContainer = document.querySelector('#mobileNavContainer')
    let mobileHeader = document.querySelector('#mobileHeader');
    let sliceStack = document.querySelector('#sliceStack');

    if (scrollTop > 0 && scrollTop <= voidHeight){
      // past the header section
      sliceStack.classList.remove(s.hidden)
      mobileHeader.classList.remove(s.unhidden)
      mobileHeader.classList.add(s.hidden)
      sliceStack.classList.add(s.unhidden)
      mobileNavContainer.classList.add(s.backgroundInvisible)
    }

    if (scrollTop > voidHeight) {
      // past the header section
      mobileHeader.classList.add(s.unhidden)
      mobileNavContainer.classList.remove(s.backgroundInvisible)
      mobileNavContainer.classList.add(s.backgroundVisible)
    }

  }

  render() {
    let sliceTopClass = [s.sliceLayer, s.sliceLayerTop]
    if (this.state.menuOpen === true) {
      sliceTopClass.push(s.sliceLayerTopOpen);
    }

    return (
        <div className={s.root} role="navigation">
            <div className={s.mobileMenu}>
                <MobileMenu
                  closeMenu={this.closeMenu}
                  visibility={this.state.menuOpen}
                  hideMobileTitle={this.hideMobileTitle}
                  unHideMobileTitle={this.unHideMobileTitle}
                  scrollToSection={this.scrollToSection}
                />

                <div id="mobileNavContainer" className={s.navContainer}></div>
                <div id="sliceStack" className={s.sliceMenu} onClick={this.openMenu}>
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
                <h1 id="mobileHeader" className={cx(s.menuHeader,s.hidden)}>anthony falco</h1>
              </div>
              <div className={s.menu}>
                    <ul className={s.menuList}>
                        <li className={s.menuListItem}>
                            <a className={s.menuLink} data-scrollTarget="press" onClick={this.scrollToSection}>press</a>
                        </li>
                        <li className={s.menuListItem}>
                            <a className={s.menuLink} data-scrollTarget="illustration" onClick={this.scrollToSection}>illustration</a>
                        </li>
                        <li className={s.menuListItem}>
                            <a className={s.menuLink} data-scrollTarget="about" onClick={this.scrollToSection}>about</a>
                        </li>
                    </ul>
              </div>
        </div>
    );
  }
}

export default withStyles(s)(Navigation);
