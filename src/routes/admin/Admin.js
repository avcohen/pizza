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

import Link from '../../components/Link';
import ClientPanel from '../../components/ClientPanel';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import FontAwesome from 'react-fontawesome';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingItem: false,
      fetchingData: false,
      clientData : {},
    };

    this.fetchItems = this.fetchItems.bind(this);
    this.fetchSingleItem = this.fetchSingleItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async fetchItems(type) {
    this.setState({ fetchingData: true });
    const fetchedItems = await fetch(`http://localhost:3000/api/${type}s`)
      .then(r => {
        if (r.ok === true) {
          return r.json();
        }
      })
      .then(d => d)
      .catch(e => console.error(e));
    this.setState({ fetchingData: false });
    this.setState({ [`${type}Data`] : fetchedItems })
  }

  async fetchSingleItem(entry, type) {
    this.setState({ fetchingData: true });
    const data = await fetch(`http://localhost:3000/api/${type}s/${entry._id}`)
      .then(r => {
        if (r.ok === true) {
          return r.json();
        }
      })
      .then(data => data)
      .catch(e => console.error(e));
    this.setState({ fetchingData: false });
    return data;
  }

  async createItem(item = {}) {}

  async editItem(entry, type) {
    this.setState({ editingItem: true });
    const id = entry.get('_id');

    const itemToEdit = await fetch(`http://localhost:3000/api/${type}s/${id}`, {
        method : 'POST',
        body : entry
        })
        .then(r => {
            if (r.ok === true){
                return r.json();
            }
        })
        .then(data => data)
        .catch(err => console.err(err));

    this.setState({fetchingData : false });
  }

  async deleteItem(entry, type) {
    this.setState({ editingItem: true });
    const confirmDelete = await confirm(`Delete entry '${entry.name}' ?`);

    if (confirmDelete === true ){
        await fetch(`http://localhost:3000/api/${type}s/${entry._id}`, {
            method : 'DELETE'
        }).catch(err => console.error(err));
    }

    this.setState({ editingItem: false });
    this.fetchItems(type);
  }

  createAdminPanels() {
    const props = {
      editItem: this.editItem,
      deleteItem: this.deleteItem,
      fetchSingleItem: this.fetchSingleItem,
      createItem: this.createItem,
      moduloOpen: this.state.moduloOpen,
      fetchItems: this.fetchItems,
    };
    return <ClientPanel title="Clients" clientData={this.state.clientData} {...props} />;

  }

  componentDidMount(){
      this.fetchItems('client');
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.row}>
            <h1>{this.props.title}</h1>
            <nav>
              <span className={s.navItem}>
                <FontAwesome className={s.faIcon} name="home" size="1x" />
                <Link className={s.homepage} activeClass={s.active} to="/">
                  Home
                </Link>
              </span>
              <span className={s.navItem}>
                <FontAwesome className={s.faIcon} name="sign-out" size="1x" />
                <Link
                  className={s.homepage}
                  activeClass={s.active}
                  to="/logout"
                >
                  Logout
                </Link>
              </span>
            </nav>
          </div>
          <hr />
          <div className={s.row}>{this.createAdminPanels()}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
}

export default withStyles(s)(Admin);
