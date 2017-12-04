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
import s from './Press.css';
import cx from 'classnames';




class Press extends React.Component {
  constructor(){
    super();
    this.state = {
      illustrationData : null,
      activeCategory : null
    }
  }
  render() {
    const articles = [
      {title : "bon appetit", url: "#"},
      {title : "esquire", url: "#"},
      {title : "evening standard", url: "#"},
      {title : "eater", url: "#"},
      {title : "la weekly", url: "#"},
      {title : "new york times", url: "#"},
      {title : "huffington post", url: "#"},
      {title : "gq brazil", url: "#"},
    ]

    const videos = [
      {title: "new york times", url: "#", img: 'http://via.placeholder.com/750x350'},
      {title: "bráz elettrica", url: "#", img: 'http://via.placeholder.com/750x350'},
      {title: "café monstruo", url: "#", img: 'http://via.placeholder.com/750x350'},
      {title: "insider", url: "#", img: 'http://via.placeholder.com/750x350'},
    ]

    return (
      <div
        className={cx(
          s.root,
          s['edge--top'],
          s['edge--bottom--reverse'],
          s['-light'],
        )}
      >
        <div className={s.container}>
          <div className={s.row}>
            <h2 className={s.sectionHeader}>press</h2>
            <div className={s.underLine}></div>
          </div>

          <div className={s.videos}>
            <h4 className={s.subsectionHeader}>videos</h4>
            <div className={s.videoLinks}>{videos.map((v) => {
              return (
                <div className={s.video} key={v.title} >
                    <a className={s.articleLink} href={v.url}>
                      <img src={v.img} alt={v.title}/>
                    </a>
                </div>
              )
            })}</div>
          </div>
          <div className={s.articles}>
            <h4 className={s.subsectionHeader}>articles</h4>
            <div className={s.articleLinks}>{articles.map((a) => {
              return <li className={s.article}><a className={s.articleLink} href={a.url}>{a.title}</a></li>
            })}</div>
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(s)(Press);
