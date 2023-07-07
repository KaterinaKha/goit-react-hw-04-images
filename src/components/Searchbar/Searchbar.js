import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt } from 'react-icons/bi';
import css from './Searchbar.module.css';

const toastConfig = {
  position: 'top-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQuery = this.state.searchQuery.trim();
    if (searchQuery === '') {
      toast.warn('Please enter search query', toastConfig);
      return;
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <BiSearchAlt className={css.svg} />
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
