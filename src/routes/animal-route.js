import { Router } from "express";
import {
  store,
  index,
  show,
  update,
  destroy,
} from "../controllers/animal-controller.js";

import check_token from "../middleware/check_token.js";
import check_role from "../middleware/check_role.js";

const router = Router();

/* 
Onde está o check_token o usuario tem que estar logado
tanto faz o nivel de acesso

Onde está o check_role ai depende do nivel de acesso
*/
router.post("/", check_token, check_role(["ADM", "REC"]), store); // Somente adm
router.get("/", check_token, check_role(["ADM", "REC", "TOSA"]), index); // Somente usuário
router.get("/:id", check_token, check_role(["ADM", "REC", "TOSA"]), show);
router.put("/:id", check_token, check_role(["ADM", "REC"]), update);
router.delete("/:id", check_token, check_role(["ADM"]), destroy);

export default router;
