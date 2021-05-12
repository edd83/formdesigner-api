import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
  {
    alias: 'e',
    defaultValue: 'development',
    name: 'env',
    type: String
  }
]);

// Set the env file
const result2 = dotenv.config({
  path: `./env/${options.env}.env`
});

if (result2.error) {
  throw result2.error;
}
