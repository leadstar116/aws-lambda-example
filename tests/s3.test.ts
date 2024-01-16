import { S3 } from 'aws-sdk';
import { uploadFileToS3 } from '../src/s3';

jest.mock('aws-sdk');

describe('uploadFileToS3', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should upload file to S3 successfully', async () => {
    const mockUploadResult = {
      Location: 'https://your-s3-bucket.s3.amazonaws.com/your-file',
    };

    // Mock the S3 upload method
    const mockUpload = jest.fn().mockImplementationOnce(() => ({
      promise: jest.fn().mockResolvedValueOnce(mockUploadResult),
    }));
    jest.spyOn(S3.prototype, 'upload').mockImplementationOnce(mockUpload);

    const name = 'test-file.csv';
    const data = 'some,csv,data';
    const type = 'text/csv';

    const result = await uploadFileToS3({ name, data, type });

    // Assert that the S3 upload method was called with the correct parameters
    expect(S3.prototype.upload).toHaveBeenCalledWith({
      Bucket: 'your-s3-bucket',
      Key: name,
      Body: data,
      ContentType: type,
    });

    // Assert that the function returns true upon successful upload
    expect(result).toBe(true);
  });

  it('should handle upload failure', async () => {
    // Mock the S3 upload method to throw an error
    const mockUpload = jest.fn().mockImplementationOnce(() => ({
      promise: jest.fn().mockRejectedValueOnce(new Error('Upload failed')),
    }));
    jest.spyOn(S3.prototype, 'upload').mockImplementationOnce(mockUpload);

    const name = 'test-file.csv';
    const data = 'some,csv,data';
    const type = 'text/csv';

    try {
      await uploadFileToS3({ name, data, type });
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });
});
