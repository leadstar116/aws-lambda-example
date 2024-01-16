import fs from 'fs/promises';
import { IFormattedStation, IStation } from './type';

export const processData = (data: IStation[]): IFormattedStation[] => {
  const formattedData = data
    .filter((station) => station.capacity < 12)
    .map(
      (station) =>
        ({
          externalId: station.external_id,
          stationId: station.station_id,
          legacyId: station.legacy_id,
          name: station.name,
          lat: station.lat,
          lon: station.lon,
        } as IFormattedStation)
    );

  return formattedData;
};

export const writeFile = async (csvData: string): Promise<string> => {
  const fileName = generateUniqueFilename();
  const filePath = `/tmp/${fileName}`;

  await fs.writeFile(filePath, csvData);

  return fileName;
};

export const generateUniqueFilename = (): string => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const uniqueFilename = `${timestamp}_${randomString}`;

  return uniqueFilename;
};
