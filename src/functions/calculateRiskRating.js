// Function to calculate the risk rating based on occurrences of trigger words in claim history
function calculateRiskRating(claim_history) {
    // Define trigger words to check for in the claim history
    const triggerWords = ["collide", "crash", "scratch", "bump", "smash"];

    try {
        // Convert the claim history to lowercase for case-insensitive matching
        claim_history = claim_history.toLowerCase();

        // Initialize the risk rating variable
        let riskRating = 0;

        // Loop through each trigger word to count occurrences in the claim history
        for (const word of triggerWords) {
            // Use a regular expression to match the word globally in the string
            const occurrences = (claim_history.match(new RegExp(word, "g")) || []).length;

            // Increment the riskRating by the number of occurrences for the current trigger word
            riskRating += occurrences;
        }

        // Limit the overall riskRating to 5
        riskRating = Math.min(riskRating, 5);

        // Return the calculated risk rating as an object
        return { risk_rating: riskRating };
    } catch (error) {
        // If any error occurs during the calculation, return an error message
        return { error: "There is an error" };
    }
}

// Export the calculateRiskRating function for use in other modules
module.exports = calculateRiskRating;
