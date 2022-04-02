const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json({tasks});
    } catch (error) {
        res.status(500).json({ error})
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error})
    }
}

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            "_id": req.params.id
        })
        if(!task){
            return res.status(404).json({ "error": `Task not found with id: ${req.params.id}` })
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({ error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            "_id": req.params.id
        })
        if(!task){
            return res.status(404).json({ "error": `Task not found with id: ${req.params.id}` })
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({ error})
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({"_id": req.params.id,}, req.body, {
            new: true,
            runValidators: true
        })
        if(!task){
            return res.status(404).json({ "error": `Task not found with id: ${req.params.id}` })
        }
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({ error})
    }
    res.send('Task updated');
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}