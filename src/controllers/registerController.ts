import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    // Validación básica
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario/email ya existe
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.username === username 
          ? 'El usuario ya existe' 
          : 'El correo ya está registrado' 
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};