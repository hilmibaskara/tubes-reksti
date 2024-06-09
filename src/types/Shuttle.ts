export interface Shuttle {
    bus_id: string;
    license_plate: string;
    bus_plate: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    halte: string;
    waitingTime: number;
    countMhs: number;
    route: String;
    error: string;
  }