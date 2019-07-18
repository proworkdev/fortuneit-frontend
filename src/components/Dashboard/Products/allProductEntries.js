import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { getAllEntries } from './../../../actions/productActions';
import { Table } from 'reactstrap';

class allProductEntries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            entryData: []
        }
    }

    componentDidMount() {

        this.props.getAllEntries();

    }

    componentDidUpdate(prevProps) {

        const { entries } = this.props;

        if (entries !== prevProps.entries) {
            this.setState({ entryData: entries.data })
        }

    }


    render() {

        const { entryData } = this.state;

        console.log('Testing data in render ==> ', entryData);

        const renderEntriesData = entryData.map((entry, index) => {
            return <tr key={index}>
                <td>1.</td>
                <td>{entry.created}</td>
                <td>{entry.productName}</td>
                <td>{entry.productDesc}</td>
                <td>{entry.productUrl}</td>
                <td>{entry.sellerContact}</td>
                <td>{entry.productQuantity}</td>
                <td>{entry.productCost}</td>
                <td>{entry.orderSubTotal}</td>
                <td>{entry.sampleFee}</td>
                <td>{entry.setupFee}</td>
                <td>{entry.inspectionFee}</td>
                <td>{entry.miscFee}</td>
                <td>{entry.manufacturingFee}</td>
                <td>{entry.manufacturingTotal}</td>
                <td>{entry.shippingMethod}</td>
                <td>{entry.shippingCost}</td>
                <td>{entry.totalShippingCostForAllOrders}</td>
                <td>{entry.miscShippingFee}</td>
                <td>{entry.shippingTotal}</td>
                <td>{entry.shippingTotalPerUnit}</td>
                <td>{entry.listingServiceFee}</td>
                <td>{entry.referralFee}</td>
                <td>{entry.fbaFee}</td>
                <td>{entry.fulfillmentChargesPerUnit}</td>
                <td>{entry.fulfillmentChargesPerOrder}</td>
                <td>{entry.landedCostPerOrder}</td>
                <td>{entry.landedCostPerUnit}</td>
                <td>{entry.salesPrice}</td>
                <td>{entry.estimatedPreAdProfitPerSale}</td>
                <td>{entry.netProfitmargin}</td>
                <td>{entry.targetNetProfitMargin}</td>
                <td>{entry.suggestedSalesPrice}</td>
                <td>{entry.cogsPerOrder}</td>
                <td>{entry.estimatedPreAdProfitPerOrder}</td>
                <td>{entry.breakevenAcosBasedOnEstimatedPreApps}</td>
                <td>{entry.estimatedRevenuePerOrder}</td>
                <td>{entry.salesToBreakeven}</td>
                <td>{entry.salesTarget}</td>
                <td>{entry.estimatedNetProfitMonth}</td>
                <td>{entry.monthsToSellout}</td>
            </tr>
        })

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <h4><u>All Product Entries</u></h4>
                            <br />

                            <Table className="table-responsive">
                                <thead>

                                    <tr>
                                        <th>Serial</th>
                                        <th>Entry Date</th>
                                        <th>Product Name</th>
                                        <th>Product Description</th>
                                        <th>Hyperlink</th>
                                        <th>Contact</th>
                                        <th>Unit Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Order Subtotal</th>
                                        <th>Sample Fee</th>
                                        <th>Setup Fee</th>
                                        <th>Inspection Fee</th>
                                        <th>Misc Fee</th>
                                        <th>Manufacturing Fee</th>
                                        <th>Manufacturing Total</th>
                                        <th>Shipping Method</th>
                                        <th>Est. Shipping Cost Per Unit</th>
                                        <th>Est. Shipping Cost Per Order</th>
                                        <th>Misc Shipping Fee</th>
                                        <th>Shipping Total</th>
                                        <th>Shipping Total Per Unit</th>
                                        <th>Listing Services (Photography/Copy/Launch)</th>
                                        <th>Referral Fee</th>
                                        <th>FBA Fee</th>
                                        <th>Fulfillment Charges Per Unit</th>
                                        <th>Fulfillment Charges Per Order</th>
                                        <th>Landed Cost Per Order</th>
                                        <th>Landed Cost Per Unit</th>
                                        <th>Sale Price</th>
                                        <th>Est. Pre-Ad Profit Per Sale</th>
                                        <th>Net Profit Margin</th>
                                        <th>Target Net Profit Margin</th>
                                        <th>Suggested Sales Price</th>
                                        <th>COGS Per Order</th>
                                        <th>Estimated Pre-Ad Profit Per Order</th>
                                        <th>Breakeven ACoS based on Est. Pre-APPS</th>
                                        <th>Est. Revenue Per Order</th>
                                        <th>Sales to Breakeven</th>
                                        <th>Monthly Sales Target</th>
                                        <th>Estimated Net Profit Monthly</th>
                                        <th>Estimated Months to Sellout</th>

                                    </tr>

                                </thead>
                                <tbody>
                                    {renderEntriesData}
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
    entries: state.product.entriesData
})

export default connect(mapStateToProps, { getAllEntries })(allProductEntries)
