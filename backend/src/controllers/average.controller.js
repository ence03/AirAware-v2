import Average from "../models/average.model.js";

export const createAverage = async (req, res) => {
  const {
    deviceId,
    type,
    avgTemperature,
    avgHumidity,
    avgTVOC,
    airQualityStatus,
  } = req.body;

  try {
    const newAverage = new Average({
      deviceId,
      type,
      avgTemperature,
      avgHumidity,
      avgTVOC,
      airQualityStatus,
    });

    await newAverage.save();

    return res.status(201).json({
      success: true,
      message: "Average Stored",
      data: newAverage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to store average",
      error,
    });
  }
};

export const getAllAverage = async (req, res) => {
  try {
    const averages = await Average.find().populate("deviceId", "name");
    if (!averages) {
      return res.status(404).json({
        success: false,
        message: "No averages found",
      });
    }

    return res.status(200).json({
      success: true,
      data: averages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve averages, error: ",
      error,
    });
  }
};
