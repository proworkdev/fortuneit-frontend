import React, { Component } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import Styles from './Wizard/Styles';
import { Field } from 'react-final-form';
import Wizard from './Wizard/Wizard';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { productWizard, fetchProducts } from './../../../actions/productActions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { func } from 'prop-types';

const Error = ({ name }) => (
    <Field

        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
)

const required = value => (value ? undefined : 'This field is mandatory.')
class addNewProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productsList: [],
            modal: false,
            wizardCalculations: {},
            newArr:[],
        }
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    componentDidUpdate(prevProps) {

        const { products, data } = this.props;

        if (products !== prevProps.products) {
            this.setState({ productsList: products.data })
        }

        if (data !== prevProps.data) {
            this.setState({
                wizardCalculations: data.wizardData,
                modal: true
            })
        }

    }

    onSubmitData = (values) => {

        const body = {
            asin: values.asin,
            name: values.productName,
            desc: values.productDesc,
            link: values.webLink,
            contact: values.sellerContact,
            quantity: values.productQuantity,
            productCost: values.buyCost,
            sample: values.sampleFee,
            setup: values.setupFee,
            inspection: values.inspectionFee,
            misc: values.miscellaneousFee,
            shippingMethod: values.shippingMethod,
            shippingCost: values.shippingCost,
            miscShippingFee: values.miscShippingFee,
            listingServiceFee: values.listingServiceFee,
            salePrice: values.salePrice,
            targetNetProfitMargin: values.targetNetProfitMargin,
            referral: values.referralFee,
            fba: values.fbaFee,
            salesTarget: values.salesTarget
        }

        this.props.productWizard(body);
    }


    toggle = () => {

        const { modal } = this.state;

        this.setState({ modal: !modal })

    }
    handleChange = (e) => {
        var dummy = document.getElementById("mySelect");
        var value = dummy.options[dummy.selectedIndex].value;
        this.setState({ newArr: this.state.productsList[value] })

        console.log("dummy123123123--->>>", this.state.productsList[value])
        console.log("value--->>", e.target.value)
        this.setState({ selectedValue: e.target.value })

    }

        ;
    render() {
 
 
        const { productsList, wizardCalculations } = this.state;

        const renderProducts = productsList.map((prod) => {
            //  this.setState({Cvalue:Prod.ASIN})
            console.log("curentvalue=====>>>,", prod.ASIN)

            return (<select id="selected" >
                {/* <option value={prod.ASIN}>{prod.ASIN}, {prod.ProductDesc}</option> */}
                <option value="option1">Option1</option>
            </select>)

        })
        if (wizardCalculations) {

            console.log('Calculations test in render ==> ', wizardCalculations);

        }
        if (this.state.newArr) {
            console.log("thisstate=--==>>>",this.state.newArr.ProductName)
        }

        console.log("ProductList Data>>>>>>> ", productsList)

        return (

            <div>

                <div className="main-panel">

                    <SidebarComponent propData={this.props} />

                    <div className="page-container">

                        <HeaderComponent propData={this.props} />

                        <div className="inner-panel">

                            <h4><u></u></h4>

                            <br />

                            <Wizard
                                onSubmit={this.onSubmitData}
                            >

                                <Wizard.Page>
                                    <div>
                                        <h4><u>General Info</u></h4> <br />
                                        <label><b>ASIN</b></label>
                                        <br />
                                        { this.state.newArr.ASIN  && this.state.newArr.ASIN ?  <Field
                                            
                                            initialValue={this.state.newArr.ASIN}
                                            name="asin"
                                            component="input"
                                            type="text"
                                            placeholder="Enter ASIN"
                                            validate={required}
                                        ></Field> : 
                                        <Field
                                        name="asin"
                                            component="input"
                                            type="text"
                                            placeholder="Enter ASIN"
                                            validate={required}
                                         ></Field>  
                                        } 
                                        <img src="images/info-part.png" className="info-names" title="ASIN is Amazon Standard Identification Number. It’s used for product identification within Amazon.com organization." />
                                        <Error name="asin" />
                                        <br />
                                        <br />
                                        <h5>OR</h5>
                                        <br />
                                        <div>
                                            <label><b>Select a product from inventory</b></label><br />
                                            <select id="mySelect" onChange={this.handleChange} >
                                                {productsList.map((item, index) =>
                                                    <option key={item} value={index} >{item.ASIN + item.ProductDesc} </option>
                                                )}

                                            </select>
                                            {/* <Field name="asin" component="select"  >
                                          
                                            </Field> */}
                                            <Error name="asin" />
                                            <br /> <br />
                                           
                                        </div>
                                        <label><b>Product Name</b></label> <br />
                                       { this.state.newArr.ProductName  && this.state.newArr.ProductName ?  <Field
                                           initialValue ={this.state.newArr.ProductName}
                                            name="productName"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Product Name"
                                            validate={required}
                                        ></Field> :
                                        <Field
                                        value={"testname"}
                                        name="productName"
                                        component="input"
                                        type="text"
                                        placeholder="Enter Product Name"
                                        validate={required}
                                    ></Field> 
                                        }
                                        <img src="images/info-part.png" className="info-names" title="Please set a title for your product." />
                                        <br /> <br />
                                        <label><b>Product Description</b></label><br />
                                        {this.state.newArr.ProductDesc && this.state.newArr.ProductDesc ?  <Field
                                         
                                         initialValue ={this.state.newArr.ProductDesc}
                                            name="productDesc"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Product Description"
                                            validate={required}
                                        ></Field> :
                                        <Field
                                        name="productDesc"
                                        component="input"
                                        type="text"
                                        placeholder="Enter Product Description"
                                        validate={required}
                                        ></Field>
                                        } 
                                        <img src="images/info-part.png" className="info-names" title="Please write a short description about the product you need to add." />
                                        <br /> <br />
                                        <label><b>Quantity</b></label> <br />
                                        {this.state.newArr.AvailableQuantity && this .state.newArr.AvailableQuantity ?
                                        <Field
                                            initialValue ={this.state.newArr.AvailableQuantity}
                                            name="productQuantity"
                                            component="input"
                                            type="number"
                                            placeholder="Enter product Quantity"
                                            validate={required}
                                        ></Field> :
                                        <Field
                                        name="productQuantity"
                                            component="input"
                                            type="number"
                                            placeholder="Enter product Quantity"
                                            validate={required}
                                            ></Field>
                                        }   
                                        <img src="images/info-part.png" className="info-names" title="Please enter the quanttty of the product you've at the moment. This also helps Amazon to keep a stock." />
                                        <Error name="productQuantity" />
                                        <br /><br />

                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <h4><u>Contact Information</u></h4><br />
                                    <label><b>Contact</b></label> <br />
                                    <Field
                                        name="sellerContact"
                                        component="input"
                                        type="number"
                                        placeholder="Enter Contact"
                                        validate={required}
                                    /><img src="images/info-part.png" className="info-names" title="Please enter you contact number" />
                                    <Error name="sellerContact" /> <br /> <br />

                                    <label><b>Website Link</b></label> <br />
                                    <Field
                                        name="webLink"
                                        component="input"
                                        type="text"
                                        placeholder="Enter your website's link"
                                        validate={required}
                                    />
                                    <img src="images/info-part.png" className="info-names" title="Please enter the link of your website" />
                                    <Error name="webLink" />

                                    <div>

                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Manufacturing</u></h4><br />
                                        <label> <b>Sample fee</b></label>

                                        <br />

                                        <Field
                                            name="sampleFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Sample fee"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="SamplesFee is for single product which are sent from a manufacturer or supplier " />
                                        <br /><br />

                                        <label><b>Setup Fee</b></label><br />

                                        <Field
                                            name="setupFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Setup Fee "
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Setup fee is an additional charge that covers the cost of setting up an account." />
                                        <br /> <br />

                                        <label><b>Inspection Fee</b></label><br />

                                        <Field
                                            name="inspectionFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter Inspection Fee"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Fee charged for subsequent inspection or test of an installation " />
                                        <br /> <br />

                                        <label><b>MISC Fee</b></label>

                                        <br />
                                        <Field
                                            name="miscellaneousFee"
                                            component="input"
                                            type="text"
                                            placeholder="Enter MISC Fee"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Fee charges by amazon for the replacement of Product" />
                                        <Error name="asin" />
                                        <br /> <br />

                                        <label><b>Unit Price</b></label><br />
                                        <Field
                                            name="buyCost"
                                            component="input"
                                            type="number"
                                            placeholder="Enter purchase cost"
                                            validate={required}
                                        />
                                        <img src="images/info-part.png" className="info-names" title="Buycost of items in your inventory" />
                                        <Error name="buyCost" />
                                    </div>

                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Shipping</u></h4><br />

                                        <label><b>Shipping Method</b></label><br />
                                        <Field name="shippingMethod" component="select">
                                            <option />
                                            <option value="land">Land</option>
                                            <option value="sea">Sea</option>
                                            <option value="air">Air</option>
                                        </Field>
                                        <img src="images/info-part.png" className="info-names" title=" Select a Shipment method " />
                                        <br /> <br />

                                        <label><b>Shipping Cost</b></label> <br />
                                        <Field
                                            name="shippingCost"
                                            component="input"
                                            type="number"
                                            placeholder="Enter Shipping Cost"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Shipping Cost inculde the charges incurred to deliever goods to desired location." />
                                        <br /> <br />
                                        <label><b>Miscellaneous Shipping Fee</b></label> <br />
                                        <Field
                                            name="miscShippingFee"
                                            component="input"
                                            type="number"
                                            placeholder="Enter Miscellaneous Shipping Cost"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Miscellaneous charges can include freight, set up, insurance, and a variety of other costs incurred to deliver purchased goods to a location" />
                                        <Error name="miscShippingFee" />
                                    </div>

                                </Wizard.Page>
                                <Wizard.Page>
                                    <h4><u>Stagging</u></h4><br />
                                    <div>
                                        <label><b>Listing Services</b></label> <br />
                                        <Field
                                            name="listingServiceFee"
                                            component="input"
                                            type="number"
                                            placeholder="Enter listing Service Fee"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="Stagging fee(photography/copy/launch)" />
                                        <Error name="listingServiceFee" />
                                        <br /> <br />
                                    </div>
                                </Wizard.Page>
                                <Wizard.Page>
                                    <div>
                                        <h4><u>Fulfilment By Amazon</u></h4><br />
                                        <div>
                                            <label> <b>Referral Fee </b></label> <br />
                                            {this.state.newArr.ReferralFee && this.state.newArr.ReferralFee ? <Field
             
                                            initialValue ={this.state.newArr.ReferralFee}
                                                name="referralFee"
                                                component="input"
                                                type="number"
                                                placeholder="Enter Referral Fee"
                                                validate={required}
                                            ></Field> : 
                                            <Field
                                            name="referralFee"
                                                component="input"
                                                type="number"
                                                placeholder="Enter Referral Fee"
                                                validate={required}

                                           ></Field>
                                            }
                                            <img src="images/info-part.png" className="info-names" title="Amazon referral fees are based on product category.Items in several categories have a per-item minimum referral fee" />
                                            <Error name="referralFee" />
                                            <br /> <br />
                                            <label> <b>FBA Fee</b></label> <br />
                                            {this.state.newArr.FBA && this.state.newArr.FBA ? <Field

                                                initialValue ={this.state.newArr.FBA}
                                                name="fbaFee"
                                                component="input"
                                                type="number"
                                                placeholder="Enter FBA Fee"
                                                validate={required}
                                            ></Field> :
                                            <Field
                                            name="fbaFee"
                                            component="input"
                                            type="number"
                                            placeholder="Enter FBA Fee"
                                            validate={required}

                                            ></Field>
                                            }
                                            <img src="images/info-part.png" className="info-names" title="FBA Fee are fees based on product dimensions and weight." />
                                            <Error name="fbaFee" />
                                            <br /> <br />

                                            <label><b>Sales Price</b></label> <br />
                                            <Field
                                                name="salePrice"
                                                component="input"
                                                type="number"
                                                placeholder="Enter Sale Price"
                                                validate={required}
                                            /><img src="images/info-part.png" className="info-names" title="Price of an item to be sold" />
                                            <br /> <br />

                                        </div>
                                    </div>

                                </Wizard.Page>

                                <Wizard.Page>
                                    <div>
                                        <h4><u>Profitability</u></h4><br />

                                        <label><b>Target Net Profit Margin</b></label> <br />
                                        <Field
                                            name="targetNetProfitMargin"
                                            component="input"
                                            type="number"
                                            placeholder="Enter target net profit margin"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="It depends on what you are selling and what the target." />
                                        <br /> <br />
                                        <label><b>Monthly Sales Target</b></label> <br />
                                        <Field
                                            name="salesTarget"
                                            component="input"
                                            type="number"
                                            placeholder="Enter monthly sales target"
                                            validate={required}
                                        /><img src="images/info-part.png" className="info-names" title="It includes target of Sales from month to month" />
                                        <Error name="salesTarget" />

                                    </div>

                                </Wizard.Page>

                            </Wizard>

                        </div>
                        <Modal size="lg" isOpen={this.state.modal && wizardCalculations} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}><u>Evaluator</u></ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="left-part">
                                        <h4 className="top-name"><b><u>General Info</u></b></h4><br />
                                        <div>
                                            <label><b>ASIN </b></label>
                                            <span>{wizardCalculations.asin}</span><br />
                                            <label><b>Product Name </b></label>
                                            <span>{wizardCalculations.name}</span><br/>
                                            <label><b>Contact number</b></label>
                                            <span>{wizardCalculations.contact}</span><br/>
                                            <label><b>Website Link</b></label>
                                            <span>{wizardCalculations.link}</span>

                                        </div><br /><br /><br /><br /><br />
                                        <div>
                                            <h4 className="top-name"><b><u>Manufacturing</u></b></h4><br />
                                            <label><img src="images/info-part.png" className="info-names" title="This is the total price for each product in your order." /><b>Order Total </b></label>
                                            <span>${wizardCalculations.orderSubTotal}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="Manufacturing cost is the sum of costs of all resources consumed in the process of making a product"/><b>Manufacturing Fee </b></label>
                                            <span>${wizardCalculations.manufacturingFee}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="The total manufacturing cost is the total expense incurred by a firm's production process during a given period" /><b>Manufacturing Total </b></label>
                                            <span>${wizardCalculations.manufacturingTotal}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="Buycost of an item in your inventory." /><b>Unit Price </b></label>
                                            <span>${wizardCalculations.productCost}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="Setup fee is an additional charge that covers the cost of setting up an account." /><b>setup Fee </b></label>
                                            <span>${wizardCalculations.setup}</span><br /> <br /> <br /> <br /> <br /> <br />
                                        </div>

                                        <div>
                                            <h4 className="top-name"><b><u>Shipping</u></b></h4><br />
                                            <label><img src="images/info-part.png" className="info-names" title="It includes handling charges on a particular order,based on quantity and per unit shipment fee." /><b>Estimated Shipping fee per order </b></label>
                                            <span>${wizardCalculations.totalShippingCostForAllOrders}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="Order Total shipping  calculates fees based on the total cost of the shippable products in the cart" /><b>Shipping Total </b></label>
                                            <span>${wizardCalculations.shippingTotal}</span><br />
                                            <label><img src="images/info-part.png" className="info-names" title="Total cost on each shippable product" /><b>Shipping Total Per Unit </b></label>
                                            <span>${wizardCalculations.shippingTotalPerUnit}</span><br /><br /><br />
                                        </div>

                                    </div>

                                    <div className="right-part"></div>
                                    <div className="ryt-part">
                                        <h4 className="top-name"><b><u>Fulfillment By Amazon</u></b></h4><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Amazon referral fees are based on product category.Items in several categories have a per-item minimum referral fee" /><b>Referal Fee </b></label>
                                        <span>${wizardCalculations.referral}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Miscellaneous charges can include freight, set up, insurance." /><b>MISC Fee </b></label>
                                        <span>${wizardCalculations.misc}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="It is the sum of all the warehousing expenses,including putting away & storing for all orders." /><b>Fulfilment Charges Per Order </b></label>
                                        <span>${wizardCalculations.fulfillmentChargesPerOrder}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="It is the sum of all the warehousing expenses,including putting away & storing of product." /><b>Fulfillment charges per unit </b></label>
                                        <span>${wizardCalculations.fulfillmentChargesPerUnit}</span>
                                        <label><img src="images/info-part.png" className="info-names" title="Total delievered cost on a single product,Landed cost per unit/Quantity" /><b>Landed Cost Per Unit </b></label>
                                        <span>${wizardCalculations.landedCostPerUnit}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Total delievered cost on  all orders" /><b>Landed Cost Per Order </b></label>
                                        <span>${wizardCalculations.landedCostPerOrder}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Price of an item to be sold" /><b>Suggested Sales Price </b></label>
                                        <span>${wizardCalculations.suggestedSalesPrice}</span><br /> <br />
                                    </div>

                                    <div className="ryt-part">
                                        <h4 className="top-name"><b><u>Profitability</u></b></h4><br />
                                        <label><img src="images/info-part.png" className="info-names" title=" Ads drive sales helps owners focus their advertising budgets" /><b>Estimated Pre Ad Profit Per Sale </b></label>
                                        <span>${wizardCalculations.estimatedPreAdProfitPerSale}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Net profit margin is equal to how much net income or profit is generated as a percentage of revenue" /><b>Net Profit Margin </b></label>
                                        <span>${wizardCalculations.netProfitmargin}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Cost of goods sold,For calculating we match the cost of the product over the sales of the product." /><b>COGS Per Order </b></label>
                                        <span>${wizardCalculations.cogsPerOrder}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title=" ads drive sales helps owners focus their advertising budgets" /><b>Estimated Pre Ad Profit Per Order </b></label>
                                        <span>${wizardCalculations.estimatedPreAdProfitPerOrder}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Advertising cost of Sales." /><b>Breakeven ACoS Est Pre-APPS </b></label>
                                        <span>${wizardCalculations.breakevenAcosBasedOnEstimatedPreApps}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Monthly profit,based on monthly sales target & est pre add profit/sale" /><b>Estimated net profit monthly </b></label>
                                        <span>${wizardCalculations.estimatedNetProfitMonth}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Revenue is a measurement of the amount of money generated each time a customer visits your website" /><b>Estimated Revenue Per Order </b></label>
                                        <span>${wizardCalculations.estimatedRevenuePerOrder}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Dollar amount of revenue at which a business earns a profit of zero." /><b>SalesToBreakeven </b></label>
                                        <span>${wizardCalculations.salesToBreakeven}</span><br />
                                        <label><img src="images/info-part.png" className="info-names" title="Estimated months to sellout." /><b>Est Months to Sellout </b></label>
                                        <span>${wizardCalculations.monthsToSellout}</span><br />
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Okay</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    data: state.product.wizardData
})

export default connect(mapStateToProps, { productWizard, fetchProducts })(addNewProduct)




