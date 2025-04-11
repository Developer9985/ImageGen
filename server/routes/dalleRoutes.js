import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';

dotenv.config();
const router = express.Router();

// Stability AI API Key check
//console.log("STABILITY_API_KEY:", process.env.STABILITY_API_KEY); // Debugging

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Stability AI!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // FormData object banao Stability AI ke liye
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_format', 'jpeg'); // Ya 'png' choose kar sakta hai

    // Optional parameters (jaise documentation mein diya hai)
    formData.append('model', 'sd3.5-large'); // Default model, ya turbo/medium choose kar
    formData.append('aspect_ratio', '1:1'); // Aspect ratio set kar sakta hai
    formData.append('cfg_scale', 4); // Prompt adherence control

    // Stability AI API call
    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/sd3',
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: 'application/json', // Base64 JSON response ke liye
          ...formData.getHeaders(), // FormData ke headers automatically add ho jayenge
        },
        responseType: 'json', // JSON response expect kar rahe hain
      }
    );

    // Response mein base64 encoded image aayega
    const imageBase64 = response.data.image; // Stability AI base64 string deta hai
    res.status(200).json({ photo: imageBase64 });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Something went wrong with Stability AI');
  }
});

export default router;