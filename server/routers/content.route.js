import express from "express";
import contentController from "../controllers/content.controller.js";
const router=express.Router()

//generate router
router.post("/generate",contentController.promptController)

//history
router.post("/history",contentController.historyController)

export default router