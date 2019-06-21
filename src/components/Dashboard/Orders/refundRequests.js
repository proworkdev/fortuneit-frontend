import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { fetchRefundsData } from './../../../actions/refundActions';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';

class refundRequests extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refunds: []
        }
    }

    componentDidMount() {
        this.props.fetchRefundsData()
    }

    componentDidUpdate(prevProps) {

        const { refundsData } = this.props;

        if (refundsData !== prevProps.refundsData) {
            this.setState({ refunds: refundsData.data });
        }

    }

    trackDetails = () => {

    }

    render() {

        const { refunds } = this.state;

        return (

            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">

                            <br />

                            <h4>Refund Details</h4>

                            <br />

                            <Table bordered >
                                <thead>
                                    <tr>
                                        <th>Amazon Order ID</th>
                                        <th>Date</th>
                                        <th>Seller SKU</th>
                                        <th>Principal</th>
                                        <th>Tax</th>
                                        <th>Commission</th>
                                        <th>Refund Commission</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        refunds.map((refund, index) => {
                                            return <tr key={index}>
                                                <td>{refund.AmazonOrderID}</td>
                                                <td>{refund.rundate}</td>
                                                <td>{refund.SellerSKU}</td>
                                                <td>{Math.abs(refund.chargeTypeprice1)}</td>
                                                <td>{Math.abs(refund.chargeTypeprice0)}</td>
                                                <td>{Math.abs(refund.feeTypeprice0)}</td>
                                                <td>{Math.abs(refund.feeTypeprice1)}</td>
                                                <Button onClick={() => this.trackDetails()} color="primary">Track Details</Button>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    refundsData: state.refund.data
})

export default connect(mapStateToProps, { fetchRefundsData })(refundRequests)
