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

    render() {
        console.log(this.state.countryNames);
        let countries = this.props.countryList;
        let createCounryItem = (countryItem, index) => {
            return <option key={index}>{countryItem.name}</option>;
        };
        return (

            <div>
                <label>default country: {this.props.defaultCountry}</label>
                <select name="countrylist" onChange={(event) => {
                    let selectedValue = event.target.value;
                    this.props.onCountryChanged(selectedValue, this.props.countryIndex);
                }}>
                    {countries.map(createCounryItem)}
                </select>
                <label>tax number:</label>
                <input type="select" value={this.state.value} onChange={this.handleChange} />
                <br></br>

            </div>
        );
    }
}
