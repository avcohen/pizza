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
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Consulting from '../../components/Consulting';
import Space from '../../components/Space';
import Press from '../../components/Press';
import Illustration from '../../components/Illustration';
import About from '../../components/About';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      spacePizzaMode : false
    }

    this.enterSpacePizza = this.enterSpacePizza.bind(this);
    this.exitSpacePizza = this.exitSpacePizza.bind(this);
  }

  enterSpacePizza(){
    this.setState({
      spacePizzaMode : true
    })
  }

  exitSpacePizza(e){
    e.stopPropagation()
    this.setState({
      spacePizzaMode : false
    })
  }

  render() {
    let html = ''
    if (!this.state.spacePizzaMode === true) {
    html =    <div>
                <Consulting />
                <Illustration />
                <About />
              </div>
    }
    else {
      html = ''
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div onClick={this.enterSpacePizza}>
            <Space
              spacePizzaMode={this.state.spacePizzaMode}
              exitMode={this.exitSpacePizza}
            />
          </div>
          {html}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
