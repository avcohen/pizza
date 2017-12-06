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
import s from './MobileMenu.css';
import Link from '../Link';

import FontAwesome from 'react-fontawesome';

class MobileMenu extends React.Component {
  constructor(){
    super();
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
  }

  handleScrollToElement(e){
    e.preventDefault();
    this.props.closeMenu();
    this.props.scrollToSection(e)
  }

  render() {


    let mobileMenu = null;
    if (this.props.visibility === false ) {
      mobileMenu = '';
    }

    else {
      this.props.hideMobileTitle();
      mobileMenu = (
          <div className={s.container}>
            <nav>
              <div className={s.row}>
                <a onClick={this.handleScrollToElement} data-scrollTarget="consulting" >consulting</a>
                <a onClick={this.handleScrollToElement} data-scrollTarget="press" >press</a>
                <a onClick={this.handleScrollToElement} data-scrollTarget="illustration" >illustration</a>
                <a onClick={this.handleScrollToElement} data-scrollTarget="about" >about</a>
                {/* <a onClick={this.handleScrollToElement} data-scrollTarget="contact" >contact</a> */}
              </div>

              <div className={cx(s.row, s.socialRow)}>
                <a href="tel:12062954206" className={s.socialLinks} target="_blank">
                    <FontAwesome name='whatsapp' />

                </a>
                <a href="https://www.instagram.com/millennium_falco/" className={s.socialLinks} target="_blank">
                    <FontAwesome name='instagram' />
                </a>
              </div>

              <div className={cx(s.rowCentered, s.row)}>
                <span className={s.closeButton} onClick={this.props.closeMenu}>
                  <FontAwesome name='times' size='2x'/>
                </span>
              </div>

            </nav>

          </div>
      );
    }

    return (
      <div id="scrollContainer" className={s.root}>
        {mobileMenu}
      </div>
    );
  }
}

export default withStyles(s)(MobileMenu);
