import express from "express";
import { PartFinder, PartPPV } from "../controller/finderController.js";

const router = express.Router();

router.get("/info", async (req, res) => {
  const query = req.query.query || ""; // Retrieve query parameter from URL

  try {
    const cpuInfo = await PartFinder(query);
    res.json(cpuInfo);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.get("/ppv", PartPPV);

export default router;
