"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (request, response, next) => {
    const token = request.header("auth-token");
    if (!token)
        return response.status(401).json("Access Denied");
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "tokentest");
    request.userId = payload._id;
    next();
};
//# sourceMappingURL=validateToken.js.map