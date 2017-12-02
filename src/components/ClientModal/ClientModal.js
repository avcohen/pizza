import React from 'react';
import ClientForm from '../ClientForm';

import { Button, Modal } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientModal.css';

class ClientModal extends React.Component{
    render(){
        return(
            <Modal
                trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
                dimmer='inverted'
                size='tiny'
                closeIcon='close'
            >
                <Modal.Header>{this.props.headerTitle}</Modal.Header>
                <Modal.Content>
                    <ClientForm
                        buttonSubmitTitle={this.props.buttonSubmitTitle}
                        buttonColor={this.props.buttonColor}
                        clientId={this.props.clientId}
                        onClientAdded={this.props.onClientAdded}
                        onClientUpdated={this.props.onClientUpdated}
                    />
                </Modal.Content>
            </Modal>
        )
    }
}

export default withStyles(s)(ClientModal)
