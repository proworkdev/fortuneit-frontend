import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {
  LandingPage,
  Login,
  Register,
  emailConfirmation,
  businessInfo,
  forgotPassword,
  otpVerification,
  resetPassword,
  testAnimations,
  beforeSignupShowAllPlans,
  beforeSignupViewPlan,
  afterSignupShowAllPlans,
  afterSignupViewPlan,
  paymentPage,
  mwsInfo,
  showDashboard,
  addProduct,
  addOrder,
  profileSettings,
  changePassword,
  productFinder,
  testComponent,
  manageOrders,
  manageProducts,
  subscriptionTier,
  allTransactions,
  refundRequests,
  productFees,
  productEvaluator,
  evaluationForm,
  fulfillmentOrders,
  fulfillmentDetails,
<<<<<<< HEAD
  checkStock,
  addNewProduct
=======
  checkStock
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
} from './components';
import store from './store';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from "react-router-redux";
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirmEmail" component={emailConfirmation} />
            <Route path="/businessInfo" component={businessInfo} />
            <Route path="/forgotPassword" component={forgotPassword} />
            <Route path="/verifyOtp" component={otpVerification} />
            <Route path="/resetPassword" component={resetPassword} />
            <Route path="/testAnimation" component={testAnimations} />
            <Route path="/showPlans" component={beforeSignupShowAllPlans} />
            <Route path="/viewPlan" component={beforeSignupViewPlan} />
            <Route path="/showAllPlans" component={afterSignupShowAllPlans} />
            <Route path="/viewSelectedPlan" component={afterSignupViewPlan} />
            <Route path="/payment" component={paymentPage} />
            <Route path="/mwsCredentials" component={mwsInfo} />
            <Route path="/dashboard" component={showDashboard} />
            <Route path="/addProduct" component={addProduct} />
            <Route path="/addOrder" component={addOrder} />
            <Route path="/profileSettings" component={profileSettings} />
            <Route path="/changePassword" component={changePassword} />
            <Route path="/productFinder" component={productFinder} />
            <Route path="/testComponent" component={testComponent} />
            <Route path="/manageOrders" component={manageOrders} />
            <Route path="/manageProducts" component={manageProducts} />
            <Route path="/subscriptionTier" component={subscriptionTier} />
            <Route path="/allTransactions" component={allTransactions} />
            <Route path="/refundRequests" component={refundRequests} />
            <Route path="/productFee" component={productFees} />
            <Route path="/productEvaluator" component={productEvaluator} />
            <Route path="/evaluate" component={evaluationForm} />
            <Route path="/fulfillmentOrders" component={fulfillmentOrders} />
            <Route path="/fulfillmentDetails" component={fulfillmentDetails} />
            <Route path="/productStock" component={checkStock} />
<<<<<<< HEAD
            <Route path="/addNewProduct" component={addNewProduct} />
=======
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
