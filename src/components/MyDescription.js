import React from 'react';
import axios from 'axios';
export class MyDescription extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            template: 'My Description (class)',
            clicked: false,
            comments: [
                'aaa', 'bbb', 'ccc'
            ],
            countries: []
        };
        this.member = 1;
        this.myfunction1 = this.myfunction1.bind(this);
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all').then(
            (response) => {
                console.log(response);
                this.setState({ countries: response.data });
            }
        ).catch(
            (e) => {
                console.error(e);
            }
        );
    }

    myfunction1() {
        console.log('function 2');
        this.setState((state, props) => {
            console.log(state);
            console.log(props);
            return { template: state.template + '' + props.description };
        })
    }

    myfunction2 = (event) => {
        console.log('function 2');
        this.setState((state, props) => {
            console.log(state);
            console.log(props);
            return { template: state.template + '' + props.description, clicked: !this.state.clicked };
        })
    }

    renderCountry = (country) => {
        return (<div>
            <p>Code: {country.alpha2Code}</p>
            <p>CountryName: {country.name}</p>
            <p>NativeName: {country.nativeName}</p>
            <br />
        </div>);
    }

    render() {

        return <div>
            <p onClick={this.myfunction2}>{this.state.template} </p>
            {this.state.clicked ? <h1>You found me!</h1> : null}
            {
                this.state.comments.map((comment, index, comments) => {
                    return (
                        <div key={btoa(index)}>
                            <p>comment : {index + 1}</p>
                            <p>{comment}</p>
                        </div>
                    );
                })
            }
            {
                this.state.countries.map(this.renderCountry)
            }
        </div>
    }
}