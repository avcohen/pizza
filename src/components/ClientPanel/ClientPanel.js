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
        this.state = {
            itemToEdit : {},
            moduloOpen : false
        }
        this.createTableRow = this.createTableRow.bind(this);
        this.editItem = this.editItem.bind(this);
        this.closeModulo = this.closeModulo.bind(this);
    }

    createTableRow(key){
        const entry = this.props.clientData[key];
        return (
            <div className={s.row}>
                <img src="" alt=""/>
                <h5>{entry.name}</h5>
                <span>Description : </span><span>{entry.description}</span>
                <p><a href={entry.url}>Link</a></p>
                <span className={s.editorButton}>
                    <Link onClick={() => this.editItem(entry)} >
                        <FontAwesome name="edit" size="1x" /> Edit
                    </Link>
                </span>
                <span className={s.editorButton}>
                    <Link onClick={() => this.props.deleteItem(entry, 'client')} >
                        <FontAwesome name="trash" size="1x" /> Delete
                    </Link>
                </span>
            </div>
        )
    }

    editItem(entry = {}){

        this.setState({ itemToEdit : entry })
        this.setState({ moduloOpen : true });
    }

    closeModulo() {
      this.setState({
        moduloOpen: false,
      });
    }

    render() {
        let clientTable = null;
        if (this.props.clientData === null) {
            clientTable =  <h3>Loading...</h3>
        } else {
            clientTable = Object.keys(this.props.clientData).map(this.createTableRow);
        }
        let modulo = '';
        if (this.state.moduloOpen === true){
            modulo = <AdminModulo
                        itemToEdit={this.state.itemToEdit}
                        editItem={this.props.editItem}
                        createItem={this.props.createItem}
                        closeModulo={this.closeModulo}
                        fetchItems={this.props.fetchItems}
                    />
        }

        return (
          <div className={s.root} >
            <div className={s.container}>
                <div className={s.row}>
                    <h3>{this.props.title}</h3>
                    <button onClick={this.editItem} >
                        Add Clients <FontAwesome name="plus" size="1x" />
                    </button>
                </div>
                <div className={s.row}>
                    {clientTable}
                </div>
                <div className={s.modulo}>
                    {modulo}
                </div>
            </div>
          </div>
        )

    }
};

export default withStyles(s)(ClientPanel);
