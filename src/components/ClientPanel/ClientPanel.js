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
import AdminModulo from '../AdminModulo/'


import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientPanel.css';
import Link from '../Link';
import FontAwesome from 'react-fontawesome';

import * as h from '../../scripts/helpers';


class ClientPanel extends React.Component {
    constructor(){
        super();
        this.renderListItems = this.renderListItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e,key){
        this.props.editItem();
    }

    renderListItems = (key) => {
        const entry = this.props.data[key];
        return (
            <div className={s.row}>
                <img src="" alt=""/>
                <h5>{entry.name}</h5>
                <span>Description : </span><span>{entry.description}</span>
                <p><a href={entry.url}>Link</a></p>
                <span className={s.editorButton}>
                    <Link to={"/api/"+ entry.name }>
                        <FontAwesome name="edit" size="1x" /> Edit
                    </Link>
                </span>
                <span className={s.editorButton}>
                    <Link to={"/api/"+ entry.name }>
                        <FontAwesome name="trash" size="1x" /> Edit
                    </Link>
                </span>
            </div>
        )
    }

    render() {

        let widgetData = '';
        let modulo = '';

        if (this.props.data === null || undefined ) {
          widgetData = <div>No data.</div>
        } else {
            widgetData = Object.keys(this.props.data).map(this.renderListItems);
        }

        if (this.props.moduloOpen === true ) {
            modulo = <AdminModulo {...this.props} />
        } else {
            modulo = '';
        }

        return (
          <div className={s.root} >
            <div className={s.container}>
                <div className={s.row}>
                    <h3>{this.props.title}</h3>
                    <button onClick={this.props.createItem} >
                        Add Clients <FontAwesome name="plus" size="1x" />
                    </button>
                </div>
                <div className={s.row}>
                    {widgetData}
                </div>
                <div className={s.modulo}>
                    {modulo}
                </div>
            </div>
          </div>
        )

    }

  static propTypes = {
    title : PropTypes.string.isRequired
  }

};

export default withStyles(s)(ClientPanel);
