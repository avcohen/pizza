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
import s from './Footer.css';
import Link from '../Link';
import FontAwesome from 'react-fontawesome';
import cutterImg from './cutter.png'

class Footer extends React.Component {

  render() {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <img src={cutterImg} className={s.pizzaCutterMobile} alt="Pizza Cutter"/>
                <div className={s.row}>
                    <img src={cutterImg} className={s.pizzaCutter} alt="Pizza Cutter"/>
                </div>
                <a className={s.link} href="mailto:tony@piz.za.com?Subject=Inquiry" alt="email">
                    <FontAwesome style={{verticalAlign: 'middle', marginRight: '5px', fontSize: '1.5em'}} name='envelope-o'/> tony@piz.za.com
                </a>
                <a className={s.link} href="tel:12062954206" alt="telephone">
                    <FontAwesome style={{verticalAlign: 'middle', marginRight: '5px', fontSize: '1.5em'}} name='whatsapp'/> +1 (206) 295-4206
                </a>
                <a className={s.link} href="https://www.instagram.com/millennium_falco/" target="_blank" alt="instagram">
                    <FontAwesome style={{verticalAlign: 'middle', marginRight: '5px', fontSize: '1.5em'}} name='instagram' /> @millennium_falco
                </a>
            </div>
        </div>
    );
  }
}


export default withStyles(s)(Footer);
