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
import ClientModal from '../ClientModal/'
import ClientModalConfirmDelete from '../ClientModalConfirmDelete/'

import { Table } from 'semantic-ui-react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientPanel.css';
import Link from '../Link';
import FontAwesome from 'react-fontawesome';

import * as h from '../../scripts/helpers';


class ClientPanel extends React.Component {

    render() {

        let clients = Array.from(this.props.clients)

        clients = clients.map((client) =>
            <Table.Row key={client._id}>
                <Table.Cell>{client.name}</Table.Cell>
                <Table.Cell>{client.description}</Table.Cell>
                <Table.Cell>{client.url}</Table.Cell>
                <Table.Cell>
                    <img className={s.clientImage} src={require('../../../public/uploads/' + client.image )} alt=""/>
                </Table.Cell>
                <Table.Cell>
                    <ClientModal
                        headerTitle={`Edit ${client.name}`}
                        buttonTriggerTitle='Edit'
                        buttonSubmitTitle='Save'
                        buttonColor='blue'
                        clientId={client._id}
                        onClientUpdated={this.props.onClientUpdated}
                    />
                    <ClientModalConfirmDelete
                        headerTitle='Delete Client'
                        buttonTriggerTitle='Delete'
                        buttonColor='red'
                        client={client}
                        onClientDeleted={this.props.onClientDeleted}
                    />
                </Table.Cell>
            </Table.Row>
        )

        return (
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>URL</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {clients}
                </Table.Body>
            </Table>
        )
    }
};

export default withStyles(s)(ClientPanel);
