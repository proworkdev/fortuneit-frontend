import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderComponent from './../Partials/headerComponent';
import SidebarComponent from './../Partials/sidebarComponent';
import { fetchAllPlans } from './../../../actions/planActions';
import { Table } from 'reactstrap';

class subscriptionTier extends Component {

    constructor(props) {

        super(props);

        this.state = {
            userData: JSON.parse(sessionStorage.getItem('loginState')),
            plansList: []
        }
    }

    componentDidMount() {
        this.props.fetchAllPlans();
    }

    componentDidUpdate(prevProps) {

        const { plandata } = this.props;

        if (plandata !== prevProps.plandata) {
            this.setState({ plansList: plandata.plans })
        }

    }

    render() {

        const { userData, plansList } = this.state;

        return (

            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <div className="pricing-plan">
                                <div className="container">
                                    <div className="pricing-content-box">
                                        <h4>Subscription Tiers</h4>
                                        <br />
                                        <ul>
                                            {
                                                plansList.map((plan, key) => {

                                                    return <li key={key}>
                                                        <div className={plan.name === userData.user.planDetails.planSelected ? "price-box active" : "price-box"}>
                                                            <div className="plan-icon">
                                                                <img alt="" src="images/icon-4.png" />
                                                            </div>
                                                            <div className="price-title">
                                                                {plan.name}
                                                            </div>
                                                            <div className="price-rate">
                                                                {plan.currency} {plan.price}
                                                            </div>
                                                            <div className="price-inner-list">
                                                                <ul>
                                                                    <li>{plan.service}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* <div style={{ textAlign: 'center' }}>
                            <h2 style={{ marginTop: 20 }}><u>Your selected plan details</u></h2>
                            <div>
                                <Table>
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

                                    </tbody>
                                </Table>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    plandata: state.plans
})

export default connect(mapStateToProps, { fetchAllPlans })(subscriptionTier);