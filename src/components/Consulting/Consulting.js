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
                                <p className={s.text}>Falco has consulted in Sao Paulo, Bogota, Panama, Toronto, London, New York City, Chicago, Los Angeles, Seattle, Charleston, Iowa, and currently has projects in development in Argentina, Spain, Australia, Kuwait, India and Singapore</p>
                                <p className={s.tick}></p>
                                <p className={s.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, similique.</p>
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
