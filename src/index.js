import './css/styles.css';
import { CountriesApiService } from './FetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSubmit, DEBOUNCE_DELAY));

function onSubmit(ev) {
  ev.preventDefault();

  const searchValue = refs.searchBox.value;
  countriesApiService.query = searchValue.trim();
  countriesApiService.fetchCountries();
}

function createCountryList({}) {}
