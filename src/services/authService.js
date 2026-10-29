import { validarCadastro, validarEndereco } from "../validators/authValidator.js";
import { users } from "../repositories/index.js";
import { AppError } from "../shared/errors.js";
import { jwtExpireIn, jwtSecret } from "../config/env.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function usuarioPublico(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser
}

async function cadastrar({ name, email, password, address} ) {
    validarCadastro({ name, email, password });
    if (address !== undefined && address !== null) validarEndereco(address);
    const normalizedEmail = email.trim().toLowerCase();
    if(await users.findByEmail(normalizedEmail)) throw new AppError('E-mail já cadastrado!', 409);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await users.create({ name: name.trim(), email: normalizedEmail, passwordHash: passwordHash, role: 'customer'});
    return usuarioPublico(user);
}

async function autenticar(email, password) {
    const user = await users.findByEmail(String(email || '').trim().toLowerCase());
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
        throw new AppError('Email ou senha inválidos', 401);
    }
    const token = jwt.sign( { sub: user.id, role: user.role}, jwtSecret, { expiresIn: jwtExpireIn });
    return token;
}

export default { cadastrar, autenticar, usuarioPublico };