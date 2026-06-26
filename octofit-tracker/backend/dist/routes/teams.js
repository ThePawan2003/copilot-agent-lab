"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await team_1.default.find().populate('members').limit(50);
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch teams', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, description, members = [] } = req.body;
        const team = await team_1.default.create({ name, description, members });
        res.status(201).json(team);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create team', details: error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await team_1.default.findById(req.params.id).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch team', details: error });
    }
});
exports.default = router;
