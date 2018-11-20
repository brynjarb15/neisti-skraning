import React, { Component } from 'react';

class SuccessPage extends Component {
    render() {
        return (
            <div>
                <h1>
                Þú hefur skráð þig í smiðjur á Neista 2019.   <br></br>
                Athugaðu að þú þarft líka að skrá þig í Nóra  <a href="https://skatar.felog.is/">skatar.felog.is</a>
                </h1>
                <button type="button" onClick={this.props.goBack}>Fara til baka</button>
            </div>
        );
    }
}

export default SuccessPage;
