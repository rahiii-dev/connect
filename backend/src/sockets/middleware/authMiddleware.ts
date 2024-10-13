import { ExtendedError, Socket } from "socket.io";
import cookie from 'cookie';
import { verifyToken } from "../../utils/jwtUtils";

const isAuthenticated = (socket: Socket, next: (err?: ExtendedError) => void) => {
    const cookies = socket.handshake.headers.cookie;

    if (cookies) {
        const parsedCookies = cookie.parse(cookies);
        const token = parsedCookies['refreshToken'];
        if (token) {
            const decoded = verifyToken(token, 'refresh');
            if (decoded) {
                socket.data.user = decoded.userId;
                next()
            } else {
                return next(new Error('Authentication error'));
            }
        } else {
            next(new Error('No token provided'));
        }
    } else {
        next(new Error('No cookies found'));
    }
}

export default isAuthenticated