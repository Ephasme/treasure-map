import * as fs from "fs";
import * as yargs from "yargs";
import { parseStream } from "./parsers";

const args = yargs.option("f", {
    alias: "filename",
    type: "string",
    demand: "filename is required",
}).argv;

const filename = args.f;

if (!fs.existsSync(filename)) {
    throw new Error(`File ${filename} does not exist.`);
}

parseStream(fs.createReadStream(filename)).then(() => {
}).catch((err) => {
    console.error(err);
});
