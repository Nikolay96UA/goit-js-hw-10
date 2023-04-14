import './css/styles.css';
import { CountriesApiService } from './FetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(callback, DEBOUNCE_DELAY));

function callback(ev) {
  ev.preventDefault();
  clearMarkup();
  const searchValue = refs.searchBox.value;
  countriesApiService.query = searchValue.trim();

  countriesApiService
    .fetchCountries()
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (countries.length === 1) {
        return renderCounteryInfo(countries);
      }

      if (countries.length > 2 && countries.length < 10) {
        return renderCounterList(countries);
      }
    })
    .catch(error => {
      if (error) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}

function renderCounterList(countries) {
  const markupList = countries
    .map(({ name: { official }, flags: { png } }) => {
      return `<li class="country-items">
      <img class="country-flag" src= ${png}>
      <p class="country-name">${official}</p>
      </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markupList;
}

function renderCounteryInfo(countries) {
  const markupInfo = countries
    .map(
      ({
        name: { official },
        flags: { png },
        capital,
        population,
        languages,
      }) => {
        return `<div>
        <div class="country">
        <img class="country-flag" src= ${png}>

        <h1 class="info__country-name">${official}</h1>

        </div>

        <p class="meta-info"><span class="title">Capital:</span> ${capital}</p>
        <p class="meta-info"><span class="title">Population:</span> ${population}</p>
        <p class="meta-info"><span class="title">Languages:</span> ${Object.values(
          languages
        )}</p>
        </div>`;
      }
    )
    .join('');
  refs.countryInfo.innerHTML = markupInfo;
}

function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
