import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { fetchTransactions } from './../../../actions/transactionActions';
import { connect } from 'react-redux';

class allTransactions extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTransactions();
    }

    render() {
        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <h4>Transactions List</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { fetchTransactions })(allTransactions);
