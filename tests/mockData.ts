import { IFormattedStation, IStation } from '../src/type';

export const stationsMock: IStation[] = [
  {
    station_type: 'classic',
    electric_bike_surcharge_waiver: false,
    has_kiosk: true,
    rental_uris: {
      android: 'https://chi.lft.to/lastmile_qr_scan',
      ios: 'https://chi.lft.to/lastmile_qr_scan',
    },
    lon: -87.666611,
    capacity: 15,
    lat: 41.891072,
    eightd_station_services: [],
    external_id: '1',
    station_id: '1',
    name: 'Ashland Ave',
    eightd_has_key_dispenser: false,
    rental_methods: ['KEY', 'CREDITCARD', 'TRANSITCARD'],
    short_name: 'ashland',
  },
  {
    station_type: 'classic',
    electric_bike_surcharge_waiver: false,
    has_kiosk: true,
    rental_uris: {
      android: 'https://chi.lft.to/lastmile_qr_scan',
      ios: 'https://chi.lft.to/lastmile_qr_scan',
    },
    lon: -53.666611,
    capacity: 10,
    lat: 20.891072,
    eightd_station_services: [],
    external_id: '2',
    station_id: '2',
    legacy_id: '2',
    name: 'Grand Ave',
    eightd_has_key_dispenser: false,
    rental_methods: ['KEY', 'CREDITCARD', 'TRANSITCARD'],
    short_name: 'grand',
  },
];

export const formattedStationsMock: IFormattedStation[] = [
  {
    lon: -53.666611,
    lat: 20.891072,
    externalId: '2',
    stationId: '2',
    legacyId: '2',
    name: 'Grand Ave',
  },
];
