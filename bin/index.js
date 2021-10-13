#! /usr/bin/env node
const yargs = require("yargs");
const fs = require("fs");

const usage = "\nUsage: utt <full_path_to_file> -p";
const options = yargs
    .usage(usage)
    .options({
        'path': {
            alias: 'p',
            describe: 'provide a path to file',
            demandOption: true
        },
    })
    .help(true)
    .argv;

const pathToFile = yargs.argv._[0];
const filePath = pathToFile.split(".")[0];
const extension = pathToFile.split(".")[1];
const componentName = filePath.split("/").pop();
const pathToTestFile = `${filePath}.test.${extension}`;

const testFileContent = `import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ${componentName} } from './${componentName}'

describe('${componentName}', () => {
    test.todo('should render')
})
`;

fs.appendFile(pathToTestFile, testFileContent, function (err) {
    if (err) {
        return console.log(err);
    }
});
