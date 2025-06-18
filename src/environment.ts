import dotenv from 'dotenv';

const result = dotenv.config({ path: 'config/environment/.env.dev' });

if (result.error) {
  console.error('Failed to load environment:', result.error);
} else {
  console.log('Environment loaded successfully.');
  // Example: check a specific variable
  console.log('MY_ENV_VAR:', process.env.NODE_ENV);
}

export default result;
