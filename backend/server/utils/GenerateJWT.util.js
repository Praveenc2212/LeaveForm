import jwt from "jsonwebtoken";

export const GenerateJwtTokens = (data, res) => {
    try {
        // Token...
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
        // Cookie...
        res.cookie(process.env.JWT_TOKEN_NAME, token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // weeks * days * hours * mins * secs * millis ...
            httpOnly: true, //url secure...
            sameSite: "strict", // requests From My Site Only Allowed...
            secure: process.env.STATUS != 'development', // protocol security... [https]
        });

        return token;
    } catch (error) {
        throw new Error(`Error: Creating Json Web Token Failed... :- ${error}`);
    }
};