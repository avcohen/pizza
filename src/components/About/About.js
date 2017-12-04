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


import aboutImg from './about.jpg';


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
              <img className={s.aboutImg} src={aboutImg} />
              <div className={s.textContainer}>

                <p className={s.text}>Anthony Falco first learned pizza making from his Sicilian grandmother. After starting his career as a web designer and internet entrepreneur in high school, he traveled the world, re-igniting his passion for food.</p>
                <p className={s.text}>At the age of 22, he opened his first restaurant in Seattle, a tiny pomme frite shop in the world famous music venue Neumos, on Capitol Hill. These two failures in entrepreneurship prompted him to move to New York where he met and worked with some bartenders who were about to open Roberta's Pizza. He learned and perfected his pizza techniques there. He also cooked wood-fired Italian and American food under Nate Appleman (James Beard winner and Pulino's chef) and Jean Adamson (Vinegar Hill House).</p>
                <p className={s.text}>Falco worked at Roberta's for nine years and was involved in many aspects of the restaurant with a focus on all things pizza, as Pizza Czar.</p>
                <p className={s.text}>Since leaving Roberta’s in 2016, Falco has consulted in Sao Paulo, Bogota, Panama, Toronto, London, New York City, Chicago, Los Angeles, Seattle, Charleston, Iowa, and currently has projects in development in Argentina, Spain, Australia, Kuwait, India and Singapore.</p>
                <p className={s.text}>He resides in Williamsburg Brooklyn with his wife and two sons and is currently the most well known International Pizza Consultant in the world.</p>
              </div>
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(s)(About);
