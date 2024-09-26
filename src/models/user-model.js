import db from "../config/db.js";
import bcrypt from "bcrypt";

const userSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: Object,
    required: false,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  permissão: {
    type: String,
    enum: ["ADM", "REC", "TOSA", "USU"],
    required: true,
    default: "TOSA",
  },
});


userSchema.pre("save", async function () {
  // if (this.password !== this.confirmar_password) {} // Da pra deixar essa validação só no front

  // Monta o hash criptografado
  this.password = await bcrypt.hash(this.password, 10);
});

// Define um método para a classe
userSchema.methods.senhaCorreta = async function (senha) {
  return await bcrypt.compare(senha, this.password);
};

const User = db.model("User", userSchema);

export default User;
