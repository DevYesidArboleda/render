import app from './app.js'
import { connectDB } from './db.js'

const port = process.env.PORT || 9000;

connectDB();
app.listen(port)
app.get('/', (res, req) => {
    res.send('Hello Yesid')
})

console.log("El servidor esta en el puerto ", port)