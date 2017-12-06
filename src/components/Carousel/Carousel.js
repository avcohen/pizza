import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import slickStyles from 'slick-carousel/slick/slick.css'
import slickTheme from 'slick-carousel/slick/slick-theme.css'
import cx from 'classnames';
import s from './Carousel.css';
import Slider from 'react-slick';

import cafe from './cafe.png'
import braz from './braz.png'
import marquee from './marquee.png'


class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
          currentSlide : 2,
        };
        this.setCurrentSlideIndex = this.setCurrentSlideIndex.bind(this);
    }

    setCurrentSlideIndex(index){
        this.setState({ currentSlide : index })
    }
  render() {
      const slides = [
          {
              title : 'Bráz Elettrica',
              image :  braz,
              url : 'https://www.brazelettrica.com/',
          },
          {
              title : 'Café Monstruo',
              image :  cafe,
              url : 'http://www.cafemonstruo.com/',
          },
          {
              title : 'Marquee Pizzeria',
              image :  marquee,
              url : 'https://www.marqueepizzeria.com/',
          },
      ]

      const settings = {
        dots: false,
        lazyLoad: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        afterChange: function(currentSlide) {
            console.log(currentSlide)
        }
      };

    return (
      <div className={cx(
          s.container,
          s['edge--top'],
          s['edge--bottom--reverse'],
          s['-dark'],
      )}>
      <div className={s.sliderContainer}>
        {/* <Slider {...settings}>
            {slides.map((s, i)=>{
                return <img src={s.image} alt={s.title} index={i} />
            })}
        </Slider> */}
        </div>
    </div>
    );
  }
}

export default withStyles(slickStyles, slickTheme, s)(Carousel);
