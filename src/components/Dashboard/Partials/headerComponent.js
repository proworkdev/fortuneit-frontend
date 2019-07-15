import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './../../../actions/authActions';
import { Link } from 'react-router-dom';

class headerComponent extends Component {

    constructor(props) {

        super(props);

        this.state = {
            userData: JSON.parse(sessionStorage.getItem('loginState'))
        }

        this.logoutFunction = this.logoutFunction.bind(this);
    }

    logoutFunction() {

        sessionStorage.clear();

        this.props.logout();

        this.props.propData.history.push({
            pathname: '/login'
        })
    }

    render() {

        const { userData } = this.state;

        return (
            <div>
                <div className="header">

                    <div className="top-left-action">

                        <ul>

                            <li>

                            </li>

                        </ul>

                    </div>

                    <div className="top-right-action">

                        <ul>

                            <li className="dropdown">

                                <a href="" className="dropdown-toggle " data-toggle="dropdown" aria-expanded="true">
                                    <div className="peer">
                                        <span className="user-name">{userData.user.username}</span>
                                    </div>
                                </a>

                                <ul className="dropdown-menu user-details">

                                    <li>
                                        <Link to='/profileSettings' className=""><i className="fa fa-cogs" aria-hidden="true"></i>Setting</Link>
                                    </li>

                                    {/* <li> */}
                                    {/* <a href="#" className=""> <i className="fa fa-user-o" aria-hidden="true"></i>
                                            <span>Profile</span>
                                        </a> */}
                                    {/* </li> */}

                                    {/* <li>
                                        <a href="#" className=""> <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                            <span>Messages</span>
                                        </a>
                                    </li> */}

                                    <li>
                                        <a className="log-out"> <i className="fa fa-power-off" aria-hidden="true"></i>
                                            <span onClick={this.logoutFunction} >Logout</span>
                                        </a>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { logout })(headerComponent)