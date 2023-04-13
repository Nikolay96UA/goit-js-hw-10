class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  options = 'fields=name.official,capital,population,flags.svg,languages';

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?${this.options}`
    ).then(data => {
      return data.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { CountriesApiService };
