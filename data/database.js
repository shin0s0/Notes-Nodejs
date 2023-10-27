const mongoose= require("mongoose");
mongoose.set('strictQuery', false);


 exports.connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName:"Notes",
    })
    .then((c)=>console.log(`Database conected ${c.connection.host}`))
    .catch((e) => console.log(e));
}
