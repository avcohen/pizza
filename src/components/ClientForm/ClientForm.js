import React from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Form, Select } from 'semantic-ui-react';

import axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ClientForm.css';
import Link from '../Link';

import * as h from '../../scripts/helpers';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        url: '',
        image: '',
        formClassName: '',
        formSuccessMessage: '',
        formErrorMessage: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    // const client = {
    //     name: this.state.name,
    //     description: this.state.description,
    //     url: this.state.url,
    //     image: this.state.image,
    // }

    let client = new FormData();
        client.append('name', this.state.name);
        client.append('description', this.state.description);
        client.append('url', this.state.url);
        client.append('image', document.querySelector('input[type="file"]').files[0]);

    const method = this.props.clientId ? 'put' : 'post';
    const params = this.props.clientId ? this.props.clientId : '';

    axios({
        method : method,
        responseType : 'json',
        url: `./api/clients/${params}`,
        data: client
    })
    .then((res) => {
        this.setState({
            formClassName : 'success',
            formSuccessMessage : res.data.msg
        })

        if (!this.props.clientId){
            this.setState({
                name: '',
                description: '',
                url: '',
                image: ''
            })
            this.props.onClientAdded(res.data.result)
        }
        else {
            this.props.onClientUpdated(res.data.result)
        }
    })
    .catch((err) => {
        if (err.response){
            if (err.response.data){
                this.setState({
                    formClassName : 'warning',
                    formErrorMessage : err.response.msg
                })
            }
        }
        else {
            this.setState({
                formClassName : 'warning',
                formErrorMessage : 'Something went wrong! Reason :' + err
            });
        }
    })
  }

  componentWillMount(){
      if (this.props.clientId){
        axios.get(`./api/clients/${this.props.clientId}`)
            .then((res) => {
                this.setState({
                    name : res.data.name,
                    description : res.data.description,
                    url : res.data.url,
                });
            })
            .catch(err => console.error(err))
      }
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <div className={s.root}>
        <div className={s.container}>
            <Form
                className={cx(s.clientForm, formClassName)}
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
            >
                <Form.Input
                    label='Name'
                    type='text'
                    name='name'
                    required
                    value={this.state.name}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Description'
                    type='text'
                    name='description'
                    required
                    value={this.state.description}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Url'
                    type='text'
                    name='url'
                    required
                    value={this.state.url}
                    onChange={this.handleInputChange}
                />
                <Form.Input
                    label='Image'
                    type='file'
                    accept='image/png'
                    name='image'
                    required
                    value={this.state.image}
                    onChange={this.handleInputChange}
                />
                <Message
                    success
                    color='green'
                    header='Client Saved'
                    content='formSuccessMessage'
                />
                <Message
                    success
                    color='yellow'
                    header='Error!'
                    content='formErrorMessage'
                />
                <Button color={this.props.buttonColor} floated='right'>
                    {this.props.buttonSubmitTitle}
                    <br/><br/>
                </Button>
            </Form>

        </div>
      </div>
    );
  }
}

export default withStyles(s)(ClientForm);
