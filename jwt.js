import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//Cargar las variables de entorno configuradas en el archivo .env
dotenv.config();

const KEY = process.env.JWT_SECRET

//Genera un web token para un usuario
const generateToken = (user) => {
    return jwt.sign(user, KEY, {expiresIn: '10m', algorithm: 'HS256'})
}


//Verifica si el token generado sique vigente o no 
const isTokenValid = (token) => {
    try {
        const decoded = jwt.verify(token, KEY);
        return { valid: true, expired: false, decoded }; //Si está vigente, regresa el payload
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, expired: true }; // Si el token está expirado, marca como expirado
        } else {
            console.error('Invalid token', error);
            return { valid: false, expired: false, error }; // Si el error no es debido a la expiración, marca como inválido y devuelve el error
        }
    }
}

export { generateToken, isTokenValid };
