const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/studentRoutes')

// setup
dotenv.config()

// App
const app = express()
app.use(express.json())

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, // convert from bson to json
  useUnifiedTopology: true
})
.then(() => console.log('✅Connected to Atlas'))
.catch((err) => console.log('❌Connection error'))

// Routes
app.use('/students', studentRoutes)



// Create
// app.post('/student', async(req,res) =>{
//   try{
//     const student = new Stud(req.body);// user will input the data first here and then the next line will be implemented
//     const saved = await student.save() //.save is a method of mongoose
//     res.status(201).json(saved)
//   }catch (error){
//     res.status(400).json({error: err.message})
//   }
// })

// // Read
// app.get('/students', async(req,res) =>{
//   const students = await Stud.find();
//   res.json(students)
// })

// // Read by id
// app.get('/students/:id', async(req,res) =>{
//   try{
//     const student = await Stud.findById(req.params.id);
//     res.json(student)
//     if(!student){
//       return res.status(404).json({message: 'Not found'})
//     }
//   }catch(err){
//     res.status(500).json.apply({error: err.message})
//   }
// })

// app.put('/student/:id', async(req,res) =>{
//   try{
//     const updated = await Stud.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new: true}
//     );
//     res.json(updated)
//   }catch(error){
//     res.status(500).json({error:err.message})
//   }
// })

// // Delete
// app.delete('/student/:id', async(req,res) =>{
//   try{
//     await Stud.findByIdAndDelete(req.params.id);
//     res.json({message: 'Student Deleted'})
//   }catch(error){
//     res.status(500).json({error: err.message})
//   }
// })

// app.get('/', (req,res) =>{
//   res.send('hello from js')
// })

// server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})