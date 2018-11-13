import React, { Component } from 'react';
import { sendFormToSheet } from './InternetFunctions';
import 'pretty-checkbox';
import './Registration.css';
import { } from '../node_modules/@fortawesome/free-solid-svg-icons';


class Registration extends Component {
    constructor(props) {
        super(props);
        // Name of objects in the state
        // Used to iterate over these fields
        this.allFields = ['name', 'ssn', 'phone', 'email', 'scoutGroup'];
        // Use initState so we can make all empty later
        this.initState = {
            loading: false,
            bankInfoBelongsToParticipant: true,
            allStoresNotSelectedClass: 'hidden-label ',
            name: {
                name: 'Nafn',
                val: '',
                class: ''
            },
            ssn: {
                name: 'Kennitala',
                val: '',
                class: ''
            },
            phone: {
                name: 'Símanúmer',
                val: '',
                class: ''
            },
            email: {
                name: 'Tölvupóstur',
                val: '',
                class: ''
            },
            scoutGroup: {
                name: 'Skátafélag',
                val: '',
                class: ''
            },
            events: [
                {
                    name: 'Klifur og sig',
                    info: 'Bara fyrir þá sem hafa mætt oft áður',
                    val: ''
                },
                {
                    name: 'Gítarkennsla',
                    info: '',
                    val: ''
                },
                {
                    name: 'Stjörnuskoðun',
                    info: '',
                    val: ''
                },
                {
                    name: 'Tjaldbúðarvinna',
                    info: '',
                    val: ''
                },
                {
                    name: 'Skyndihjálp',
                    info: '',
                    val: ''
                },
                {
                    name: 'Veislustjórnun',
                    info: '',
                    val: ''
                }
            ]
        };
        this.state = this.initState;
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.sendButtonPressed = this.sendButtonPressed.bind(this);
        this.makeBankRadioFalse = this.makeBankRadioFalse.bind(this);
        this.makeBankRadioTrue = this.makeBankRadioTrue.bind(this);
        this.formSentCallback = this.formSentCallback.bind(this);
        this.handleEventInputChange = this.handleEventInputChange.bind(this);
        this.checkIfEachNumberIsUsedOnlyOnce = this.checkIfEachNumberIsUsedOnlyOnce.bind(this);
    }

    /**
     * Handle change to text input fields
     */
    handleChange(event) {
        this.setState({ [event.target.name]: { name: this.state[event.target.name].name, val: event.target.value } });
    }

    handleEventInputChange(event) {
        // Get all events
        let allEvents = this.state.events.slice();
        // Find the correct store
        let eventToChange = allEvents.find(x => x.name === event.target.name);
        // Change value
        eventToChange.val = event.target.value;
        // Update the state
        this.setState({ events: allEvents});
    }

    handleCheckBoxChange(event) {
        // Get all stores
        let newStores = this.state.stores.slice();
        // Find the correct store
        let storeToChange = newStores.find(x => x.name === event.target.name);
        // Change value
        storeToChange.val = event.target.checked;
        // Update the state
        this.setState({ stores: newStores });
        // Hide the checkbox error label when a store is checked
        if (event.target.checked) {
            this.setState({ allStoresNotSelectedClass: 'hidden-label ' })
        }
    }

    sendButtonPressed() {
        // Check if anything is empty and if not send the form
        if (this.errorCheck()) {
            console.log('There was an error in the input');
        } else {
            this.setState({ loading: true });
            /*
            sendFormToSheet(this.state.name,
                this.state.ssn,
                this.state.phone,
                this.state.email,
                this.state.scoutGroup,
                this.state.bankNumber,
                this.state.stores,
                this.state.parentSSN,
                this.state.parentPhone,
                this.state.parentEmail,
                this.state.bankInfoBelongsToParticipant,
                this.formSentCallback
            );
            */
        }
    }

    /**
     * Check if anything is empty and add some class on objects so error message will be shown
     */
    errorCheck() {
        let somethingEmpty = false;
        // Check the normal fields
        for (let i = 0; i < this.allFields.length; i++) {
            let nextField = this.allFields[i]
            if (this.state[nextField].val === '') {
                // We found a empty field so we set the flag and add error class to field
                somethingEmpty = true;
                this.setState({ [this.allFields[i]]: { name: this.state[nextField].name, val: this.state[nextField].val, class: 'has-error ' } })
            }
        }

        // Check if any store is selected
        let allStoresNotSelected = true;
        /*
        for (let i = 0; i < this.state.stores.length; i++) {
            let nextStore = this.state.stores[i];
            if (nextStore.val) {
                allStoresNotSelected = false;
            }
        }
        // If no store is selected we show error
        if (allStoresNotSelected) {
            this.setState({ allStoresNotSelectedClass: 'show-error-label ' });
        }
        */
        let someNumberNotUsedOnlyOnce = !this.checkIfEachNumberIsUsedOnlyOnce();
        return somethingEmpty || someNumberNotUsedOnlyOnce;
    }

    checkIfEachNumberIsUsedOnlyOnce() {
        let numbersMissing = [];
        let numbersUsedManyTimes = [];
        for (let i = 1; i <= this.state.events.length; i++) {
            let howManyTimesUsed = this.state.events.filter(x => x.val === i.toString()).length;
            if(howManyTimesUsed === 0){
                numbersMissing.push(i);
            }
            if(howManyTimesUsed > 1){
                numbersUsedManyTimes.push({number: i, times: howManyTimesUsed});
            }
        }
        if(numbersMissing.length !== 0 || numbersUsedManyTimes.length !== 0){
            this.setState({ allStoresNotSelectedClass: 'show-error-label ' });
            return false;
        } else {
            this.setState({ allStoresNotSelectedClass: 'hidden-label ' });
            return true;
        }
    }


    getInputFormField(field) {
        let input =
            <div key={field} className={this.state[field].class}>
                <label>
                    {this.state[field].name}:
                    <input className="form-control" type="text"
                        name={field}
                        placeholder={this.state[field].name}
                        onChange={this.handleChange}
                        value={this.state[field].val}
                    />
                    <small className="error-label">Það þarf að fylla inn þennan reit</small>
                    <br className="error-label" />
                </label>
            </div>;
        return input;
    }

    makeBankRadioTrue() {
        this.setState({ bankInfoBelongsToParticipant: true });
    }

    makeBankRadioFalse() {
        this.setState({ bankInfoBelongsToParticipant: false });
    }

    // Callback sent with the send form to sheet
    formSentCallback(err, httpResponse, body) {
        // Make all empty
        //this.setState(this.initState);
        this.props.formSentCallback(err, httpResponse, body);
    }



    render() {
        // Make normal list
        const list = this.allFields.map((field) =>
            this.getInputFormField(field)
        );

        // Make store checkbox list
        const eventList = this.state.events.map((event) =>
            <div key={event.name} className="number-input-field">
                <input type="number" className="number-input form-control" name={event.name} onChange={this.handleEventInputChange} value={this.state.events.val}/>
                <label className="">{event.name}
                </label>
            </div>
        );
        let buttonValue = 'Senda';
        if (this.state.loading) {
            buttonValue = <div className="lds-ring"><div></div><div></div><div></div><div></div></div>;
        }
        return (
            <div className="registration-all">
                <div >
                    <h1>Vörutalningar haust 2018</h1>
                    <div className="registration-body">
                        <p>
                            Sniðugur texti um það sem er í gangi
                        </p>
                        <form className="form-group row">
                            <h3>
                                Dagskrávalmöguleikar
                            </h3>
                            <p>
                                Hérna kemur texti sem útskýrir að maður eigi að setja tölu frá 1 uppí 5 inní þetta
                            </p>
                            {eventList}
                            <label className={this.state.allStoresNotSelectedClass}>Aðeins má nota hverja tölu einu sinni og setja þarf tölu frá 1 uppí 5, 1 tölu í hvern reit</label>
                            <h3>
                                Fylla þarf út eftirtaldar upplýsingar
                            </h3>
                            <div className="form-group">
                                {list}
                            </div>
                            <button type="button" value="senda" onClick={this.sendButtonPressed}>
                                {buttonValue}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;