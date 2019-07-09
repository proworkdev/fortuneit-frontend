import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { getTrackingDetails } from './../../../actions/fulfillmentActions';

class fulfillmentDetails extends Component {

    constructor(props) {

        super(props);

        this.state = {
            detailsData: props.location.state.details,
            trackingObject: {},
            modal: false
        }
    }

    componentDidUpdate(prevProps) {

        const { trackingDetails } = this.props;

        if (trackingDetails !== prevProps.trackingDetails) {
            this.setState({ trackingObject: trackingDetails, modal: true })
        }

    }

    trackOrder = (packageNumber) => {

        const body = {
            packageNumber
        }

        this.props.getTrackingDetails(body);
    }

    toggle = () => {

        const { modal } = this.state;

        this.setState({ modal: !modal });

    }

    render() {

        const { detailsData, trackingObject } = this.state;
        const trackData = Object(trackingObject.details)
        const eventsData = Object(trackData.TrackingEvents);

        // var message = '';
        // if (eventsData.member !== undefined) {
        //     eventsData.member.forEach((item, index) => {
        //         if (item.EventCode === 'EVENT_101') {
        //             message = 'Carrier notified to pick up package.'
        //         } else if (item.EventCode === 'EVENT_102') {
        //             message = "Shipment picked up from seller's facility."
        //         } else if (item.EventCode === 'EVENT_201') {
        //             message = "Arrival scan."
        //         } else if (item.EventCode === 'EVENT_202') {
        //             message = "Departure scan."
        //         } else if (item.EventCode === 'EVENT_203') {
        //             message = "Arrived at destination country."
        //         } else if (item.EventCode === 'EVENT_204') {
        //             message = "Initiated customs clearance process."
        //         } else if (item.EventCode === 'EVENT_205') {
        //             message = "Completed customs clearance process."
        //         } else if (item.EventCode === 'EVENT_206') {
        //             message = "In transit to pickup location."
        //         } else if (item.EventCode === 'EVENT_301') {
        //             message = "Delivered."
        //         } else if (item.EventCode === 'EVENT_302') {
        //             message = "Out for delivery."
        //         } else if (item.EventCode === 'EVENT_304') {
        //             message = "Delivery attempted."
        //         } else if (item.EventCode === 'EVENT_306') {
        //             message = "Customer contacted to arrange delivery."
        //         } else if (item.EventCode === 'EVENT_307') {
        //             message = "Delivery appointment scheduled."
        //         } else if (item.EventCode === 'EVENT_308') {
        //             message = "Available for pickup."
        //         } else if (item.EventCode === 'EVENT_309') {
        //             message = "Returned to seller."
        //         } else if (item.EventCode === 'EVENT_401') {
        //             message = "Held by carrier - incorrect address."
        //         } else if (item.EventCode === 'EVENT_402') {
        //             message = "Customs clearance delay."
        //         } else if (item.EventCode === 'EVENT_403') {
        //             message = "Customer moved."
        //         } else if (item.EventCode === 'EVENT_404 ') {
        //             message = "Delay in delivery due to external factors."
        //         } else if (item.EventCode === 'EVENT_405') {
        //             message = "Shipment damaged."
        //         } else if (item.EventCode === 'EVENT_406') {
        //             message = "Held by carrier."
        //         } else if (item.EventCode === 'EVENT_407') {
        //             message = "Customer refused delivery."
        //         } else if (item.EventCode === 'EVENT_408') {
        //             message = "Returning to seller."
        //         } else if (item.EventCode === 'EVENT_409') {
        //             message = "Lost by carrier."
        //         } else if (item.EventCode === 'EVENT_411') {
        //             message = "Paperwork received - did not receive shipment."
        //         } else if (item.EventCode === 'EVENT_412 ') {
        //             message = "Shipment received- did not receive paperwork."
        //         } else if (item.EventCode === 'EVENT_413') {
        //             message = "Held by carrier- customer refused shipment due to customs charges."
        //         } else if (item.EventCode === 'EVENT_414') {
        //             message = "Missorted by carrier."
        //         } else if (item.EventCode === 'EVENT_415 ') {
        //             message = "Received from prior carrier."
        //         } else if (item.EventCode === 'EVENT_416') {
        //             message = "Undeliverable."
        //         } else if (item.EventCode === 'EVENT_417') {
        //             message = "Shipment missorted."
        //         } else if (item.EventCode === 'EVENT_418') {
        //             message = "Shipment delayed."
        //         } else if (item.EventCode === 'EVENT_419') {
        //             message = "Address corrected - delivery rescheduled."
        //         }
        // })
        // }

        return (

            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <h4><u>Fulfillment Details</u></h4>
                            <br />

                            <Table bordered striped >
                                <thead>
                                    <tr>
                                        <th>Amazon Shipment ID</th>
                                        <th>Shipping Date</th>
                                        <th>Estimated Arrival</th>
                                        <th>Shipping Status</th>
                                        <th>Center ID</th>
                                        <th>Seller SKU</th>
                                        <th>Order Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{detailsData.AmazonShipmentId}</td>
                                        <td>{detailsData.ShippingDateTime}</td>
                                        <td>{detailsData.EstimatedArrivalDateTime}</td>
                                        <td>{detailsData.FulfillmentShipmentStatus}</td>
                                        <td>{detailsData.FulfillmentCenterId}</td>
                                        <td>{detailsData.FulfillmentShipmentItem.member.SellerSKU}</td>
                                        <td>{detailsData.FulfillmentShipmentItem.member.Quantity}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div style={{ backgroundColor: 'powderblue', marginTop: 20 }}>
                                <Button onClick={() => this.trackOrder(detailsData.FulfillmentShipmentPackage.member.PackageNumber)} color="primary" block>Track Order</Button>
                            </div>

                        </div>

                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}><u>Tracking Details</u></ModalHeader>
                            <ModalBody>
                                <Table bordered striped >
                                    <thead>
                                        <tr>
                                            <th>Tracking Number</th>
                                            <th>Carrier Code</th>
                                            <th>Current Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{trackData.TrackingNumber}</td>
                                            <td>{trackData.CarrierCode}</td>
                                            {
                                                trackData.CurrentStatus === 'DELIVERED'
                                                    ? (
                                                        <td style={{ color: 'green' }}>{trackData.CurrentStatus}</td>
                                                    ) :
                                                    <td>{trackData.CurrentStatus}</td>
                                            }
                                        </tr>
                                    </tbody>
                                </Table>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    trackingDetails: state.fulfillment.trackingData
})

export default connect(mapStateToProps, { getTrackingDetails })(fulfillmentDetails)
