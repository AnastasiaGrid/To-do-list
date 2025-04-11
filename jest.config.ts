// /**
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */
//
// import type { Config } from 'jest';
// import { defaults } from 'jest-config';
//
import type { Config } from '@jest/types';

const esModules = ['lodash-es', 'nanoid'].join('|');

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  // testEnvironment: 'jsdom',
  transform: {
    '\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^lodash-es(/(.*)|$)': 'lodash$1',
    '^nanoid(/(.*)|$)': 'nanoid$1'
  },
  moduleDirectories: [
    'node_modules'
  ]

};
export default config;
