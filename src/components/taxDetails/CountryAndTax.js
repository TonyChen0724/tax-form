import React from 'react';
export class CountryAndTax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            taxNumber: '',
            selectedCountryName: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    updateTaxCountries = (countries, selectedCountries, currentCountryName) => {
        return countries.filter((country) => {
            if (country.name === currentCountryName) {
                return true;
            }
            const exist = selectedCountries.find((selectedCountry) => {
                return selectedCountry.name === country.name;
            });
            return !exist;
        });
    }

    render() {
        console.log(this.state.countryNames);

        const { countryList, selectedCountries, country, onCountryDeleted, countryIndex, onCountryChanged } = this.props;
        let countries = countryList;

        const countryOptions = this.updateTaxCountries(countries, selectedCountries, country.name);

        let createCounryItem = (countryItem, index) => {
            return <option selected={country.name === countryItem.name} key={index}>{countryItem.name}</option>;
        };
        return (

            <div>
                <select name="countrylist" onChange={(event) => {
                    let selectedValue = event.target.value;
                    onCountryChanged(selectedValue, countryIndex);
                }}>
                    {!this.props.country.name && <option>please select:</option>}
                    {countryOptions.map(createCounryItem)}
                </select>
                <label>tax number:</label>
                <input type="select" value={this.state.value || this.props.country.value} onChange={this.handleChange} />
                <button onClick={() => {
                    console.log();
                    onCountryDeleted(countryIndex);
                }}>Delete</button>
                <br />

            </div>
        );
    }
}
