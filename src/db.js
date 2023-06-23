import  mongoose  from "mongoose";

// mongodb connection
export const connectDB = async () => {
    mongoose
    .connect("mongodb+srv://yesison714:Yesidal92@cluster0.irnebw9.mongodb.net/")
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));
}