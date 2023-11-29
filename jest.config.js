require('dotenv').config({ path: './.env.local' });

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  injectGlobals: false,
};