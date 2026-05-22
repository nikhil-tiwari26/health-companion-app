
// This utility can be used server-side if you want to
// proxy AI calls through your backend instead of calling
// Anthropic directly from the frontend

const getAISuggestion = async (symptoms) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: `Patient symptoms: ${symptoms}. Give brief health suggestions.` }],
    }),
  });
  const data = await response.json();
  return data.content[0].text;
};

module.exports = { getAISuggestion };