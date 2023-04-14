class CountriesApiService {
  constructor() {
    this.searchQuery = '';
  }

  options = 'fields=name,capital,population,flags,languages';

  fetchCountries() {
    return fetch(
      `https://restcountries.com/v3.1/name/${this.searchQuery}?${this.options}`
    ).then(response => {
      if (!response.ok) {
        throw new Error('No data');
      }

      return response.json();
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
