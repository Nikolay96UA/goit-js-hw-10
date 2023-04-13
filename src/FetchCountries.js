class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  options = 'fields=name.official,capital,population,flags.svg,languages';

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?${this.options}`
    )
      .then(res => res.json())
      .then(data => console.log(data));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { CountriesApiService };
