
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

app.post('/vehicle', upload.single('logbook'), async (req, res) => {
  const { make, model, badge } = req.body;
  const content = await fs.readFile(req.file.path,'utf-8');
  await fs.unlink(req.file.path);
  res.json({ make, model, badge, logbook: content });
});

app.listen(4000);
