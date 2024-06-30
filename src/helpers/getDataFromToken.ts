import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// The JwtPayload type from the jsonwebtoken library is used to type-check the decoded JWT payload to ensure it conforms to expected properties.

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('tweek_token')?.value || '';

        const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!) as tokenInterface;

        return tokenData.email;
    } catch (error: any) {
        throw new Error(error.message);
    }
};



interface tokenInterface extends JwtPayload {
    id : string,
    userName : string,
    email : string,
}
