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
      clientData: null,
      illustrationData: null,
      instagramData: null,
      moduloOpen: false,
    };

    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.closeModulo = this.closeModulo.bind(this);
    this.fetchClients = this.fetchClients.bind(this);
  }


  closeModulo() {
    this.setState({
      editingItem: false,
      moduloOpen: false,
    });
  }

  async fetchClients() {
    this.setState({ fetchingData: true });
    const clientData = await fetch('http://localhost:3000/api/clients')
      .then(r => {
        this.setState({ fetchingData: false });
        if (r.ok === true) {
          return r.json();
        }
      })
      .then(data => data)
      .catch(e => console.error(e));

    if (!clientData === null) {
      this.setState({ clientData: 'ERROR' });
      return;
    }
    this.setState({ clientData });
  }

  async fetchIllustrations() {
    this.setState({ fetchingData: true });
    const illustrationData = await fetch('/api/illustrations')
      .then(r => {
        this.setState({ fetchingData: false });
        if (r.ok === true) {
          return r.json();
        }
      })
      .then(data => data)
      .catch(e => console.error(e));

    if (!illustrationData === null) {
      this.setState({ clientData: 'ERROR' });
      return;
    }
    this.setState({ illustrationData });
  }

  async createItem({ ...itemDetails }) {
    this.setState({ moduloOpen: true });
  }

  async editItem(entry) {
    this.setState({ editingItem: true });
    const itemToEdit = await fetch(`http://localhost:3000/api/client/${entry._id}`)
        .then(r => {
            this.setState({fetchingData : false })
            if (r.ok === true){
                return r.json();
            }
        })
        .then(data => data)
        .catch(err => console.err(err));
    this.setState({ itemToEdit })
    this.setState({ moduloOpen: true });
  }

  async deleteItem(entry) {
    this.setState({ editingItem: true });
    await confirm(`Delete entry '${entry.name}' ?`);
    await fetch(`http://localhost:3000/api/clients/${entry._id}`, {
        method : 'DELETE'
    }).catch(err => console.error(err));
    this.setState({ editingItem: false });
    this.fetchClients();
  }

  createWidgets() {
    const props = {
      title: 'Clients',
      data: this.state.clientData,
      editItem: this.editItem,
      deleteItem: this.deleteItem,
      createItem: this.createItem,
      moduloOpen: this.state.moduloOpen,
      closeModulo: this.closeModulo,
      fetchClients: this.fetchClients,
      itemToEdit : this.state.itemToEdit,
    };
    return <ClientPanel {...props} />;
  }

  componentDidMount(){
      this.fetchClients();
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
          <div className={s.row}>{this.createWidgets()}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };
}

export default withStyles(s)(Admin);
