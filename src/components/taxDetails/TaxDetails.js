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
            age: '100',
            fruits: { 'apple': true },
            text: 'asdf'
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

    ageChanged = (event) => {
        this.setState({ age: event.target.value });
    }

    fruitSelected = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        const fruits = this.state.fruits;
        fruits[value] = checked;
        console.log(this.state.fruits);
        this.setState({ fruits: this.state.fruits });
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
            <br />
            {/* <div>
                <div>
                    <input type="radio" value="18" id="eighteenYears" onChange={this.ageChanged} checked={this.state.age === '18'} />
                    <label htmlFor="eighteenYears">Under 18</label>
                </div>
                <div>
                    <input type="radio" value="30" id="thirtyYears" onChange={this.ageChanged} checked={this.state.age === '30'} />
                    <label htmlFor="thirtyYears">18 - 30</label>
                </div>
                <div>
                    <input type="radio" value="100" id="older" onChange={this.ageChanged} checked={this.state.age === '100'} />
                    <label htmlFor="older">Older than 30</label>
                </div>
            </div> */}
            <br />
            <div>
                <div>
                    <input type="checkbox" id="apple" value='apple' onChange={this.fruitSelected} checked={this.state.fruits['apple']} />
                    <label htmlFor="apple">苹果</label>
                </div>
                <div>
                    <input type="checkbox" id="orange" value='orange' onChange={this.fruitSelected} checked={this.state.fruits['orange']} />
                    <label htmlFor="orange">orange</label>
                </div>
                <div>
                    <input type="checkbox" id="kiwi" value='kiwi' onChange={this.fruitSelected} checked={this.state.fruits['kiwi']} />
                    <label htmlFor="kiwi">kiwi</label>
                </div>
            </div>

            <textarea value={this.state.text} onChange={(taxNumberChangeEvent) => {
                console.log(this.state.text);
                this.setState({ text: taxNumberChangeEvent.target.value });
            }}></textarea>
            {this.state.isTaxResident &&
                <div>
                    {this.state.selectedCountries.map((country, index, selectedCountries) => {
                        return (
                            <CountryAndTax
                                key={country.name || index}
                                country={country}
                                countryIndex={index}
                                countryList={this.state.countries}
                                selectedCountries={selectedCountries}
                                onCountryDeleted={(countryIndex) => {
                                    let newSelectedCountries = [...selectedCountries];
                                    newSelectedCountries.splice(countryIndex, 1);
                                    this.setState({ selectedCountries: newSelectedCountries });
                                }}
                                onCountryChanged={(value, index) => {
                                    let newSelectedCountries = [...selectedCountries];
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