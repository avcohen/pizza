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
import AdminWidget from '../../components/AdminWidget';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';
import FontAwesome from 'react-fontawesome';


class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editingItem : false,
            panelLoaded : false,
            fetchingData : false,
            clientData : null,
            illustrationData : null,
            instagramData : null,
        }

        this.editItem = this.editItem.bind(this)
    }

    componentWillMount(){
        this.fetchClients();
        // this.fetchIllustrations();
    }

    async fetchClients(){
        this.setState({fetchingData : true })
        let clientData = await fetch('/api/clients')
                                .then((r) => {
                                    this.setState({fetchingData : false })
                                    if (r.ok === true ) {return r.json() }
                                })
                                .then((data) => { return data })
                                .catch(e => console.error(e));

        if (!clientData === null) {
            this.setState({ clientData : 'ERROR' })
            return;
        }
        this.setState( {clientData : clientData })
    }

    async fetchIllustrations(){
        this.setState({fetchingData : true })
        let illustrationData = await fetch('/api/illustrations')
                                .then((r) => {
                                    this.setState({fetchingData : false })
                                    if (r.ok === true ) { return r.json() }
                                })
                                .then((data) => { return data })
                                .catch(e => console.error(e));

        if (!illustrationData === null) {
            this.setState({ clientData : 'ERROR' })
            return;
        }
        this.setState( {illustrationData : illustrationData })
    }



    async createItem({...itemDetails}){
        // set state to editingItem : true
        // create new item in fb
            // write db entry
            // upload image data to storage
            // return result
        // set state to editingItem : false

    }

    async editItem(key, category){
        console.log('lol')
        this.setState({ editingItem : true });
    }
    async deleteItem(id){
        // set state to editingItem : true
        // find entry in firebase
        // remove entry from firebase
        // set state to editingItem : false

    }



    createWidgets(){
        let props = {
            title : 'Clients',
            data : this.state.clientData,
            editItem : this.editItem
        }
        return <AdminWidget {...props} />
    }

    render() {
        return (
          <div className={s.root}>
            <div className={s.container}>
              <div className={s.row}>
                <h1>{this.props.title}</h1>
                <nav>
                  <span className={s.navItem} >
                    <FontAwesome className={s.faIcon} name='home' size='1x'/>
                    <Link className={s.homepage} activeClass={s.active} to="/">Home</Link>
                  </span>
                  <span className={s.navItem} >
                    <FontAwesome className={s.faIcon} name='sign-out' size='1x'/>
                    <Link className={s.homepage} activeClass={s.active} to="/logout">Logout</Link>
                  </span>
                </nav>
              </div>
              <hr/>
              <div className={s.row}>
                { this.createWidgets() }
              </div>

            </div>
          </div>
        );
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
    };
}

export default withStyles(s)(Admin);
