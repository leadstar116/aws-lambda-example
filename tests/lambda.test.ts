import axios from 'axios';
import { API_URL, mainHandler } from '../src/lambda'; // Replace with the actual file path
import { formattedStationsMock, stationsMock } from './mockData';
import * as s3Utils from '../src/s3';
import * as utils from '../src/utils';
import { parseAsync } from 'json2csv';

jest.mock('axios');

describe('Main Handler', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle the main process successfully', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { data: { stations: stationsMock } },
    });

    // Mock processData and writeFile functions
    jest.spyOn(utils, 'processData').mockReturnValueOnce(formattedStationsMock);
    jest.spyOn(utils, 'writeFile').mockResolvedValueOnce('test-file.csv');

    // Mock uploadFileToS3 function
    const mockUploadFileToS3 = jest
      .spyOn(s3Utils, 'uploadFileToS3')
      .mockResolvedValueOnce(true);

    // Execute mainHandler
    await mainHandler();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(API_URL);
    expect(utils.processData).toHaveBeenCalledWith(stationsMock);

    const csvData = await parseAsync(formattedStationsMock[0]);
    expect(mockUploadFileToS3).toHaveBeenCalledWith({
      name: 'test-file.csv',
      data: csvData,
    });
  });

  it('should handle an error during the main process', async () => {
    jest
      .spyOn(axios, 'get')
      .mockRejectedValueOnce(new Error('Failed to fetch data'));

    try {
      await mainHandler();
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
