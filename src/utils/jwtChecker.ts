import jwt, { JwtPayload } from 'jsonwebtoken';

// @dev check if JWT is expired
//
// @param token string
//
// @return boolean
export const checkJWTExpiration = (token: string) => {
  try {
    const decodedToken = jwt.decode(token) as JwtPayload;
    const expirationTime = decodedToken.exp! * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();
    return expirationTime < currentTime;
  } catch (error) {
    // Handle any error that occurs during decoding or verification
    console.error('Error while checking JWT expiration:', error);
    return false; // Treat the token as expired in case of error
  }
};
