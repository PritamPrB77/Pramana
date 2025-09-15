const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data"); // ✅ import here

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

// Multer setup
const upload = multer({ dest: "uploads/" });

app.post("/api/identify", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const apiKey = "2b107Lsg3QBYi24PrEwz3";

    // ✅ Use form-data package
    const formData = new FormData();
    formData.append("images", fs.createReadStream(req.file.path));
    formData.append("organs", "leaf");

    const response = await axios.post(
      `https://my-api.plantnet.org/v2/identify/all?api-key=${apiKey}`,
      formData,
      { headers: formData.getHeaders() } // ✅ works now
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
