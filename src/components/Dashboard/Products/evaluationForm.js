import React, { Component } from 'react';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { evaluateProduct } from './../../../actions/productActions';
import { connect } from 'react-redux';
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
    Input
} from 'reactstrap';

class evaluationForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            asin: props.location.state.product.ASIN,
            sku: props.location.state.product.SellerSKU,
            principal: props.location.state.product.Principal,
            shipping: props.location.state.product.ShippingCharge,
            quantity: props.location.state.product.Units,
            referral: props.location.state.product.ReferralFee,
            fba: props.location.state.product.FBA,
            buyCost: null,
            sample: null,
            setup: null,
            misc: null,
            inspection: null,
            priceData: {},
            modal: false,
            errorMessage: null
        }
    }

    componentDidUpdate(prevProps) {

        const { result, errorData } = this.props;

        if (result !== prevProps.result) {
            this.setState({ priceData: result.prices, modal: true, errorMessage: null })
        }

        if (errorData !== prevProps.errorData) {
            this.setState({ errorMessage: errorData.data.message })
            window.scrollTo(0, 0);
        }

    }

    onChangeFunction = (e) => {

        const { errorMessage } = this.state;

        if (errorMessage !== null) {
            this.setState({ errorMessage: null })
        }

        this.setState({ [e.target.name]: e.target.value })
    }

    onClickFunction = (e) => {

        e.preventDefault();

        const { sku, principal, shipping, quantity, referral, fba, buyCost, sample, setup, misc, inspection } = this.state;

        if (buyCost === null || principal === null || shipping === null || quantity === null) {
            this.setState({
                errorMessage: 'All fields marked with asterisk(*) are mandatory.'
            })
            window.scrollTo(0, 0);
        } else {

            const body = {
                sku,
                principal,
                shipping,
                quantity,
                referral,
                fba,
                buyCost,
                sample,
                setup,
                misc,
                inspection
            }

            this.props.evaluateProduct(body);
        }
    }

    toggle = () => {

        const { modal } = this.state;

        this.setState({
            modal: !modal
        })
    }

    render() {

        const { asin, sku, quantity, principal, shipping, referral, fba, priceData } = this.state;

        return (
            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <h4><u>Enter Product Fields</u></h4>

                            <br />

                            {
                                this.state.errorMessage ? (
                                    <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                                ) : null
                            }

                            <Form>

                                <FormGroup>
                                    <Label>ASIN</Label>
                                    <Input onChange={this.onChangeFunction} type="text" disabled name="asin" value={asin} placeholder="ASIN" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Seller SKU</Label>
                                    <Input onChange={this.onChangeFunction} type="text" disabled name="sku" value={sku} placeholder="Seller SKU" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>*Buy Cost</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="buyCost" placeholder="Enter Buycost" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>*Shipping Charges</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="shipping" value={shipping} placeholder="Enter Shipping Charges" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>*Quantity</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="quantity" value={quantity} placeholder="Enter Quantity" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Sample Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="sample" placeholder="Enter Sample Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Setup Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="setup" placeholder="Enter Setup Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Misc Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="misc" placeholder="Enter Misc Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Inspection Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="inspection" placeholder="Enter Inspection Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Referral Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="referral" value={referral} placeholder="Enter Referral Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>FBA Fee</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="fba" value={fba} placeholder="Enter FBA Fee" />
                                </FormGroup>

                                <FormGroup>
                                    <Label>*Selling Price</Label>
                                    <Input onChange={this.onChangeFunction} type="text" name="principal" value={principal} placeholder="Enter Principal" />
                                </FormGroup>

                            </Form>

                            <Button onClick={this.onClickFunction} block color="warning"><p style={{ color: '#fff' }}>Check</p></Button>

                        </div>

                        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Product Evaluation</ModalHeader>
                            <ModalBody>
                                <Table size="lg" bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>Buy Cost</th>
                                            <th>Order & Staging Cost</th>
                                            <th>Shipping Total</th>
                                            <th>Landed Order Cost</th>
                                            <th>Landed Average Cost</th>
                                            <th>Fulfilled Unit Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>$ {priceData.netCost}</td>
                                            <td>$ {priceData.orderAndStaging}</td>
                                            <td>$ {priceData.shippingTotal}</td>
                                            <td>$ {priceData.landedOrder}</td>
                                            <td>$ {priceData.landedAverage}</td>
                                            <td>$ {priceData.fulfilledUnitCost}</td>
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
    errorData: state.product.error,
    result: state.product.evaluationData
})

export default connect(mapStateToProps, { evaluateProduct })(evaluationForm)
