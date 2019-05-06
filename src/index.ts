import * as fs from "fs";
import * as yargs from "yargs";
import { render } from "./display";
import { run } from "./run";

const args = yargs.option("f", {
    alias: "filename",
    type: "string",
    demand: "filename is required",
}).argv;

const filename = args.f;

if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist.`);
}

run(fs.createReadStream(filename))
    .then(render)
    .then(console.log)
    .catch(console.error);
