const models = require('./models');
const moment = require('moment')
const { Op } = require("sequelize");


const createReminder = async (req, res) => {
    try{
        const reminder = await models.Reminder.create({
            user: req.body.user,
            description: req.body.description,
            date: req.body.date
        })

        return res.status(201).json({
            success: true,
            data: reminder
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

const getAllReminders = async (req, res) => {
    const { after, user} = req.query
    let condition = {};
    const dates = parseInt(after)

    const filter =  {
            [Op.and]: {
                user: user,
                date: { [Op.gte]: dates }
            }
            
        }


    try {
        if (user) {
            condition = {
                where: filter
            }
        }

        const reminders = await models.Reminder.findAll(condition)

        if(!reminders) {
            return res.status(404).json({
                success: false,
                data: "not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: reminders
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

const getReminderById = async (req, res) => {
    try{
        const data = await models.Reminder.findByPk(req.params.id)
        if(!data) {
            return res.status(404).json({
                success: false,
                message: "ID not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

const editReminder = async (req, res) => {
    return res.status(405).json({
        success: false,
    })
}

const deleteReminder = async (req, res) => {
    return res.status(405).json({
        success: false
    })
}

module.exports = { createReminder, getAllReminders, getReminderById, editReminder, deleteReminder }