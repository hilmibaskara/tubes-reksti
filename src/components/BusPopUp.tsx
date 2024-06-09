import React from 'react';
import { Popup } from 'react-leaflet';
import { Shuttle } from '@src/types/Shuttle';

const BusPopUp = ({ shuttle }: { shuttle: Shuttle }) => {
  return (
    <Popup>
      <div>
        <p>Bus Plate: {shuttle.license_plate}</p>
        <p>Next Stop: {shuttle.route}</p>
        <p>Waiting time: {shuttle.waitingTime} </p>
        <p>Penumpang: {shuttle.countMhs}</p>
      </div>
    </Popup>
  );
};

export default BusPopUp;
