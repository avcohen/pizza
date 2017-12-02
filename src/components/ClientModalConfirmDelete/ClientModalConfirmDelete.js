import React from 'react';
import axios from 'axios';
import ClientForm from '../ClientForm';
import { Button, Modal } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientModalConfirmDelete.css';

class ClientModalConfirmDelete extends React.Component{
    constructor(){
        super();
        this.state = {
            modalOpen : false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpen = e => this.setState({ modalOpen : true })
    handleClose = e => this.setState({ modalOpen : false })

    handleSubmit(e){
        let clientId = e.target.getAttribute('data-clientid');

        axios({
            method : 'delete',
            responseType : 'json',
            url: `http://localhost:3000/api/clients/${clientId}`
        })
        .then((res) => {
            this.handleClose();
            this.props.onClientDeleted(res.data.result)
        })
        .catch((err) => {
            this.handleClose();
            throw err;
        })
    }
    render(){
        return(
            <Modal
                trigger={<Button onClick={this.handleOpen} color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                dimmer='inverted'
                size='tiny'
            >
                <Modal.Header>{this.props.headerTitle}</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete <strong>{this.props.client.name}</strong>?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.handleSubmit} data-clientid={this.props.client._id} color='red'>Delete</Button>
                    <Button onClick={this.handleClose} color='black'>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withStyles(s)(ClientModalConfirmDelete)
