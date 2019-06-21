import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { getFulfillmentOrders, getFulfillmentDetails } from './../../../actions/fulfillmentActions';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

class fulfillmentOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allFulfillments: [],
            currentPage: 1,
            fulfillmentsPerPage: 10,
            modal: false,
            detailsModal: false,
            addressDetails: {},
            fulfillmentDetailsData: {}
        }
    }

    componentDidMount() {
        this.props.getFulfillmentOrders();
    }

    componentDidUpdate(prevProps) {

        const { fulfillments, fulfillmentDetails } = this.props;

        if (fulfillments !== prevProps.fulfillments) {
            this.setState({ allFulfillments: fulfillments.data })
        }

        if (fulfillmentDetails !== prevProps.fulfillmentDetails) {
            ;
            this.setState({ fulfillmentDetailsData: fulfillmentDetails.data })
        }

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

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    detailsToggle = () => {
        this.setState({ detailsModal: !this.state.detailsModal });
    }

    checkDestination = (orderID) => {

        const { allFulfillments } = this.state;

        allFulfillments.map((fulfillment) => {
            if (fulfillment.AmazonOrderId === orderID) {
                this.setState({ modal: true, addressDetails: fulfillment.DestinationAddress })
            }
        })

    }

    getFulfillmentDetails = (sellerFulfillmentOrderId) => {

        const body = {
            sellerFulfillmentOrderId
        }

        this.props.getFulfillmentDetails(body);

    }

    render() {

        const { allFulfillments, currentPage, fulfillmentsPerPage, addressDetails, fulfillmentDetailsData } = this.state;

        const pageNumbers = [];
        const indexOfLastFulfillment = currentPage * fulfillmentsPerPage;
        const indexOfFirstFulfillment = indexOfLastFulfillment - fulfillmentsPerPage;
        const currentFulfillments = allFulfillments.slice(indexOfFirstFulfillment, indexOfLastFulfillment);

        for (let i = 1; i <= Math.ceil(allFulfillments.length / fulfillmentsPerPage); i++) {
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

        console.log('Fulf details data in render --> ', fulfillmentDetailsData);

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <h4><u>Fulfillment Orders</u></h4>
                            <br />
                            <Table bordered striped >
                                <thead>
                                    <tr>
                                        <th>Amazon Order ID</th>
                                        <th>Order Placed</th>
                                        <th>Shipping Speed</th>
                                        <th>Fulfillment Order Status</th>
                                        <th>Fulfillment Policy</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentFulfillments.map((fulfillment, index) => {
                                            return <tr key={index}>
                                                <td>{fulfillment.AmazonOrderId}</td>
                                                <td>{fulfillment.DisplayableOrderDateTime}</td>
                                                <td>{fulfillment.ShippingSpeedCategory}</td>
                                                <td>{fulfillment.FulfillmentOrderStatus}</td>
                                                <td>{fulfillment.FulfillmentPolicy}</td>
                                                <td>
                                                    <Button onClick={() => this.checkDestination(fulfillment.AmazonOrderId)} color="primary">
                                                        <p style={{ color: '#fff' }}>Destination Address</p>
                                                    </Button>
                                                    <Button onClick={() => this.getFulfillmentDetails(fulfillment.SellerFulfillmentOrderId)} style={{ marginLeft: 20 }} color="danger">Fulfillment Details</Button>
                                                </td>
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

                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Financial Details</ModalHeader>
                            <ModalBody>
                                <Table bordered striped >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State/Province Code</th>
                                            <th>Postal Code</th>
                                            <th>Country Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{addressDetails.Name}</td>
                                            <td>{addressDetails.Line1}</td>
                                            <td>{addressDetails.City}</td>
                                            <td>{addressDetails.StateOrProvinceCode}</td>
                                            <td>{addressDetails.PostalCode}</td>
                                            <td>{addressDetails.CountryCode}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>


                        <Modal size="lg" isOpen={this.state.detailsModal} toggle={this.detailsToggle} className={this.props.className}>
                            <ModalHeader toggle={this.detailsToggle}>Financial Details</ModalHeader>
                            <ModalBody>
                                <Table bordered striped >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State/Province Code</th>
                                            <th>Postal Code</th>
                                            <th>Country Code</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.detailsToggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fulfillments: state.fulfillment.fulfillmentData,
    fulfillmentDetails: state.fulfillment.fulfillmentDetails
})

export default connect(mapStateToProps, { getFulfillmentOrders, getFulfillmentDetails })(fulfillmentOrders)