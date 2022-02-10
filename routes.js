const express = require('express')
const RC = require('./controller.js');

const router = express.Router();

router.post('/reminders', RC.createReminder);
router.get('/reminders', RC.getAllReminders);
router.get('/reminders/:id', RC.getReminderById);
router.patch('/reminders', RC.editReminder);
router.delete('/reminders', RC.deleteReminder);

module.exports = router
