import SensorData from "../models/sensorData.model.js";

export const postSensorData = async (req, res) => {
  const { device, temperature, humidity, tvoc, airQualityStatus } = req.body;

  try {
    const newData = new SensorData({
      device,
      temperature,
      humidity,
      tvoc,
      airQualityStatus,
    });

    await newData.save();

    req.io.emit("newSensorData", newData);

    return res.status(201).json({
      success: true,
      message: "Sensor data saved successfully",
      data: newData,
    });
  } catch (error) {
    console.error("Error saving sensor data:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching all sensor data:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getLatestSensorData = async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ createdAt: -1 });
    if (!latestData) {
      return res
        .status(404)
        .json({ success: false, message: "No data found." });
    }

    res.status(200).json({ success: true, data: latestData });
  } catch (error) {
    console.error("Error fetching latest sensor data:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
