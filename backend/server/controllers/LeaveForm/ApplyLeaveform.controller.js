import express from 'express';
import mongoose from 'mongoose';

import  LeaveForm from '../../models/LeaveForm';

const app = express();

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect("mongodb://localhost:27017/Leave", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// POST route to save student data
app.post('/apply-leave', async (req, res) => {
  try {
    const { fullname, rollno, email, department, year,section ,startDate,endDate,reason,status} = req.body;

    const new_leave = new LeaveForm({
     fullname,
       rollno,
       email,
       department, 
       year,
       section ,
       startDate,
       endDate,
       reason,
       status
    });
    const savedLeave = await new_leave.save();
    res.status(201).json(savedLeave);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
 // console.log("Server running on port ${process.env.PORT}");
});