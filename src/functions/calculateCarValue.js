// Function to calculate the car value based on the provided model and year
function calculateCarValue(model, year) {
    try {
      // Remove spaces and convert the model to uppercase
      model = model.replace(/\s/g, "").toUpperCase();
  
      // Convert the characters of the model to an array, then filter and map to calculate alphabet positions
      const alphabetPositions = [...model]
        // Filter out non-alphabetic characters (keeping only A-Z)
        .filter((char) => /[A-Z]/.test(char))
        /* 
        # Map each remaining character to its alphabet position (1 for A, 2 for B, etc.)
  
          Let's use an example to illustrate. Consider the character 'C':
  
            * char.charCodeAt(0): This part retrieves the Unicode code point of the character. For 'C', the code point is 67.
  
            * 'A'.charCodeAt(0): This part retrieves the Unicode code point of the letter 'A', which is 65.
  
            * Subtracting these two values: 67 - 65 = 2. This gives the relative position of 'C' with respect to 'A'.
  
            * Finally, add 1: 2 + 1 = 3. This adjustment is made because in the context of this code, 'A' is considered to be at position 1, 'B' at position 2, and so on.
  
        So, for the character 'C', this code calculates its position in the alphabet, which is 3. This logic is applied to each character in the string, resulting in an array of positions.
  
        Here's the breakdown for a few characters:
  
            'A': (65 - 65) + 1 = 1
            'B': (66 - 65) + 1 = 2
            'C': (67 - 65) + 1 = 3
            etc...
         */
        .map((char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1);
  
      // Calculate the car value based on the alphabet positions, with an additional weight for the year
      const carValue =
        alphabetPositions
          // Use reduce to sum up all the alphabet positions
          .reduce((acc, position) => acc + position, 0) *
          // Multiply the sum by 100 to scale the value, then add the provided year
          100 +
        year;
  
      return { car_value: carValue };
    } catch (error) {
      // If any error occurs during the calculation, return an error message
      return { error: "There is an error" };
    }
  }

  module.exports = calculateCarValue;