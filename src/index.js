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
  // fetchArticles();
}

// function fetchArticles() {
//   return getArticlesMarkup().then(markup => {
//     updateNewsList(markup);
//   });
// }

// function getArticlesMarkup() {
//   return countriesApiService.fetchCountries().then(({ country }) => {
//     return country.reduce(
//       (markup, country) => markup + createMarkup(country),
//       ''
//     );
//   });

//   function createMarkup({ name, capital, population, flags, languages }) {
//     return `
//       <div class="article-card">
//           <h2 class="country-name">${name}</h2>
//           <h3 class="country-capital">${capital || 'Unknown'}</h3>
//           <h3 class="country-population">${population || 'Unknown'}</h3>
//           <img src=${
//             flags ||
//             'https://sun9-43.userapi.com/impf/c637716/v637716451/5754/CZa3BJtbJtg.jpg?size=520x0&quality=95&sign=02df8d0cd8ae78099bc1f50938efd60a'
//           } class="country-flags">
//           <p class="country-languages">${languages}</p>
//       </div>
//     `;
//   }
// }

// function updateNewsList(markup) {
//   refs.countryInfo.insertAdjacentHTML('beforeend', markup);
// }
