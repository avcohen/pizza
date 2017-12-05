import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Slider.css';
import Carousel from 'react-slick';

class Slider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };
    return (
      <div className={cx(
          s.container,
          s['edge--top'],
          s['edge--bottom--reverse'],
          s['-dark'],
      )}>
        {/* <Carousel {...settings}>
                    <div><img src="http://via.placeholder.com/500x200" alt=""/></div>
                    <div><img src="http://via.placeholder.com/500x200" alt=""/></div>
                    <div><img src="http://via.placeholder.com/500x200" alt=""/></div>
                </Carousel> */}
      </div>
    );
  }
}

export default withStyles(s)(Slider);
