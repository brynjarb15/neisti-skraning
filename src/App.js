import React, { Component } from 'react';
import Registration from './Registration';
import ErrorPage from './ErrorPage';
import SuccessPage from "./SuccessPage";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, faPencilAlt, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

import './App.css';

library.add(faStroopwafel, faPencilAlt, faTrashAlt, faCheck);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessPage: false,
      showErrorPage: false
    }
    this.formSentCallback = this.formSentCallback.bind(this);
    this.goBackToRegistration = this.goBackToRegistration.bind(this);
    

  }

  formSentCallback(err, httpResponse, body) {
    if (err) {
      // do some error thing
      console.log('httpResponse', httpResponse);
      console.log('Error', err);
      this.setState({showErrorPage: true});
      return;
    }
    let parsedBody = JSON.parse(body);
    if(parsedBody.result === 'success') {
      this.setState({showSuccessPage: true})
      // do some success thing
    }
  }

  goBackToRegistration() {
    this.setState({showSuccessPage: false, showErrorPage: false})
  }
  
  render() {
    let page = <div></div>
    if(this.state.showSuccessPage) {
      page = <SuccessPage goBack={this.goBackToRegistration}/>;
    } else if (this.state.showErrorPage) {
      page = <ErrorPage goBack={this.goBackToRegistration}/>
    } else {
      page = <Registration formSentCallback={this.formSentCallback}/>;
    }
    return (
      <div className="App">
        {page}
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossOrigin="anonymous" />
      </div>
    );
  }
}

export default App;
