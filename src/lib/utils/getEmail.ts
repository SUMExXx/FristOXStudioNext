import { jwtVerify } from "jose";

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET!);

const getEmail = async (token: string): Promise<string | null> => {
  console.log('Token:', token);
  console.log('JWT_SECRET_KEY:', JWT_SECRET_KEY.toString());
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: ['HS256'],
    });

    if (typeof payload.email === 'string') {
      return payload.email;
    }

    return null;
  } catch (err) {
    console.error('Invalid or expired token:', err);
    return null;
  }
}

export default getEmail;