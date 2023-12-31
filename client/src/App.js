import React, { useEffect, useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { io } from 'socket.io-client';

// styles
import './App.css';
const socket = io("http://localhost:5001");

function App() {
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [route, setRoute] = useState({ routeId: 0, coordinates: { lat: 0, lng: 0 }, name: '' } );

    useEffect(() => {
        // fetch all routes from the server
        const fetchRoutes = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5001/api/routes', {
                    method: 'GET',
                });
                let data = await response.json();
                const locs = data.map((route) => {
                    return route.points.map((point) => { 
                        return [point.lat, point.lng]
                    })
                });
                setLocations(locs);
            } catch (error) {
                console.error('Error fetching routes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, []);

    useEffect(() => {
        socket.on('locationUpdate', (locationData) => {
            console.log('locationUpdate:', locationData);
            setRoute(locationData);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="App">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <MapContainer
                    className="full-height-map"
                    center={[37.3352, -121.8811]}
                    zoom={11}
                    minZoom={3}
                    maxZoom={19}
                    maxBounds={[[-85.06, -180], [85.06, 180]]}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location, index) => (
                            <Polyline key={index} positions={location} color="blue" />
                    ))}
                    <MarkerClusterGroup>
                        <Marker
                            key={route.routeId}
                            position={[ route.coordinates.lat, route.coordinates.lng ]}
                            // icon={carIcon}
                        >
                            <Popup>
                                {route?.name || ''}
                            </Popup>
                        </Marker>
                    </MarkerClusterGroup>
                </MapContainer>
            )}
        </div>
    );
}

export default App;
