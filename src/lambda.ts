import { Server } from '@hapi/hapi';
import axios from 'axios';
import { parseAsync } from 'json2csv';
import { IStationsResponse } from './type';
import { uploadFileToS3 } from './s3';
import { processData, writeFile } from './utils';

export const API_URL =
  'https://gbfs.divvybikes.com/gbfs/en/station_information.json';

export const mainHandler = async () => {
  try {
    // Step a: Pull data from the URL
    const response = await axios.get(API_URL);
    const data = (response.data as IStationsResponse)?.data?.stations;

    if (data) {
      console.log('MainHandler: pulled the data from api');
    }

    // Step b: Make changes to the output
    const modifiedData = processData(data);
    console.log('MainHandler: processed the data');

    // Step c: Convert JSON output to CSV
    const csvData = await parseAsync(modifiedData);
    console.log('MainHandler: converted JSON to CSV');

    // Step d: Write output to a file (local filesystem)
    const fileName = await writeFile(csvData);
    console.log('MainHandler: write csv file is done');

    // Step e: Upload file to S3
    // Replace 'your-s3-bucket' with your actual S3 bucket name
    await uploadFileToS3({
      name: fileName,
      data: csvData,
    });
    console.log('MainHandler: uploading file to S3 is done');
  } catch (error) {
    console.error('MainHandler Error:', error);
  }
};

export const main = async (): Promise<any> => {
  const server = new Server({ port: 3000 });

  server.route({
    method: 'GET',
    path: '/',
    handler: mainHandler,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

main().catch(console.error);
