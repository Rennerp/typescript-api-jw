"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateToken_1 = require("../libs/validateToken");
const router = express_1.Router();
router.post("/signup", auth_controller_1.signUp);
router.post("/signin", auth_controller_1.signIn);
router.get("/profile", validateToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map