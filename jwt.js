import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//Cargar las variables de entorno configuradas en el archivo .env
dotenv.config();

const KEY = process.env.JWT_SECRET

//Genera un web token para un usuario
const generateToken = (user) => {
    return jwt.sign(user, KEY, {expiresIn: '30m'})
}

//Verifica si el token generado sique vigente o no 
const isTokenValid = (token) => {
    try {
        const decoded = jwt.verify(token, KEY);
        return { valid: true, decoded }; //Si está vigente, regresa el payload
    } catch (error) {
        console.error('Invalid token', error)
        return { valid: false, error }; //Si no está vigente, retorna el error
    }
}

export { generateToken, isTokenValid };
