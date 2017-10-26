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

import SimpleSlider from '../Slider/Slider';


class Footer extends React.Component {
  render() {
    return (
      <div className={s.root} >
        <div className={s.container}>

          <div className={s.row}>
            <h2 className={s.sectionHeader}>consulting</h2>
            <div className={s.underLine}></div>
          </div>

          <div className={cx(s.row, s.wrap)}>
              <img className={s.consultingImg} src={consultingImg} />
              <div className={s.textContainer}>
                <p className={s.text}>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ac viverra arcu. Quisque leo dolor.</p>
                <p className={s.text}>Donec eget lacinia tellus, in fermentum augue. Donec id dui at arcu tristique bibendum et quis magna.</p>
              </div>
          </div>

            {/* <div className={s.consultingSlider}>
              <div className={[s.row, s.sliderImg]}>
                <span className={s.sliderImgArrowLeft}>x</span>
                <img className={s.companyImg} src={cafe} alt=""/>
                <span className={s.sliderImgArrowRight}>x</span>
              </div>

              <div className={s.row}>
                <div className={s.sliderCopy}>
                  <h3 className={s.companyText}>Cafe Monstruo</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores totam optio aspernatur sapiente. Doloribus, iste.</p>
                </div>
              </div>
            </div> */}
        <SimpleSlider />
        </div>

      </div>
    );
  }
}

export default withStyles(s)(Footer);
