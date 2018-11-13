import React, { Component } from 'react';

class SuccessPage extends Component {
    render() {
        return (
            <div>
                <h1>
                    Það tókst að skrá þig.
                </h1>
                <button type="button" onClick={this.props.goBack}>Fara til baka</button>
            </div>
        );
    }
}

export default SuccessPage;
