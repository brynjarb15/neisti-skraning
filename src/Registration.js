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
        this.allFields = ['name', 'ssn', 'email', 'scoutGroup'];
        // Use initState so we can make all empty later
        this.initState = {
            loading: false,
            bankInfoBelongsToParticipant: true,
            allStoresNotSelectedClass: 'hidden-label ',
            infoMissing: 'hidden-label ',
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
                    name: 'Leikjastjórnun',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Fjallamennska og rötun',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Leðurvinna, ull og garn',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Skrautskrift',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Hnífar og axir',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Hnútar og bindingar',
                    info: '2.5 klst',
                    val: ''
                },				
				{
                    name: 'Skyndihjálp',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'ÚT að borða',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'GAS- prímusar og hitarar',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Eldmeistarinn',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Klifur og sig',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Sálræn skyndihjálp',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Canva og photoshop',
                    info: '1 klst',
                    val: ''
				},
				{
                    name: 'Forritun fyrir krakka',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Víkingar',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Geimurinn, stjörnur og stjörnumerki',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Íslenski fáninn',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Youtube',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Heimsmarkmiðin',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Spuni og leiklist',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Saga skátastarfs',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Flóttamannaspilið',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Gítar, ukulele og slagverk',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Úr glamri í geggjað djamm',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Kvöldvökur og varðeldastjórnun',
                    info: '1 klst',
                    val: ''
                },
                
                {
                    name: 'Samfélagsmiðlar',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Samskipti við foreldra',
                    info: '1 klst',
                    val: ''
                },				
				{
                    name: 'Frá hugmynd að verkefnaplani',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Framkoma og ræðumennska',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Fundarsköp og fundarstjórn',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Góðgerðarmál',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Sveitarforinginn - grunnfærni',
                    info: '2.5 klst',
                    val: ''
                },
				{
                    name: 'Að vera örugg í starfi',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Greindi skátinn',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Að fara með sveitina til útlanda',
                    info: '1 klst',
                    val: ''
                },
				{
                    name: 'Sveitarforingjar á Jamboree 2019',
                    info: '2.5 klst',
                    val: ''
                }	
            ]
        };
        this.state = this.initState;
        this.handleChange = this.handleChange.bind(this);
        this.sendButtonPressed = this.sendButtonPressed.bind(this);
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

    /**
     * Handle change in number input
     */
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

    sendButtonPressed() {
        // Check if anything is empty and if not send the form
        if (this.errorCheck()) {
            console.log('There was an error in the input');
        } else {
            this.setState({ loading: true });
            
            sendFormToSheet(this.state.name,
                this.state.ssn,
                this.state.email,
                this.state.scoutGroup,
                this.state.events,
                this.formSentCallback
            );
            
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
                this.setState({ [this.allFields[i]]: { name: this.state[nextField].name, val: this.state[nextField].val, class: 'has-error ' } });
                this.setState({infoMissing: 'show-error-label '});
            }
        }
        let someNumberNotUsedOnlyOnce = !this.checkIfEachNumberIsUsedOnlyOnce();
        return somethingEmpty || someNumberNotUsedOnlyOnce;
    }

    checkIfEachNumberIsUsedOnlyOnce() {
        let numbersMissing = [];
        let numbersUsedManyTimes = [];
        for (let i = 1; i <= 6; i++) {
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
                <label className="">{event.name} | {event.info}
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
                    <h1>Neisti - Skráning í smiðjur</h1>
                    <div className="registration-body">
                        <p>
                        Veljið þær 6-10 smiðjur sem þið hafið mestan áhuga á.  Númerið þær eftir áhugaröð,  þ.e. 1 fyrir þá sem þið hafið mestan áhuga á og svo framvegis. Nauðsynlegt er að velja 6 smiðjur og hámark er 10 smiðjur <br></br>
                        Reynið að velja í bland smiðjur sem taka 1 klst og þær sem taka 2.5 klst. <br></br>
                        Athugið að lágmarksþátttaka þarf að nást til að smiðja verði starfrækt.
                        </p>
                        <form className="form-group row">
                            <h3>
                                Fylla þarf út eftirtaldar upplýsingar
                            </h3>
                            <div className="form-group">
                                {list}
                            </div>
                            <h3>
                                Smiðjur
                            </h3>
                            {eventList}
                            <div>
                                <label className={this.state.allStoresNotSelectedClass}>
                                    Aðeins má nota hverja tölu einu sinni og setja þarf að lágmarki tölu frá 1 uppí 6, 1 tölu í hvern reit. <br></br>
                                    Hægt er að setja tölur frá 7-10 ef áhugi er á.
                                </label>
                            </div>
                            <div>
                                <label className={this.state.infoMissing}>
                                    Ekki er búið að fylla inn allar persónuupplýsingar
                                </label>
                            </div>
                            <button type="button" class="btn btn-primary btn-lg" value="senda" onClick={this.sendButtonPressed}>
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