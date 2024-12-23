import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Ya conectado
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    throw error;
  }
};

export default connect;
