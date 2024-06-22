const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const investmentController = require("../controllers/investmentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getUser);

router.post("/investments/add", authMiddleware, investmentController.add);
router.get("/investments/list", authMiddleware, investmentController.list);
router.get(
  "/investments/summary",
  authMiddleware,
  investmentController.investmentSummary
);
router.get(
  "/investments/allocations",
  authMiddleware,
  investmentController.investmentAllocations
);
router.get(
  "/investments/metrics",
  authMiddleware,
  investmentController.metrics
);
router.get(
  "/investments/trend",
  authMiddleware,
  investmentController.marketTrend
);

module.exports = router;
