import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  ButtonSearchForm,
  ButtonLabelSearchForm,
  SearchFormIinput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, sethQuery] = useState('');

  const handleChange = e => {
    sethQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchQuery);
    sethQuery('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <ButtonSearchForm type="submit">
          <ButtonLabelSearchForm>Search</ButtonLabelSearchForm>
        </ButtonSearchForm>

        <SearchFormIinput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
