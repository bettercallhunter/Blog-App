// import React, { useRef } from "react";
// const Map = props => {
//     const mapRef = useRef();
//     const map = new window.google.maps.Map(mapRef.current, {
//         center: props.center,
//         zoom: props.zoom
//     })
//     return (<div ref={mapRef}></div>)
// }

// import React from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function Map() {
//     const defaultProps = {
//         center: {
//             lat: 10.99835602,
//             lng: 77.01502627
//         },
//         zoom: 11
//     };

//     return (
//         // Important! Always set the container height explicitly
//         <div style={{ height: '100vh', width: '100%' }}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: "AIzaSyBwPGK5SbTYI_Vsip8r2depJp_RNr3FDC4" }}
//                 defaultCenter={defaultProps.center}
//                 defaultZoom={defaultProps.zoom}
//             >
//                 {/* <AnyReactComponent
//                     lat={59.955413}
//                     lng={30.337844}
//                     text="My Marker"
//                 /> */}
//             </GoogleMapReact>
//         </div>
//     );
// }
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

class Map extends Component {
    render() {
        return (
            <React.Fragment>
                <LoadScript
                    googleMapsApiKey="AIzaSyBwPGK5SbTYI_Vsip8r2depJp_RNr3FDC4"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: this.props.lat, lng: this.props.lng }}
                        zoom={10}
                    >
                    </GoogleMap>
                </LoadScript>
            </React.Fragment>
        )
    }
}
export default Map;