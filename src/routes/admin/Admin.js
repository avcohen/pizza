/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

import { Container } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../components/Link';
import ClientPanel from '../../components/ClientPanel';
import ClientModal from '../../components/ClientModal';

import * as semanticStyles from 'semantic-ui-css/semantic.min.css';
import s from './Admin.css';


class Admin extends React.Component {
  constructor() {
    super();

    this.state = {
      editingItem: false,
      fetchingData: false,
      clientData: [],
    };

    this.fetchItems = this.fetchItems.bind(this);
    this.fetchSingleItem = this.fetchSingleItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.fetchItems('client');
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
    this.setState({ [`${type}Data`]: fetchedItems });
  }

  async fetchSingleItem(entry, type) {
    this.setState({ fetchingData: true });
    await fetch(`http://localhost:3000/api/${type}s/${entry._id}`)
      .then(r => {
        if (r.ok === true) {
          return r.json();
        }
      })
      .then(data => data)
      .catch(e => console.error(e));
    this.setState({ fetchingData: false });
  }

  createItem(item) {
    console.log(item)
  }

  editItem(item) {
    console.log(item)
  }

  deleteItem(item){
    console.log(item)
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
          <Container>
                <h1>Clients</h1>
                <ClientModal
                    headerTitle='Add Client'
                    buttonTriggerTitle='Add New'
                    buttonSubmitTitle='Add'
                    buttonColor='green'
                    onClientAdded={this.createItem}
                />

                <ClientPanel
                    onClientUpdated={this.editItem}
                    onClientDeleted={this.deleteItem}
                    clients={this.state.clientData}
                />
          </Container>
        </div>
      </div>
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
}

export default withStyles(s,semanticStyles)(Admin);
