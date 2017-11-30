import React from 'react';
import PropTypes from 'prop-types';
import axios, { post } from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminModulo.css';
import Link from '../Link';

import * as h from '../../scripts/helpers';

class AdminModulo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadFormData = this.uploadFormData.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.uploadFormData(this.state);
    this.props.closeModulo();
  }

  uploadFormData(data) {
    const url = 'http://localhost:3000/api/clients';
    const formData = new FormData();
    for (const k in data) {
      if (k === 'photo') {
        formData.append(
          k,
          document.querySelector('input[type="file"]').files[0],
        );
      }
      formData.append(k, data[k]);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form
            className={s.clientForm}
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="name">
              Description
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/png"
              onChange={this.handleChange}
            />
            <label htmlFor="url">
              Link
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Save" className={s.submitButton} />
            <input
              type="button"
              value="Close"
              onClick={this.props.closeModulo}
              className={s.submitButton}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AdminModulo);
