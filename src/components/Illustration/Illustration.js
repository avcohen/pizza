/* eslint-disable */
/**
* React Starter Kit (https://www.reactstarterkit.com/)
*
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Illustration.css";
import cx from "classnames";

import ImageModal from '../ImageModal'
// import Header from '../Header'

import brazImage from './braz.jpg'
import marqueeImage from './marquee.jpg'
import pizzaBrunoImage1 from './pizzaBruno.jpg'
import pizzaBrunoImage2 from './pizzaBruno2.jpg'
import primePizzaImage from './primePizza.jpg'
import varietyImage from './variety.jpg'

class Illustration extends React.Component {
    constructor() {
        super();
        this.state = {
          imageModalOpen : false,
          imageModalData : null,
        };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleCategoryChange(e){
        e.preventDefault();
        const category = e.target.getAttribute('data-category');
        this.setState({ activeCategory : category })
    }

    handleImageClick(e){
        const imageToDisplay = {
            image : e.target.getAttribute('src'),
            title : e.target.getAttribute('alt')
        }
        this.setState({
            imageModalOpen : true,
            imageModalData : imageToDisplay
        })
    }

    handleCloseModal(){
        this.setState({
            imageModalOpen : false,
            imageModalData : null,
        })
    };


    render() {
        const images = [
            {title : 'Bráz Elettrica', image : brazImage },
            {title : 'Marquee Pizza', image : marqueeImage },
            {title : 'Pizza Bruno', image : pizzaBrunoImage1 },
            {title : 'Pizza Bruno', image : pizzaBrunoImage2 },
            {title : 'Prime Pizza', image : primePizzaImage },
            {title : 'Variety Coffee', image : varietyImage },
        ]

        let imageModal = '';
        if (this.state.imageModalOpen === true){
            imageModal = <ImageModal closeModal={this.handleCloseModal} imageData={this.state.imageModalData}/>
        }

        return (
            <div
              id='illustration'
              className={cx(
                s.root,
                s['edge--top'],
                s['edge--bottom--reverse'],
                s['-dark'],
              )}
            >
              <div className={s.container}>
                <div className={s.row}>
                  <h2 className={s.sectionHeader}>illustration</h2>
                  <div className={s.underLine}></div>
                </div>

                {imageModal}
                <div className={s.row}>
                {/* <ul className={s.category}>
                  <li onClick={this.handleCategoryChange} data-category="flyers" className={s.categoryItem}>flyers & posters</li>
                  <li onClick={this.handleCategoryChange} data-category="tshirts" className={s.categoryItem}>t-shirts</li>
                  <li onClick={this.handleCategoryChange} data-category="prints" className={s.categoryItem}>prints</li>
                </ul> */}
                    <div className={s.imageContainer}>
                        {images.map((i)=>{
                            return (
                                <img className={s.image} src={i.image} alt={i.title} onClick={this.handleImageClick}/>
                            )
                        })}
                    </div>
                </div>
              </div>
            </div>
        );
    }
}

export default withStyles(s)(Illustration);
