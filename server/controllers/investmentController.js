const mongoose = require("mongoose");
const Investment = require("../models/Investment");

exports.add = async (req, res) => {
  try {
    const { assetType, quantity, purchasePrice, date } = req.body;
    const newInvestment = new Investment({
      user: req.user.id,
      assetType,
      quantity,
      purchasePrice,
      date,
    });
    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error("Error adding investment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.id });
    res.json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.investmentSummary = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is obtained from authentication

    // Calculate dates using JavaScript Date objects
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    const aggregateOptions = [
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          todayTotal: {
            $sum: {
              $cond: [
                { $gte: ["$date", today] },
                { $multiply: ["$quantity", "$purchasePrice"] },
                0,
              ],
            },
          },
          last7DaysTotal: {
            $sum: {
              $cond: [
                { $gte: ["$date", last7Days] },
                { $multiply: ["$quantity", "$purchasePrice"] },
                0,
              ],
            },
          },
          last30DaysTotal: {
            $sum: {
              $cond: [
                { $gte: ["$date", last30Days] },
                { $multiply: ["$quantity", "$purchasePrice"] },
                0,
              ],
            },
          },
          totalTillNow: {
            $sum: { $multiply: ["$quantity", "$purchasePrice"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          todayTotal: 1,
          last7DaysTotal: 1,
          last30DaysTotal: 1,
          totalTillNow: 1,
        },
      },
    ];

    const summary = await Investment.aggregate(aggregateOptions);

    res.json(
      summary.length > 0
        ? summary[0]
        : {
            todayTotal: 0,
            last7DaysTotal: 0,
            last30DaysTotal: 0,
            totalTillNow: 0,
          }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.investmentAllocations = async (req, res) => {
  try {
    const userId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(userId);

    const allocationData = await Investment.aggregate([
      { $match: { user: objectId } },
      {
        $group: {
          _id: "$assetType",
          totalValue: { $sum: { $multiply: ["$quantity", "$purchasePrice"] } },
        },
      },
      {
        $project: {
          _id: 0,
          assetType: "$_id",
          totalValue: 1,
        },
      },
    ]);

    res.json(allocationData);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.metrics = async (req, res) => {
  try {
    const userId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(userId);
    const performanceComparison = await Investment.aggregate([
      { $match: { user: objectId } },
      {
        $group: {
          _id: "$assetType",
          totalInvestment: {
            $sum: { $multiply: ["$quantity", "$purchasePrice"] },
          },
        },
      },
    ]);
    res.json(performanceComparison);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.marketTrend = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            assetType: "$assetType",
          },
          totalInvestment: {
            $sum: { $multiply: ["$quantity", "$purchasePrice"] },
          },
        },
      },
    ];

    const marketTrendData = await Investment.aggregate(pipeline);
    res.json(marketTrendData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
