import * as fs from "fs";
import * as yargs from "yargs";
import { render } from "./display";
import { run } from "./run";

const args = yargs
    .option("filename", {
        alias: "f",
        type: "string",
        demand: "filename is required",
    })
    .option("output", {
        alias: "o",
        type: "string",
    })
    .argv;

const filename = args.filename;

if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist.`);
}

run(fs.createReadStream(filename))
    .then(render)
    .then((data) => {
        if (args.output) {
            fs.writeFileSync(args.output, data);
        } else {
            console.log(data);
        }
    })
    .catch(console.error);
