/*global google*/

import React, { Component } from 'react';
import HeaderComponent from './Dashboard/Partials/headerComponent';
import SidebarComponent from './Dashboard/Partials/sidebarComponent';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import 'react-table/react-table.css'

export class TestComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            variab: 'test',
            isTrue: false
        }
    }

    bounceFunction = () => {

        if (this.state.variab === 'test') {
            return google.maps.Animation.BOUNCE
        } else {
            return null
        }
    }

    render() {

        return (
            <div>
                <div className="main-panel">
                    <SidebarComponent propData={this.props} />
                    <div className="page-container">
                        <HeaderComponent propData={this.props} />
                        <div className="inner-panel">
                            <Map style={{ width: '100%', height: 500, position: 'relative' }} google={this.props.google} zoom={14}>
                                <Marker onClick={this.onMarkerClick}
                                    title={'Testing Tooltip'}
                                    animation={this.bounceFunction()}
                                />
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDT_qWC2m4V7diNyBWqVyJ6jYuPH3Ledk4')
})(TestComponent)
