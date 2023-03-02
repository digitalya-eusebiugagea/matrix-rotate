import * as fs from 'fs';
import request from 'request';

export const isValidUrl = (urlString: string)=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e) { 
        return false; 
    }
}

export const getReadableStream  = (file: string): fs.ReadStream => {
    if (isValidUrl(file)) {
        return request(file);
    }

    return fs.createReadStream(file)
}