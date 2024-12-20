import Device from "../models/device.model.js";
import mongoose from "mongoose";

export const createDevice = async (req, res) => {
  try {
    const { name, user, relayState, operationDuration, location } = req.body;

    const device = new Device({
      name,
      user,
      relayState,
      operationDuration,
      location,
    });

    await device.save();
    return res
      .status(201)
      .json({ success: true, message: "Device added", data: device });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate("user", "username email");
    res.status(200).json({ success: true, data: devices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id format, try again",
      });
    }

    const device = await Device.findById({ _id: id }).populate(
      "user",
      "username email"
    );

    if (!device) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    res.status(200).json({ success: true, data: device });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id format, try again",
      });
    }

    const updatedDevice = await Device.findByIdAndUpdate({ _id: id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDevice) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    res.status(200).json({ success: true, data: updatedDevice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id format, try again",
      });
    }

    const deletedDevice = await Device.findByIdAndDelete({ _id: id });

    if (!deletedDevice) {
      return res
        .status(404)
        .json({ success: false, message: "Device not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
