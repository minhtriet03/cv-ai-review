const pdfParse = require("pdf-parse");

router.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const pdfData = await pdfParse(fileBuffer);

    const newCV = new CV({
      filename: req.file.originalname,
      filePath: req.file.path,
      content: pdfData.text, // Lưu nội dung PDF vào MongoDB
    });

    await newCV.save();
    res
      .status(200)
      .json({ message: "CV uploaded and extracted successfully!", cv: newCV });
  } catch (error) {
    res.status(500).json({ message: "Upload failed!", error });
  }
});
