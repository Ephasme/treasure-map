import * as fs from "fs";
import * as yargs from "yargs";
import { run } from "./run";
import { render } from "./display";

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
    .catch(console.error);
