import React, { Component } from 'react'
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { checkProductFees } from './../../../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { connect } from 'react-redux';

class productFees extends Component {

    constructor(props) {
        super(props);

        this.state = {
            principal: '',
            shipping: '',
            sellerSku: '',
            referral: '',
            fba: '',
            totalFee: '',
            feeData: {},
            modal: false,
        }
    }

    componentDidUpdate(prevProps) {

        const { fees } = this.props;

        if (fees !== prevProps.fees) {
            this.setState({
                referral: fees.data.ref_fee,
                fba: fees.data.fba_fee,
                totalFee: parseFloat(fees.data.ref_fee) + parseFloat(fees.data.fba_fee),
                modal: true
            })
        }

    }

    toggle = () => {

        this.setState({
            modal: !this.state.modal
        })

    }

    onChangeFunction = (e) => {

        this.setState({ [e.target.name]: e.target.value });

    }

    onSubmitFunction = (e) => {

        e.preventDefault();

        const { principal, shipping, sellerSku } = this.state;

        const body = {
            principal,
            shipping,
            sellerSku
        }

        this.props.checkProductFees(body);

    }

    render() {

        const { sellerSku, principal, shipping, referral, fba, totalFee } = this.state;

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <div className="page-top-action">
                                <div className="left-action">
                                    <div className="title">Check Fees</div>
                                </div>
                            </div>


                            <div className="colum-panel">

                                <form className="form">
                                    <div className="email-message">

                                    </div>

                                    <div className="input-form">
                                        <div className="label">Seller SKU</div>
                                        <div className="input-field">
                                            <input name="sellerSku" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <div className="label">Principal</div>
                                        <div className="input-field">
                                            <input name="principal" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="input-form">
                                        <div className="label">Shipping Charges</div>
                                        <div className="input-field">
                                            <input name="shipping" onChange={this.onChangeFunction} className="form-control" type="text" />
                                        </div>
                                    </div>

                                    <br />

                                    <Button color="warning" block className="submit-btn" onClick={this.onSubmitFunction}>
                                        <p style={{ color: '#fff' }}>Submit</p>
                                    </Button>

                                </form>

                            </div>

                            <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Fee Details</ModalHeader>
                                <ModalBody>
                                    <Table bordered >
                                        <thead>
                                            <tr>
                                                <th>Seller SKU</th>
                                                <th>Principal</th>
                                                <th>Shipping Charges</th>
                                                <th>FBA Fee</th>
                                                <th>Referral Fee</th>
                                                <th>Total Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{sellerSku}</td>
                                                <td>$ {principal}</td>
                                                <td>$ {shipping}</td>
                                                <td>$ {fba}</td>
                                                <td>$ {referral}</td>
                                                <td>$ {totalFee}</td>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fees: state.product.feesData
})

export default connect(mapStateToProps, { checkProductFees })(productFees)
