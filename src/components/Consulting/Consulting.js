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

    componentDidMount(){
        // const pizzaEmoji = document.getElementById('pizzaEmoji')
        // pizzaEmoji.classList.add(s.spin)
    }

    render() {
        return (
            <div className={cx(s.root)}>
                <div className={s.container}>
                    <div className={s.row}>
                        <div className={s.col}>
                            <h2 className={s.sectionHeader}>🌎&nbsp;international pizza consultant</h2>
                            <div className={s.textContainer}>
                                <p className={s.text}>Hi, My name is Anthony Falco and I'm an international pizza consultant. I help people achieve their dreams of starting pizzerias and perfecting their craft. My services include kitchen design, equipment selection, natural fermentation techniques, staff training, menu development, food costing, social media strategies and more.</p>
                                <p className={s.tick}></p>
                                <p className={s.text}>I've helped people all over the world create stand out pizza programs and world class food brands.</p>
                                <p className={s.tick}></p>
                                <p className={s.text}>Email me and let's make a pizza party happen.</p>
                            </div>
                        </div>
                        <div className={s.imgCol}>
                            <img className={s.consultingImg} src={consultingImg} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Footer);
