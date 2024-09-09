const usersModel = require("../Models/usersModel");
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



const getDashboard = async (req, res) => {
  try {
    // Ensure userId is properly declared
    const userId = req.body.id;

    // Fetch user data excluding the password field
    const userData = await usersModel.findById(userId).select("-password");

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Send the user data in the response
    res.json({ success: true, userData });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};


const AIResponse = async (req, res) => {
  try {
    // Ensure userId is properly declared
    const userId = req.body.id;

    // Fetch the message from the request body
    const message = req.body.message;
    console.log(message);


    // Example of calling the OpenAI API
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    console.log( aiResponse.choices[0].message.content);

    // Send the user data and AI response in the response
    res.json({
      success: true,
      aiResponse: aiResponse.choices[0].message.content,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}

module.exports =  {getDashboard, AIResponse}; ;

