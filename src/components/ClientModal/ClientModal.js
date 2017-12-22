import React from 'react';
import ClientForm from '../ClientForm';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientModal.css';

const ClientModal = (props) => (
    <Modal
        trigger={<Button color={props.buttonColor}>{props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        closeIcon
    >
        <Header>{props.headerTitle}</Header>
        <Modal.Content>
            <Button basic color="red" inverted>
                <Icon name="remove" /> No
            </Button>
            <ClientForm
                buttonSubmitTitle={props.buttonSubmitTitle}
                buttonColor={props.buttonColor}
                clientId={props.clientId}
                onClientAdded={props.onClientAdded}
                onClientUpdated={props.onClientUpdated}
            />
        </Modal.Content>
    </Modal>
)


export default withStyles(s)(ClientModal)
