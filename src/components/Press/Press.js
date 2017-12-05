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
import ReactPlayer from 'react-player'


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
      {title : "bon appetit", url: "https://www.bonappetit.com/story/pizza-questions-joe-beddia"},
      {title : "esquire", url: "http://www.esquire.com/food-drink/food/a35024/summer-pizza-recipes/"},
      {title : "evening standard", url: "https://www.standard.co.uk/goingout/restaurants/all-about-that-base-how-pizza-became-a-cult-london-dish-a3580771.html"},
      {title : "eater", url: "https://www.eater.com/2014/3/17/6267123/the-speckenwolf-pizza-at-robertas-in-brooklyn"},
      {title : "la weekly", url: "http://www.laweekly.com/restaurants/a-robertas-pizza-alum-is-hosting-a-pop-up-restaurant-at-prime-pizza-in-la-8328824"},
      {title : "new york times", url: "https://www.nytimes.com/2017/01/12/magazine/why-clam-chowder-pizza-is-the-best-kind.html"},
      {title : "huffington post", url: "https://www.huffingtonpost.com/2014/10/03/surprising-pizza-facts_n_5907308.html"},
      {title : "gq brazil", url: "http://gq.globo.com/Prazeres/Gastronomia/noticia/2017/07/quais-sao-cinco-melhores-pizzas-do-mundo.html"},
    ]

    const videos = [
      {title: "new york times", url: "https://youtu.be/u-KDRmOYSb0"},
      {title: "bráz elettrica", url: "https://vimeo.com/227790871"},
      {title: "café monstruo", url: "https://youtu.be/Ew3d1oSFkI8"},
      {title: "insider food", url: "https://youtu.be/boRWgOYmxYM"},
    ]

    const videoStyles = {
        marginTop: 0,
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
    }

    return (
      <div
        id="press"
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

          <div className={cx(s.row, s.videos)}>
            <h3 className={s.subsectionHeader}>videos</h3>
            <div className={cx(s.videoLinks, s.clearfix)}>
                {videos.map((v)=>{
                    return(
                        <div className={s.video}>
                            <ReactPlayer
                                url={v.url}
                                // width='320px'
                                // height='180px'
                                style={videoStyles}
                                controls='true'
                            />
                        </div>
                    )
                })}
            </div>
          </div>

          <div className={cx(s.row, s.articles)}>
            <h3 className={s.subsectionHeader}>articles</h3>
            <ul className={s.articleLinks}>
                {articles.map((a) => {
                    return (
                        <li className={s.article}>
                            <a className={s.articleLink} href={a.url} alt={a.title} target='_blank'>{a.title}</a>
                        </li>
                    )
                })}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default withStyles(s)(Press);
