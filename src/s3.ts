import { S3 } from 'aws-sdk';

const S3_BUCKET_NAME = 'your-s3-bucket';

export const uploadFileToS3 = async ({
  name,
  data,
  type = 'text/csv',
}: {
  name: string;
  data: any;
  type?: string;
}): Promise<boolean> => {
  const s3 = new S3();
  const uploadParams = {
    Bucket: S3_BUCKET_NAME,
    Key: name,
    Body: data,
    ContentType: type,
  };

  const uploadResult = await s3.upload(uploadParams).promise();

  if (uploadResult) {
    console.log('File uploaded to S3 successfully:', uploadResult.Location);

    return true;
  } else {
    console.error('Error uploading file to S3');
  }

  return false;
};
