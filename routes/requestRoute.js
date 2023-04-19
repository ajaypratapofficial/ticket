import express from "express";
import formidable from "express-formidable";
import { isCustomer, requireSignIn } from "../middlewares/authMiddlewares.js";

import { requestController } from "../controllers/requestControllers.js";

const router = express.Router();

router.post("/create-request", requireSignIn, isCustomer, formidable(), requestController);

export default router;





// {
//     "productType":"Mobile",
//     "issueType":["Mobile","sdvdsvsf"],
//     "issueDescription": "MobileMobile",
//     "policyUpload":"Mobile",
//     "invoiceNumber":"002"
// }

