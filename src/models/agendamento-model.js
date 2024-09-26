import db from "../config/db.js";

const agendamentoSchema = new db.Schema({
  data: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  animal_id: {
    type: String,
    ref: "Animal",
    required: true,
  },
  user_id: {
    type: db.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Agendamento = db.model("Agendamento", agendamentoSchema);

export default Agendamento;
