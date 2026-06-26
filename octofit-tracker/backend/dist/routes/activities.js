"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await activity_1.default.find().populate('user').sort({ date: -1 }).limit(100);
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch activities', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { user, type, durationMinutes, distanceKm, calories, date } = req.body;
        const activity = await activity_1.default.create({ user, type, durationMinutes, distanceKm, calories, date });
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create activity', details: error });
    }
});
exports.default = router;
