import mongoose from "mongoose";

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Conectado com sucesso!");
  } catch (error) {
    console.log(error);
  }
};

main();

export default mongoose