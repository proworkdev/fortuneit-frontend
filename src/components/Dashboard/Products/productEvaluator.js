import React, { Component } from 'react'
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { connect } from 'react-redux';
import { fetchProducts } from './../../../actions/productActions';
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap';

class productEvaluator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            infoMessage: true,
            productsArray: [],
            offersData: [],
            modal: false,
            selectedProduct: {},
            asin: '',
            sku: '',
            buyCost: '',
            principal: '',
            shipping: '',
            sample: '',
            misc: '',
            inspection: '',
            referral: '',
            fba: ''
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

    componentDidMount() {
        this.props.fetchProducts();
    }

    toggle = () => {

        const { modal } = this.state;

        this.setState({
            modal: !modal
        })
    }

    evaluateFunction = (id) => {

        const { modal, productsArray } = this.state;

        productsArray.map((product, index) => {
            if (product._id === id) {
                this.props.history.push({
                    pathname: '/evaluate',
                    state: { product: product }
                })
            }
        })

    }

    render() {

        const { productsArray, selectedProduct } = this.state;

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <h4><u>Evaluate your products</u></h4>
                            <br />

                            <Table bordered responsive >
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Seller SKU</th>
                                        <th>ASIN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productsArray.map((product, index) => {
                                            return <tr>
                                                <td>{
                                                    <div>
                                                        {product.ProductDesc}
                                                        <br />
                                                        <br />
                                                        <Button onClick={() => this.evaluateFunction(product._id)} color="success">Evaluate</Button>
                                                    </div>
                                                }</td>
                                                <td>{product.SellerSKU}</td>
                                                <td>{product.ASIN}</td>
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
    products: state.product.products
})

export default connect(mapStateToProps, { fetchProducts })(productEvaluator);
