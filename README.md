# Your Lambda Project

This project is an AWS Lambda function that pulls data from a specified URL, processes it, and uploads the result to an S3 bucket.

## Prerequisites

- Node.js installed (recommend version 18)
- npm installed
- AWS CLI configured with access key and secret key

## Getting Started

1. Clone this repository.
2. Configure the envs
   - Adjust the API_URL variable in lambda.ts to the desired data source URL.
   - Set your S3 bucket name in the uploadFileToS3 function
2. Install dependencies
   Run `npm install`.
3. Set up AWS credentials, ensure your AWS CLI is configured with the necessary credentials.
   Run `aws configure`
4. Running Locally. To run the project, use the following command:
   `npm start`
5. Run tests. To run tests, use the following command:
   `npm run test`
6. Deploying to AWS Lambda
   Auto deployment is not configured right now, so the process is pretty manual.
   Create a zip file containing your Lambda function and its dependencies.
   And deploy it to AWS.

