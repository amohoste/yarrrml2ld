const childProcess = require('child_process');
const fs = require('fs-extra');
const tmp = require('tmp-promise');

const yarrrml_parser = './node_modules/yarrrml-parser/bin/cli.js';

module.exports = function yarrrml2ld = function(options) {
    let rmlmapper = options.rmlmapper;
    

    let rml_file_tmp = tmp.file().then((file) => {
        return file.path;
    });

    let linked_file_tmp = tmp.file().then((file) => {
        return file.path;
    });

    // Convert yarrrml to rml
    return rml_file_tmp.then((rml_file_tmp) => {
        // Convert yarrrml to rml
        let executed = executeNodeScript(yarrrml_parser, ['-i', options.yarrrml_file, '-o', rml_file_tmp, '-f', 'RML']);

        return Promise.all([rml_file_tmp, linked_file_tmp, executed]);
    }).then(([rml_file_tmp, linked_file_tmp]) => {
        let arguments = ['-jar', rmlmapper, '-m', rml_file_tmp, '-o', linked_file_tmp];

        if (options.hasOwnProperty('functions')) {
            arguments.push('-f');
            arguments.push(options.functions);
        }

        // Convert rml to linked data
        return executeJar(linked_file_tmp, arguments);
    }).then((file_path) => {
        // Read all generated files and join them to a string
        return getLinkedData(file_path);
    });
};

function getLinkedData(path) {
    let files = [];
    let nq_file = path + ".nq";
    let nt_file = path + ".nt";

    if (fs.existsSync(nt_file)) {
        files.push(nt_file);
    }

    if (fs.existsSync(nq_file)) {
        files.push(nq_file);
    }

    let promises = files.map((file) => {
        return fs.readFile(file, 'utf8');
    });

    return Promise.all(promises).then((data) => {
        return data.join().toString();
    });
}

// Transforms triple-pattern-fragment query into promise
function executeNodeScript(path, args) {
    return new Promise((resolve, reject) => {

        let process = childProcess.fork(path, args);

        // listen for errors as they may prevent the exit event from firing
        process.on('error', (err) => {
            reject(err);
        });

        process.on('close', (code) => {
            resolve();
        });

    })
}

function executeJar(outdir, args) {
    return new Promise((resolve, reject) => {

        let process = childProcess.spawn(
            'java', args
        );

        // listen for errors as they may prevent the exit event from firing
        process.on('error', (err) => {
            reject(err);
        });

        process.stdout.on('data', function(data) {
            console.log(data.toString());
        });

        process.stderr.on("data", function (data) {
            console.log(data.toString());
        });

        process.on('close', (code) => {
            resolve(outdir);
        });
    })
}