// Calculate the insurance quote based on the car value and risk rating.
function calculateInsuranceQuote(car_value, risk_rating) {
  try {
    // Check if the risk rating is zero and throw an error if it is
    if (risk_rating === 0) {
      throw new Error("Risk rating cannot be zero");
    }

    // Calculate the yearly premium based on the car value and risk rating
    let yearlyPremium = ((car_value * risk_rating) / 100).toFixed(2);

    // Calculate the monthly premium by dividing the yearly premium by 12
    let monthlyPremium = (yearlyPremium / 12).toFixed(2);

    // Return an object with the insurance quote containing yearly and monthly premiums
    return {
      insurance_quote: {
        yearly_premium: parseFloat(yearlyPremium),
        monthly_premium: parseFloat(monthlyPremium),
      },
    };
  } catch (error) {
    // If any error occurs during the calculation, return an object with an error message
    return { error: "There is an error" };
  }
}

// Export the calculateInsuranceQuote function for use in other modules
module.exports = calculateInsuranceQuote;
