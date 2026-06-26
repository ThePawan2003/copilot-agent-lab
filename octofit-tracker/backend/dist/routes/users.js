"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await user_1.default.find().limit(50);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users', details: error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch user', details: error });
    }
});
router.post('/', async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await user_1.default.create({ name, email, role });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user', details: error });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await user_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to update user', details: error });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await user_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to delete user', details: error });
    }
});
exports.default = router;
