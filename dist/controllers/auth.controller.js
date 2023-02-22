"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => {
    //infromacion del usario email: nombre: imagen: ect
    const token = jsonwebtoken_1.default.sign({
        //infromacion del usario email: nombre: imagen: ect
        test: "test",
    }, "secret", {
        expiresIn: 60 * 60 * 24,
    });
    return res.json({
        token,
    });
};
exports.login = login;
const profile = (req, res) => {
    return res.json('Autorizado');
};
exports.profile = profile;
