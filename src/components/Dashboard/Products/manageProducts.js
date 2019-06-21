import React, { Component } from 'react'
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { fetchProducts, checkLowestOffersForInventoryProducts } from './../../../actions/productActions';
import { Alert, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';

class manageProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            infoMessage: true,
            productsArray: [],
            offersData: [],
            modal: false
        }
    }

    componentDidUpdate(prevProps) {

        const { products, offers } = this.props;

        if (products !== prevProps.products) {
            this.setState({ productsArray: products.data })
        }

        if (offers !== prevProps.offers) {
            this.setState({ offersData: offers.data, modal: true })
        }

    }

    onClickFunction = () => {
        this.setState({ infoMessage: false })
    }

    offersFunction = (asin) => {

        const data = {
            asin
        }

        this.props.checkLowestOffersForInventoryProducts(data);

    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    toggle = () => {

        const { modal } = this.state;

        this.setState({
            modal: !modal
        })
    }

    render() {

        const { productsArray, offersData } = this.state;

        console.log('Testing Offers in Render ==> ', offersData);

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        {
                            this.state.infoMessage ? (
                                <div onClick={this.onClickFunction}>
                                    <Alert color="warning">It might take some time to synchronize all your products.</Alert>
                                </div>
                            ) : null
                        }
                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <h4><u>My Products</u></h4>

                            <br />

                            <Table bordered responsive >
                                <thead>
                                    <tr>
                                        <th>Principal</th>
                                        <th>FBA Fees</th>
                                        <th>Referral Fees</th>
                                        <th>Product Added</th>
                                        <th>Seller SKU</th>
                                        <th>ASIN</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        productsArray.map((product, index) => {
                                            return <tr>
                                                {
                                                    product.Principal ? (<td>$ {product.Principal}</td>) :
                                                        <td>N/A</td>
                                                }
                                                {
                                                    product.FBA ? (<td>$ {product.FBA}</td>) :
                                                        <td>N/A</td>
                                                }
                                                {
                                                    product.ReferralFee ? (<td>$ {product.ReferralFee}</td>) :
                                                        <td>N/A</td>
                                                }
                                                <td>{product.PostedDate}</td>
                                                <td>{product.SellerSKU}</td>
                                                <td>{product.ASIN}</td>
                                                <td>{product.ProductDesc}</td>
                                                <Button onClick={() => this.offersFunction(product.ASIN)} color="primary">Lower Price Offers</Button>
                                            </tr>

                                        })
                                    }

                                </tbody>
                            </Table>

                        </div>
                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Lowest Price Offers for selected product</ModalHeader>
                            <ModalBody>
                                <Table size="lg" bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>List Price</th>
                                            <th>IsProductFBA</th>
                                            <th>Item Condition</th>
                                            <th>Availability</th>
                                            <th>Seller Rating</th>
                                            <th>Feedback Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            offersData.map((offer, index) => {
                                                return <tr key={index} >
                                                    <td>{offer.listPrice}</td>
                                                    <td>{offer.isProductFBA}</td>
                                                    <td>{offer.itemCondition}</td>
                                                    <td>{offer.availability}</td>
                                                    <td>{offer.sellerRating}</td>
                                                    <td>{offer.feedbackCount}</td>
                                                </tr>
                                            })
                                        }
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
    products: state.product.products,
    offers: state.product.inventoryOffers
})

export default connect(mapStateToProps, { fetchProducts, checkLowestOffersForInventoryProducts })(manageProducts);
