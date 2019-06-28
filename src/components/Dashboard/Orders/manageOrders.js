import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { fetchOrders } from './../../../actions/orderActions';
import logo from './../../../material/images/logo.png';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getOrdersForDuration } from './../../../actions/orderActions';

class manageOrders extends Component {

    constructor(props) {

        super(props);

        this.state = {
            ordersArray: [],
            successMessage: null,
            errorMessage: null,
            isLoading: false,
            infoMessage: true,
            trackingModal: false,
            buyerModal: false,
            financeModal: false,
            selectedOrder: [],
            currentPage: 1,
            ordersPerPage: 10,
            ordersDate: ''
        }
    }

    componentDidUpdate(prevProps) {

        const { orderData, durationData } = this.props;

        if (orderData !== prevProps.orderData) {

            if (orderData.success === true) {
                this.setState({ ordersArray: orderData.data, isLoading: false })
            } else {
                this.setState({ errorMessage: orderData.message, isLoading: false })
            }
        }

        if (durationData !== prevProps.durationData) {
            this.setState({ ordersArray: durationData.data, isLoading: false })
        }
    }

    onChangeText = (e) => {

        this.setState({ [e.target.name]: e.target.value })

    }

    getOrderForDate = (e) => {

        e.preventDefault();

        const { ordersDate } = this.state;

        const body = {
            ordersDate
        }

        this.props.getOrdersForDuration(body);

    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.fetchOrders();
    }

    handleClick = (event) => {

        this.setState({

            _currentPage: Number(event.target.id),

            get currentPage() {
                return this._currentPage;
            },
            set currentPage(value) {
                this._currentPage = value;
            },
        });

        window.scrollTo(0, 0);
    }

    toggleForTracking = (id) => {

        const { ordersArray, trackingModal } = this.state;

        this.setState({
            trackingModal: !trackingModal
        })

        ordersArray.map((item) => {
            if (item._id === id) {
                this.setState({
                    selectedOrder: item
                })
            }
        })

    }

    toggleForBuyer = (id) => {

        const { ordersArray, buyerModal } = this.state;

        this.setState({
            buyerModal: !buyerModal
        })

        ordersArray.map((item) => {
            if (item._id === id) {
                this.setState({
                    selectedOrder: item
                })
            }
        })

    }

    toggleForFinance = (id) => {

        const { ordersArray, financeModal } = this.state;

        this.setState({
            financeModal: !financeModal
        })

        ordersArray.map((item) => {
            if (item._id === id) {
                this.setState({
                    selectedOrder: item
                })
            }
        })

    }

    onClickFunction = () => {
        this.setState({ infoMessage: false })
    }

    render() {

        const { ordersArray, selectedOrder, currentPage, ordersPerPage } = this.state;

        const testArr = [];
        const pageNumbers = [];
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders = ordersArray.slice(indexOfFirstOrder, indexOfLastOrder);

        for (let i = 1; i <= Math.ceil(ordersArray.length / ordersPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {

            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            )
        })

        return (

            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        {
                            this.state.infoMessage ? (
                                <div onClick={this.onClickFunction}>
                                    <Alert color="warning">It may take some time to synchronize your orders data.</Alert>
                                </div>
                            ) : null
                        }
                        <div className="inner-panel">

                            <h4><u>Manage Orders</u></h4>

                            <br />

                            {/* {
                                ordersArray.length !== 0 ? (<div className="input-field">

                                    <select onChange={this.onChangeText} name="ordersDate" >
                                        <option value="" selected disabled hidden>Display Orders</option>
                                        <option value="week" >Weekly</option>
                                        <option value="month" >Monthly</option>
                                        <option value="year" >Yearly</option>
                                    </select>

                                    <Button onClick={this.getOrderForDate} size="sm" style={{ marginLeft: 20 }} color="primary"><p style={{ color: '#fff' }}>Find</p></Button>
                                </div>) : null
                            } */}

                            <br />

                            <div>

                                <Table bordered striped >
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Purchase Date</th>
                                            <th>Order ID</th>
                                            <th>Seller SKU</th>
                                            <th>ASIN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentOrders.map((order, index) => {
                                                return <tr key={index}>
                                                    <td>{
                                                        <div>
                                                            {order.ProductTitle}
                                                            <br />
                                                            <br />
                                                            <Button onClick={() => this.toggleForTracking(order._id)} color="warning"><p style={{ color: '#fff' }}>Track Order</p></Button>
                                                            <Button onClick={() => this.toggleForBuyer(order._id)} style={{ marginLeft: 20 }} color="primary"><p style={{ color: '#fff' }}>Buyer Details</p></Button>
                                                            <Button onClick={() => this.toggleForFinance(order._id)} style={{ marginLeft: 20 }} color="success" ><p style={{ color: '#fff' }}>Financial Details</p></Button>
                                                        </div>
                                                    }</td>
                                                    <td>{order.PurchaseDate}</td>
                                                    <td>{order.AmazonOrderID}</td>
                                                    <td>{order.SellerSKU}</td>
                                                    <td>{order.ASIN}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>

                                <center>

                                    <ul className="pagination">
                                        {renderPageNumbers}
                                    </ul>

                                </center>
                            </div>

                            {/* Modal for getting financial details */}

                            <Modal size="lg" isOpen={this.state.financeModal} toggle={this.toggleForFinance} className={this.props.className}>
                                <ModalHeader toggle={this.toggleForFinance}>Financial Details</ModalHeader>
                                <ModalBody>
                                    <Table bordered >
                                        <thead>
                                            <tr>
                                                <th>Principal</th>
                                                <th>Shipping Charges</th>
                                                <th>Tax</th>
                                                <th>Shipping Tax</th>
                                                <th>Gift Wrap Charges</th>
                                                <th>Gift Wrap Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedOrder.PrincipalCurrency} {selectedOrder.Principal}</td>
                                                <td>{selectedOrder.ShippingChargeCurrency} {selectedOrder.ShippingCharge}</td>
                                                <td>{selectedOrder.TaxCurrency} {selectedOrder.Tax}</td>
                                                <td>{selectedOrder.ShippingTaxCurrency} {selectedOrder.ShippingTax}</td>
                                                <td>{selectedOrder.GiftWrapCurrency} {selectedOrder.GiftWrap}</td>
                                                <td>{selectedOrder.GiftWrapTaxCurrency} {selectedOrder.GiftWrapTax}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleForFinance}>Okay</Button>
                                </ModalFooter>
                            </Modal>

                            {/* Modal For getting buyer details. */}

                            <Modal isOpen={this.state.buyerModal} toggle={this.toggleForBuyer} className={this.props.className}>
                                <ModalHeader toggle={this.toggleForBuyer}>Tracking Details</ModalHeader>
                                <ModalBody>
                                    <Table bordered >
                                        <thead>
                                            <tr>
                                                <th>Buyer Name</th>
                                                <th>Buyer Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {
                                                    "BuyerName" in selectedOrder ? (<td>{selectedOrder.BuyerName}</td>) : <td style={{ color: 'red' }}>N/A</td>
                                                }
                                                {
                                                    "BuyerEmail" in selectedOrder ? (<td>{selectedOrder.BuyerEmail}</td>) : <td style={{ color: 'red' }}>N/A</td>
                                                }
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleForBuyer}>Okay</Button>
                                </ModalFooter>
                            </Modal>

                            {/* Modal for getting tracking details */}

                            <Modal isOpen={this.state.trackingModal} toggle={this.toggleForTracking} className={this.props.className}>
                                <ModalHeader toggle={this.toggleForTracking}>Tracking Details</ModalHeader>
                                <ModalBody>
                                    <Table bordered >
                                        <thead>
                                            <tr>
                                                <th>Order Status</th>
                                                <th>Fulfillment Channel</th>
                                                <th>Quantity Ordered</th>
                                                <th>Quantity Shipped</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {
                                                    selectedOrder.OrderStatus === 'Shipped' ? (<td style={{ color: 'green' }} >{selectedOrder.OrderStatus}</td>) : <td style={{ color: 'red' }} >{selectedOrder.OrderStatus}</td>
                                                }
                                                {
                                                    "fulfilledBy" in selectedOrder ? (<td>{selectedOrder.fulfilledBy}</td>) : <td>N/A</td>
                                                }
                                                <td>{selectedOrder.QuantityOrdered}</td>
                                                <td>{selectedOrder.QuantityShipped}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleForTracking}>Okay</Button>
                                </ModalFooter>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    orderData: state.order.orders,
    durationData: state.order.data
})

export default connect(mapStateToProps, { fetchOrders, getOrdersForDuration })(manageOrders);
