import React from 'react';
import axios from 'axios';
import { CountryAndTax } from './CountryAndTax';
export class TaxDetails extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            isTaxResident: true,
            countries: [],
            selectedCountries: [],

        };
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(
            (response) => {
                console.log(response);
                this.setState({ countries: response.data, selectedCountries: [{}, {}] });
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
            {this.state.isTaxResident ? <p>Yes</p> : <p>No</p>}
            {this.state.selectedCountries.map((country, index) => {
                return (
                    <CountryAndTax
                        key={index}
                        countryIndex={index}
                        countryList={this.state.countries}
                        onCountryChanged={(value, index) => {
                            let newSelectedCountries = [...this.state.selectedCountries];
                            console.log('selected country: ' + value);
                            console.log('selected index: ' + index);
                            newSelectedCountries[index].name = value
                            this.setState({ selectedCountries: newSelectedCountries });
                        }} />
                );
            })}

        </div>
    }
}