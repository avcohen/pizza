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
        this.renderModulo = this.renderModulo.bind(this);
    }


    renderListItems(key){
        const entry = this.props.data[key];
        return (
            <div className={s.row}>
                <img src="" alt=""/>
                <h5>{entry.name}</h5>
                <span>Description : </span><span>{entry.description}</span>
                <p><a href={entry.url}>Link</a></p>
                <span className={s.editorButton}>
                    <Link onClick={() => this.props.editItem(entry)} >
                        <FontAwesome name="edit" size="1x" /> Edit
                    </Link>
                </span>
                <span className={s.editorButton}>
                    <Link onClick={() => this.props.deleteItem(entry)} >
                        <FontAwesome name="trash" size="1x" /> Delete
                    </Link>
                </span>
            </div>
        )
    }

    renderModulo(itemToEdit = {}){
        if (this.props.moduloOpen === true){
            return <AdminModulo {...this.props} activeItemToEdit={itemToEdit}/>
        }
        else {
            return '';
        }
    }

    render() {

        let clientData = '';
        let modulo = this.renderModulo(this.props.itemToEdit);

        if (this.props.data === null || undefined ) {
          clientData = <div>Loading data...</div>
        } else {
            clientData = Object.keys(this.props.data).map(this.renderListItems);
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
                    {clientData}
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
