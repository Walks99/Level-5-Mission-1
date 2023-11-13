const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use the body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function calculateCarValue(model, year) {
  try {
    // Remove spaces and convert the model to uppercase
    model = model.replace(/\s/g, '').toUpperCase();

    // Calculate the car value based on business rules
    const alphabetPositions = [...model]
      .filter(char => /[A-Z]/.test(char))
      .map(char => char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);

    const carValue = alphabetPositions.reduce((acc, position) => acc + position, 0) * 100 + year;

    return { car_value: carValue };
  } catch (error) {
    // If any error occurs during the calculation, return an error message
    return { error: 'There is an error' };
  }
}

app.post('/calculateCarValue', (req, res) => {
  const { model, year } = req.body;

  if (!model || !year || typeof year !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = calculateCarValue(model, year);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
