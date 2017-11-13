import React from 'react';
import Slider from 'react-slick';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Slider.css';
import cafe from '../Consulting/cafe.png';

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div
        className={cx(
          s.root,
          // s['edge--top'],
          // s['edge--bottom--reverse'],
          // s['-dark'],
        )}
      >
      <Slider {...settings}>
        <div><p>lol</p></div>
        <div><p>lol</p></div>
        <div><p>lol</p></div>
        <div><p>lol</p></div>
        <div><p>lol</p></div>
        {/* <div className={s.sliderContainer}>
          <img className={s.sliderImg} src={cafe} alt="" />

          <h3>Cafe Monstruo</h3>
          <p className={s.sliderText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            unde voluptatum, at nam modi sit?
          </p>
          <p className={s.sliderLink}>link</p>
        </div> */}
      </Slider>
      </div>
    );
  }
}

export default withStyles(s)(SimpleSlider);
