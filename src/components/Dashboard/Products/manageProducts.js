import React, { Component } from 'react'
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { fetchProducts, checkLowestOffersForInventoryProducts } from './../../../actions/productActions';
import { Alert, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
// import Pagination from "react-js-pagination";
// require("bootstrap/css/bootstrap.css");

class manageProducts extends Component {

    constructor(props) {

        super(props);

        this.state = {
            infoMessage: true,
            productsArray: [],
            offersData: [],
            modal: false,
            currentPage: 1,
            productsPerPage: 10,
            activePage: 15
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

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
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

        const { productsArray, offersData, currentPage, productsPerPage } = this.state;

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = productsArray.slice(indexOfFirstProduct, indexOfLastProduct);

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(productsArray.length / productsPerPage); i++) {
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

        // const renderProducts = productsArray.map((product, index) => {

        //     let newDate = new Date(product.PostedDate);

        //     console.log('Testing New Date ==> ', newDate.getUTCDay());

        //     return <tr key={index}>
        //         {
        //             product.Principal ? (<td>$ {product.Principal}</td>) :
        //                 <td>N/A</td>
        //         }
        //     </tr>
        // })

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

                            <Table bordered responsive>

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

                                    {/* {renderProducts} */}

                                    {
                                        currentProducts.map((product, index) => {
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
                                                <td>
                                                    {
                                                        product.PostedDate
                                                    }
                                                </td>
                                                <td>{product.SellerSKU}</td>
                                                <td>{product.ASIN}</td>
                                                <td>{product.ProductDesc}</td>
                                                <Button onClick={() => this.offersFunction(product.ASIN)} color="primary">Lower Price Offers</Button>
                                            </tr>
                                        })
                                    }

                                </tbody>

                            </Table>

                            <center>

                                {/* <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={450}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange}
                                /> */}

                                <ul className="pagination">
                                    {renderPageNumbers}
                                </ul>

                            </center>

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
