import  express  from "express";
import  morgan  from "morgan";
import authRoutes from "./routes/auth.routes.js"
import taksRoutes from "./routes/tasks.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()

let whitelist = ['http://localhost:5173','http://offcorss.myvtex.com','http://offcorss.myvtex.com/api/catalog_system/pub/products/search/']
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
  credentials:true
}));


/*app.use(cors({
    origin: ['http://localhost:5173','http://offcorss.myvtex.com/api/catalog_system/pub/products/search/'], 
    credentials:true,
}))*/


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use("/api",authRoutes);
app.use("/api", taksRoutes);

export default app;