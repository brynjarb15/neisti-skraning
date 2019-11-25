import React, { Component } from 'react';

class SuccessPage extends Component {
    render() {
        return (
            <div>
                <h1>
                Þú hefur skráð þig í smiðjur á Neista 2020.   <br></br>
                Athugaðu að þú þarft líka að skrá þig í Nóra  <a href="https://skatar.felog.is/">skatar.felog.is</a> <br></br>
                </h1>
                <button type="button" onClick={this.props.goBack}>Fara til baka</button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default SuccessPage;
