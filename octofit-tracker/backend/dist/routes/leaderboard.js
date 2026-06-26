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
        const leaderboard = await activity_1.default.aggregate([
            {
                $group: {
                    _id: '$user',
                    totalDistance: { $sum: '$distanceKm' },
                    totalCalories: { $sum: '$calories' },
                    totalDuration: { $sum: '$durationMinutes' },
                    activities: { $sum: 1 },
                },
            },
            { $sort: { totalDistance: -1, totalCalories: -1 } },
            { $limit: 20 },
        ]);
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch leaderboard', details: error });
    }
});
exports.default = router;
