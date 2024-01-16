import fs from 'fs/promises';
import * as utils from '../src/utils';
import { IStation, IFormattedStation } from '../src/type';
import { formattedStationsMock, stationsMock } from './mockData';

jest.mock('fs/promises');

describe('Utility Functions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('processData', () => {
    it('should format data correctly', () => {
      const expectedOutput: IFormattedStation[] = formattedStationsMock;

      const result = utils.processData(stationsMock);

      expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
      const input: IStation[] = [];
      const result = utils.processData(input);

      expect(result).toEqual([]);
    });
  });

  describe('writeFile', () => {
    it('should write file and return filename', async () => {
      const csvData = 'some,csv,data';
      const expectedFileName = 'mocked_timestamp_random';

      // Mocking fs.promises.writeFile
      jest.spyOn(fs, 'writeFile').mockResolvedValueOnce();

      // Mocking generateUniqueFilename
      jest
        .spyOn(utils, 'generateUniqueFilename')
        .mockReturnValueOnce(expectedFileName);

      const result = await utils.writeFile(csvData);

      expect(fs.writeFile).toHaveBeenCalledWith(
        `/tmp/${expectedFileName}`,
        csvData
      );
      expect(result).toBe(expectedFileName);
    });
  });

  describe('generateUniqueFilename', () => {
    it('should generate a unique filename', () => {
      const result = utils.generateUniqueFilename();

      // Basic check for the format of the generated filename
      expect(result).toMatch(/^\d+_[a-z0-9]{6}$/);
    });
  });
});
