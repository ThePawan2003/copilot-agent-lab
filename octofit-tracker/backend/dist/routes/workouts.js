"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await workout_1.default.find().populate('user').sort({ scheduledFor: 1 }).limit(100);
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch workouts', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { user, title, notes, scheduledFor, completed = false } = req.body;
        const workout = await workout_1.default.create({ user, title, notes, scheduledFor, completed });
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create workout', details: error });
    }
});
exports.default = router;
