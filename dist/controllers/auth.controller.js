"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Saving user
    const user = new user_1.default({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    // Token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "tokentest");
    response.header("auth-token", token).json(savedUser);
});
exports.signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email: request.body.email });
    if (!user)
        return response.status(400).json("Email or password wrong");
    const correctPassword = yield user.validatePassword(request.body.password);
    if (!correctPassword)
        return response.status(400).json("Invalid Password");
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn: 60 * 60 * 24,
    });
    response.header("auth-token", token).send("Login");
});
exports.profile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(request.userId, { password: 0 });
    if (!user)
        return response.status(404).json("No user found");
    response.json(user);
});
//# sourceMappingURL=auth.controller.js.map