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

function PreviousArrow(props){
        return (
                <button {...props}>
                    <FontAwesome className={s.faIcon} name='arrow-circle-o-left'/>
                </button>
        )
}

function NextArrow(props){
        return (
                <button {...props}>
                    <FontAwesome className={s.faIcon} name='arrow-circle-o-right'/>
                </button>
        )
}

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
          currentSlide : 0,
          currentSlide : this.slideData[0]
        };
        this.setCurrentSlideIndex = this.setCurrentSlideIndex.bind(this);
    }

    slideData = [
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

    componentWillReceiveProps(){
       this.refs.slick.innerSlider.onWindowResized()
    }

    setCurrentSlideIndex(index){
        this.setState({
            currentSlideIndex : index,
            currentSlide : this.slideData[index],
        })
    }



    render() {

        const slides = this.slideData.map((slide,i) => {
            return (
                <div className={s.slide}>
                    <img className={s.slideImage} src={slide.image} alt={slide.title} index={i}/>
                </div>
            )
        })

        const settings = {
            prevArrow: <PreviousArrow {...this.props} />,
            nextArrow: <NextArrow {...this.props} />,
            centerMode: true,
            initialSlide: 0,
            autoplay: false,
            dots: false,
            fade : true,
            variableWidth: false,
            dots: false,
            infinite: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (oldindex, newIndex) => this.setCurrentSlideIndex(newIndex),
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
                        {slides}
                    </Slick>
                </div>
                <div className={s.currentSlideInfo}>
                    <p className={s.slideText}>
                        <a className={s.slideLink} href={this.state.currentSlide.url} alt={this.state.currentSlide.title} target="_blank">{this.state.currentSlide.title}  <FontAwesome className={s.faIcon} name='external-link'/></a>
                    </p>
                </div>
            </div>
        );
  }
}

export default withStyles(s, slickStyles, slickTheme)(Carousel);
