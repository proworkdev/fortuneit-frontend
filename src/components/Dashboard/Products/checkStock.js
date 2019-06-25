import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { getStocks } from './../../../actions/productActions';
import { Alert, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';


class checkStock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocksArray: []
        }
    }

    componentDidMount() {

        this.props.getStocks();

    }

    componentDidUpdate(prevProps) {

        const { stocks } = this.props;

        if (stocks !== prevProps.stocks) {
            this.setState({ stocksArray: stocks.products })
        }

    }

    render() {

        const { stocksArray } = this.state;

        console.log('Testing Stocks in Render ==> ', stocksArray);

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <h4><u>Stocks Section</u></h4>
                            <br />

                            <Table bordered responsive >

                                <thead>
                                    <tr>
                                        <th>ASIN</th>
                                        <th>Seller SKU</th>
                                        <th>Product</th>
                                        <th>FN SKU</th>
                                        <th>Item Condition</th>
                                        <th>Total Supply Quantity</th>
                                        <th>In Stock Quantity</th>
                                        <th>Availability</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        stocksArray.map((stock, index) => {
                                            return <tr key={index}>
                                                <td>{stock.ASIN}</td>
                                                <td>{stock.SellerSKU}</td>
                                                <td>{stock.ProductDesc}</td>
                                                <td>{stock.FNSKU}</td>
                                                <td>{stock.Condition}</td>
                                                <td>{stock.TotalSupplyQuantity}</td>
                                                <td>{stock.inStockQuantity}</td>
                                                <td>{stock.Availability}</td>
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
    stocks: state.product.stocksData
})

export default connect(mapStateToProps, { getStocks })(checkStock)
