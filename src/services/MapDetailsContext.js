import React, { createContext, useContext, useState, useEffect } from "react";
import * as turf from '@turf/turf';
import supabase from '@src/utils/supabase/supabaseClient';

const MapDetailsContext = createContext();

export const MapDetailsProvider = ({ children }) => {
  const [location, setLocation] = useState();
  const [shuttles, setShuttles] = useState([]);
  const [selectedHalte, setSelectedHalte] = useState();
  const [selectedRoute, setSelectedRoute] = useState('');

  const routeMarkers = [
    { halte: 'Cisitu Indah 1', geoCode: [-6.877011, 107.611673], nextHalteEstimate: 120 },
    { halte: 'WCO', geoCode: [-6.879793, 107.612052], nextHalteEstimate: 60 },
    { halte: 'Serbu Rame', geoCode: [-6.883251, 107.611274], nextHalteEstimate: 60 },
    { halte: 'Opiuci', geoCode: [-6.885811, 107.612611], nextHalteEstimate: 60 },
    { halte: 'Pintu Utara ITB', geoCode: [-6.887737, 107.609306], nextHalteEstimate: 60 },
    { halte: 'Gerbang Batan', geoCode: [-6.888668, 107.608160], nextHalteEstimate: 60 },
    { halte: 'Gerbang Sipil', geoCode: [-6.893580, 107.608821], nextHalteEstimate: 120 },
    { halte: 'Gerbang Utama', geoCode: [-6.893182, 107.610355], nextHalteEstimate: 60 },
    { halte: 'Gerbang SR', geoCode: [-6.893503, 107.611932], nextHalteEstimate: 120 },
    { halte: 'Ali Borme', geoCode: [-6.891475, 107.613083], nextHalteEstimate: 120 },    
    { halte: 'Tomoro Simpang Dago', geoCode: [-6.885669, 107.613524], nextHalteEstimate: 120 },    
    { halte: 'Darul Hikam', geoCode: [-6.879363, 107.616371], nextHalteEstimate: 120 },   
    { halte: 'Dago Asri', geoCode: [-6.878370, 107.614570], nextHalteEstimate: 120 },    
    { halte: 'Nasi Kuning Kuah', geoCode: [-6.876664, 107.612832], nextHalteEstimate: 120 },    
  ]

  const route = [
    // ==== Main Gate ====
    [-6.877007, 107.611647], [-6.877121, 107.612785], [-6.877525, 107.612845],
    [-6.877851, 107.612642], [-6.878759, 107.612431], [-6.879284, 107.612616],
    [-6.879586, 107.612059], [-6.882827, 107.611671], [-6.882882, 107.611292],
    [-6.883818, 107.611243], [-6.885035, 107.612193], [-6.885125, 107.612841],
    [-6.885393, 107.612900], [-6.886133, 107.612389], [-6.886300, 107.611883],
    [-6.886606, 107.611659], [-6.887023, 107.611540], [-6.887263, 107.611369], 
    [-6.887692, 107.610318], [-6.887747, 107.608475], [-6.887903, 107.608252], 
    [-6.888143, 107.608149], [-6.891756, 107.608008], [-6.892119, 107.608005], 
    [-6.893810, 107.608460], [-6.893589, 107.608839], [-6.893342, 107.609563], 
    [-6.893293, 107.610004], [-6.893293, 107.610090], [-6.893274, 107.610971], 
    [-6.893587, 107.611949], [-6.893743, 107.612974], [-6.888503, 107.613468], 
    [-6.886757, 107.613571], [-6.885228, 107.613682], [-6.883782, 107.614068], 
    [-6.881725, 107.615771], [-6.878733, 107.616587], [-6.878395, 107.615289],
    [-6.878472, 107.614954], [-6.878314, 107.614472], [-6.877793, 107.614646],
    [-6.877136, 107.614739], [-6.876935, 107.614640], [-6.876830, 107.614412],
    [-6.876706, 107.614437], [-6.876298, 107.613863], [-6.876195, 107.613526],
    [-6.875932, 107.612254], [-6.876508, 107.612098], [-6.876706, 107.612918],
    [-6.877102, 107.612793], [-6.877007, 107.611647]
    
  ]

  const fetchLocation = async () => {
    const onSuccess = (location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        error: null,
      });
    };

    const onError = (error) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: 0,
          lng: 0,
        },
        error: {
          code: error.code,
          message: error.message,
        },
      });
      console.log("Error: " + error.message);
    };

    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  const fetchShuttles = async () => {
    const busIds = [1, 2, 3];
  
    // Query details for each bus
    const detailsPromises = busIds.map(busId => 
      supabase
        .from('details')
        .select('id, bus_id, lat, long, capacity')
        .eq('bus_id', busId)
        .order('created_at', { ascending: false })
        .limit(1)
    );
  
    // Query license_plate for each bus
    const licensePromises = busIds.map(busId => 
      supabase
        .from('bus')
        .select('id, license_plate')
        .eq('id', busId)
    );
  
    try {
      const detailsResults = await Promise.all(detailsPromises);
      const licenseResults = await Promise.all(licensePromises);
  
      const shuttles = detailsResults
        .filter(result => result.data.length > 0) // Filter out any empty results
        .map((result, index) => {
          const shuttleData = result.data[0];
          const licenseData = licenseResults[index].data[0];
          const nearestHalte = getNearestHalte({
            coordinates: {
              lat: shuttleData.lat,
              lng: shuttleData.long,
            }
          }, routeMarkers);
  
          // waitingTime = calculateWaitingTime(nearestHalte, nearestHalte)
  
          return {
            id: shuttleData.id,
            bus_id: shuttleData.bus_id,
            license_plate: licenseData ? licenseData.license_plate : "Unknown",
            coordinates: {
              lat: shuttleData.lat,
              lng: shuttleData.long,
            },
            countMhs: shuttleData.capacity,
            route: nearestHalte ? nearestHalte.halte : "Unknown",
            error: null,
          };
        });
  
      setShuttles(shuttles);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  

  function getNearestHalte(location, markers) {
    if (!location) return null;

    let idx = 0;
    let distance = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[0].geoCode[1], markers[0].geoCode[0]]), {units: 'meters'});
    for (let i = 1; i < markers.length; i++) {
      let temp = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[i].geoCode[1], markers[i].geoCode[0]]), {units: 'meters'});
      if (temp < distance) {
        distance = temp;
        idx = i;
      }
    }
    return markers[idx];
  }

  function calculateWaitingTime(shuttle, halte) {
    var start = -1;
    var end = -1;
    var waitingTime = 0;
    var route = routeMarkers;

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === halte.halte) {
        end = i ;
        break;
      }
    }

    if (end === -1) {
      return -1;
    }

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === shuttle.halte) {
        start = i - 1;
        if (i <= 0) {
          start = route.length - 1;
        }
        break;
      }
    }

    if (start === end) {
      start = 0;
      end = route.length - 1;
    }

    while (start !== end) {
      waitingTime = waitingTime + route[start].nextHalteEstimate;

      if (end === 0) {
        end = route.length - 1;
      } else {
        end = end - 1;
      }
    }

    waitingTime = waitingTime
    console.log("waiting", waitingTime);
    return Math.ceil(waitingTime / 60);
  }
  
  function calculateArrivingTime(waitingTime) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const arriveHours = Math.floor(waitingTime / 60);
    const arriveMinutes = Math.floor(waitingTime % 60);

    if (hours + arriveHours >= 24) {
      return `--:--`;
    }

    if (minutes + arriveMinutes >= 60) {
      return `${(hours + arriveHours + 1).toString().padStart(2, '0')}:${((minutes + arriveMinutes) % 60).toString().padStart(2, '0')}`;
    }

    return `${(hours + arriveHours).toString().padStart(2, '0')}:${(minutes + arriveMinutes).toString().padStart(2, '0')}`;
  }

  function getContents() {
    fetchShuttles();
    fetchLocation();
  }

  useEffect(() => {
    getContents();

    const interval = setInterval(() => {
      getContents();
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedHalte, selectedRoute]);

  return (
    <MapDetailsContext.Provider value={{
        location, setLocation,
        shuttles, setShuttles,
        selectedHalte, setSelectedHalte,
        selectedRoute, setSelectedRoute,
        routeMarkers, route,
        fetchLocation, fetchShuttles,
        getNearestHalte, calculateWaitingTime, 
        calculateArrivingTime,
      }}
    >
      {children}
    </MapDetailsContext.Provider>
  );
};

export const useMapDetails = () => useContext(MapDetailsContext);
