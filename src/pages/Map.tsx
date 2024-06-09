import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L, { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { usePages } from '@src/services/PagesContext';
import { useMapDetails } from '@src/services/MapDetailsContext';
import HaltePopUp from '@src/components/HaltePopUp';
import BusPopUp from '@src/components/BusPopUp';
import { Shuttle } from '@src/types/Shuttle';
import { MdGpsFixed } from "react-icons/md";


interface Halte {
  halte: string;
  geoCode: number[];
}

const Map = () => {
  const { showMap } = usePages();
  const { 
    shuttles, location, routeMarkers, route,
    selectedHalte, setSelectedHalte
  } = useMapDetails();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const CenterPoint = { lat: -6.886475, lng: 107.611301 };

  const iconHalte = L.icon({
    iconUrl: "/images/iconHalte.png",
    iconSize: [30, 30],
  });

  const iconHalteHighlighted = L.icon({
    iconUrl: "/images/iconHalteHighlighted.png",
    iconSize: [30, 30],
  });
  
  const iconUser = L.icon({
    iconUrl: "/images/iconUser.png",
    iconSize: [20, 20],
  });

  const iconBlueBus = L.icon({
    iconUrl: "/images/blueBus.svg",
    iconSize: [35, 35],
  });

  const iconGreyBus = L.icon({
    iconUrl: "/images/greyBus.svg",
    iconSize: [35, 35],
  });

  const handleMarkerClick = (marker: Halte) => {
    setIsButtonClicked(true);
    setSelectedHalte(marker);
  };

  return (
    showMap && (
      <div className='h-screen flex items-center justify-center'>
        <div className='h-full w-full md:w-[100%]'>
          <MapContainer className='relative' center={CenterPoint} zoom={15} zoomControl={false} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <HaltePopUp isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {location && (
              <Marker position={location.coordinates} icon={iconUser} />
            )}

            {shuttles.map((shuttle: Shuttle, index: number) => (
              <Marker
                key={`marker-${index}`}
                position={shuttle.coordinates}
                icon={shuttle.route === "Blue" ? iconBlueBus : iconGreyBus}
              >
                <BusPopUp shuttle={shuttle} />
              </Marker>
            ))}

            {routeMarkers.map((marker: Halte, index: number) => (
              <Marker
                key={`marker-${index}`}
                position={marker.geoCode as LatLngTuple}
                icon={iconHalte}
                eventHandlers={{ click: () => handleMarkerClick(marker) }}
              />
            ))}

            {selectedHalte && (
              <Marker position={selectedHalte.geoCode as LatLngTuple} icon={iconHalteHighlighted} />
            )}

            <Polyline positions={route} color="#eb8d8c" />
          </MapContainer>
        </div>
      </div>
    )
  );
};

export default Map;
