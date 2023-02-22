export default {
DB: {
      URI:
        process.env.MONGODB_URI ||
        "mongodb+srv://movilesproyecto:12345@cluster0.htp15ow.mongodb.net/test",
   
      USER: process.env.MONGODB_USER || "",
  
      PASSWORD: process.env.MONGODB_PASSWORD || "",
  
      NAME: process.env.MONGODB_NAME || "",
  
      LAST_NAME: process.env.MONGODB_NAME || "",
  

    },
  };