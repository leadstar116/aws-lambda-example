export interface IStationsResponse {
  data: {
    stations: IStation[];
  };
  last_updated: number;
  ttl: number;
  version: string;
}

export interface IStation {
  station_type: string;
  electric_bike_surcharge_waiver: boolean;
  has_kiosk: boolean;
  rental_uris: IRentalURI;
  lon: number;
  capacity: number;
  lat: number;
  eightd_station_services: [];
  external_id: string;
  station_id: string;
  legacy_id?: string;
  name: string;
  eightd_has_key_dispenser: boolean;
  rental_methods: string[];
  short_name: string;
}

interface IRentalURI {
  android: string;
  ios: string;
}

export interface IFormattedStation {
  externalId: string;
  stationId: string;
  legacyId: string;
  name: string;
  lat: number;
  lon: number;
}
