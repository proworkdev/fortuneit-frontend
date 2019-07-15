import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Alert,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table
} from 'reactstrap';
import { connect } from 'react-redux';
import { productFinderFunction, checkLowestPrices } from './../../../actions/productActions';
import logo from './../../../material/images/logo.png';
import 'react-table/react-table.css';
import { MDBDataTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class productFinder extends Component {

    constructor(props) {

        let userData = JSON.parse(sessionStorage.getItem('loginState'));

        super(props);

        this.state = {
            searchQuery: '',
            email: userData.user.email,
            productsArray: [],
            offersArray: [],
            errorMessage: null,
            isLoading: false,
            showData: null,
            modal: false,
            currentPage: 1,
            productsPerPage: 5
        }
    }

    componentDidUpdate(prevProps) {

        const { products, offers } = this.props;

        if (products !== prevProps.products) {

            if (products.success === true) {
                this.setState({ productsArray: products.data, errorMessage: null, isLoading: false, showData: true })
            } else {
                this.setState({ errorMessage: products.message, isLoading: false, showData: false })
            }

        }


        if (offers !== prevProps.offers) {
            if (offers.done === true) {
                this.setState({ offersArray: offers.data })
            } else {
                this.setState({ errorMessage: offers.message })
            }
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

    handleKeyPress = (event) => {

        if (event.key == 'Enter') {

            this.onClickFunction();

        }

    }

    handleInputChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });

        const { errorMessage } = this.state;

        if (errorMessage !== null) {
            this.setState({ errorMessage: null });
        }

    }

    onClickFunction = (e) => {

        this.setState({ isLoading: true });

        const { searchQuery, email } = this.state;

        const data = {
            searchQuery,
            email
        }

        this.props.productFinderFunction(data);

    }

    checkLowestPrices = (asin) => {

        this.toggle();

        const data = {
            asin
        }

        this.props.checkLowestPrices(data);

    }

    render() {

        const { productsArray, offersArray, currentPage, productsPerPage } = this.state;

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = productsArray.slice(indexOfFirstProduct, indexOfLastProduct);

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(productsArray.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        const modalData = {
            columns: [
                {
                    label: 'List Price'
                },
                {
                    label: 'Shipping Charges'
                },
                {
                    label: 'IsProductFBA'
                },
                {
                    label: 'Item Condition'
                },
                {
                    label: 'Availability'
                },
                {
                    label: 'Minimum Hours Taken'
                },
                {
                    label: 'Max Hours Taken'
                },
                {
                    label: 'Seller Rating'
                },
                {
                    label: 'Feedback Count'
                }
            ],
            rows: offersArray
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
                            this.state.isLoading ? (
                                <div style={{
                                    textAlign: 'center',
                                    marginTop: 250
                                }}>
                                    <img src={logo} className="rotate" alt="Loader" />
                                </div>

                            ) : <div className="inner-panel">

                                    <h4>Product Finder</h4>

                                    <br />

                                    {
                                        this.state.errorMessage ? (
                                            <Alert color="danger">{this.state.errorMessage}</Alert>
                                        ) : null
                                    }

                                    <InputGroup>

                                        <InputGroupAddon addonType="append">

                                            <Button onClick={this.onClickFunction} color="warning">
                                                <p style={{ color: '#fff' }}>Search</p>
                                            </Button>

                                        </InputGroupAddon>

                                        <Input
                                            onKeyPress={this.handleKeyPress}
                                            name="searchQuery"
                                            value={this.state.searchQuery}
                                            onChange={this.handleInputChange}
                                        />

                                    </InputGroup>

                                    <br />

                                    <div>

                                        {
                                            this.state.showData ? (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Brand</th>
                                                            <th>ASIN</th>
                                                            <th>Color</th>
                                                            <th>Model</th>
                                                            <th>Size</th>
                                                            <th>Description</th>
                                                            <th>Seller Rank</th>
                                                            <th>Price</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            currentProducts.map((products, index) => {
                                                                return <tr key={index}>
                                                                    <td>{<img style={{ width: 120 }} src={products.image} />}</td>
                                                                    <td>{products.brand}</td>
                                                                    <td>{products.asin}</td>
                                                                    <td>{products.color}</td>
                                                                    <td>{products.model}</td>
                                                                    <td>{products.size}</td>
                                                                    <td>{products.description}</td>
                                                                    <td>{products.rank}</td>
                                                                    <td>{products.price}</td>
                                                                    <Button onClick={() => this.checkLowestPrices(products.asin)} color="primary" ><p style={{ color: '#fff' }}>Lower Price Offers</p></Button>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            ) : null
                                        }

                                        <center>

                                            <ul className="pagination">
                                                {renderPageNumbers}
                                            </ul>

                                        </center>

                                    </div>

                                </div>
                        }

                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className="my-modalclass">

                            <ModalHeader className="my-modalclass-header">
                                <p style={{ color: '#fff' }}>Lowest price offers</p>
                                <button onClick={this.toggle} type="button" className="close" data-dismiss="modal">×</button>
                            </ModalHeader>

                            <ModalBody>
                                {
                                    <MDBDataTable
                                        data={modalData}
                                    />
                                }

                            </ModalBody>

                            <ModalFooter>

                                <Button onClick={this.toggle} color="warning">
                                    <p style={{ color: '#fff' }}>Done</p>
                                </Button>

                            </ModalFooter>

                        </Modal>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.data,
    offers: state.product.offers
})

export default connect(mapStateToProps, { productFinderFunction, checkLowestPrices })(productFinder)