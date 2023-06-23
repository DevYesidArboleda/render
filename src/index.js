import app from './app.js'
import { connectDB } from './db.js'

connectDB();
app.listen(9000)

console.log("El servidor esta en el puerto ", 9000)