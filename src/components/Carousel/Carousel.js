import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import slickStyles from 'slick-carousel/slick/slick.css'
import slickTheme from 'slick-carousel/slick/slick-theme.css'
import cx from 'classnames';
import s from './Carousel.css';
import Slick from 'react-slick';
import FontAwesome from 'react-fontawesome';

import cafe from './cafe.png'
import braz from './braz.png'
import marquee from './marquee.png'
import ga from './ga.png'

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={s.SliderArrow}
      style={{...style, display: 'flex'}}
      onClick={onClick}
    >
    <FontAwesome name='whatsapp'/></div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={s.SliderArrow}
      style={{...style, display: 'flex'}}
      onClick={onClick}
    >
    <FontAwesome name='whatsapp'/></div>
  );
}

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
          currentSlide : 2,
        };
        this.setCurrentSlideIndex = this.setCurrentSlideIndex.bind(this);
    }

    componentWillReceiveProps(){
       this.refs.slick.innerSlider.onWindowResized()
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
          {
              title : 'General Assembly',
              image :  ga,
              url : 'https://www.gapizza.com/',
          },
      ]

      const settings = {
        slidesToShow: 3,
        dots: false,
        adaptiveHeight: false,
        centerMode : true,
        lazyLoad: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            { breakpoint: 480, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
        ],
      };

    return (
      <div className={cx(
          s.container,
          s['edge--top'],
          s['edge--bottom--reverse'],
          s['-dark'],
      )}>
      <div className={s.sliderContainer}>
        <Slick {...settings}>
            {slides.map((slide, i)=>{
                return <img style={s.slideImage} src={slide.image} alt={slide.title} index={i} />
            })}
        </Slick>
        </div>
    </div>
    );
  }
}

export default withStyles(s)(Carousel);
