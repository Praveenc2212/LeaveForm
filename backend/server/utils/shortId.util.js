import crypto from "crypto";

export const generateShortId = (prefix) => {
    // Generate 4 bytes of random data, convert to hex, take 6 characters, and uppercase it
    const randomStr = crypto.randomBytes(4).toString('hex').substring(0, 6).toUpperCase();
    return `${prefix}-${randomStr}`;
};
