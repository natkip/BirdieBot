const express = require('express');
const router = express.Router();

router.post('/suggest', (req, res) => {
  const { title } = req.body;

  const suggestions = {
    priority: 'Normal',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
  };

  if (title.toLowerCase().includes('urgent')) {
    suggestions.priority = 'High';
    suggestions.dueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day later
  }

  if (title.toLowerCase().includes('project')) {
    suggestions.priority = 'High';
    suggestions.dueDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days later
  }

  if (title.toLowerCase().includes('homework')) {
    suggestions.priority = 'High';
    suggestions.dueDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days later
  }

  res.json(suggestions);
});

module.exports = router;
