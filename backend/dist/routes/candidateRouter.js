"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidatesController_1 = require("../controllers/candidatesController");
const router = express_1.default.Router();
// ראוט לקבלת מועמדים
router.get('/candidates', candidatesController_1.getCandidates);
router.put('/candidates/vote', candidatesController_1.vote);
exports.default = router;
