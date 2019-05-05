import { Readable } from "stream";

export function toStream(input: string): Readable {
    const stream = new Readable();
    stream.push(input);
    stream.push(null);
    return stream;
}
