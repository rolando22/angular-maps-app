const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const targetEnvDirPath = './src/environments';
const targetEnvPath = `${targetEnvDirPath}/environment.ts`;
const targetDevEnvPath = `${targetEnvDirPath}/environment.development.ts`;

const maxboxKey = process.env.MAPBOX_KEY;

if (!maxboxKey) {
  throw new Error('MAPBOX_KEY is required in .env file');
}

const envFileContent = `export const environment = {
  mapboxKey: '${maxboxKey}',
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetEnvPath, envFileContent);
writeFileSync(targetDevEnvPath, envFileContent);
