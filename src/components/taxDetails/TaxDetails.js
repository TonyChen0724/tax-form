import React from 'react';
import axios from 'axios';
import { CountryAndTax } from './CountryAndTax';
export class TaxDetails extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            isTaxResident: null,
            countries: [],
            selectedCountries: [],

        };
    }

    setTaxResident = (event) => {
        console.log(event.target.value);
        this.setState({ isTaxResident: event.target.value === 'Yes' });
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(
            (response) => {
                console.log(response);
                this.setState({ countries: response.data, selectedCountries: [{}] });
            }
        ).catch(
            (e) => {
                console.error(e);
            }
        );
    }


    render() {
        console.log('selectedCountries: ' + JSON.stringify(this.state.selectedCountries));

        return <div>
            <p>Are you a tax resident: </p>
            <div>
                <input type="radio" value="Yes" id="taxresidentYes" onChange={this.setTaxResident} checked={this.state.isTaxResident} />
                <label htmlFor="taxresidentYes">Yes</label>
                <input type="radio" value="No" id="taxresidentNo" onChange={this.setTaxResident} checked={this.state.isTaxResident === false} />
                <label htmlFor="taxresidentNo">No</label>
            </div>
            {this.state.isTaxResident &&
                <div>
                    {this.state.selectedCountries.map((country, index) => {
                        return (
                            <CountryAndTax
                                key={country.name || index}
                                country={country}
                                countryIndex={index}
                                countryList={this.state.countries}
                                onCountryDeleted={(countryIndex) => {
                                    let newSelectedCountries = [...this.state.selectedCountries];
                                    newSelectedCountries.splice(countryIndex, 1);
                                    this.setState({ selectedCountries: newSelectedCountries });
                                }}
                                onCountryChanged={(value, index) => {
                                    let newSelectedCountries = [...this.state.selectedCountries];
                                    console.log('selected country: ' + value);
                                    console.log('selected index: ' + index);
                                    newSelectedCountries[index].name = value
                                    this.setState({ selectedCountries: newSelectedCountries });
                                }} />
                        );
                    })}
                    <button onClick={() => {
                        this.state.selectedCountries.push({});
                        this.setState({ selectedCountries: this.state.selectedCountries });
                    }}> ADD </button>
                </div>
            }


        </div>
    }
}