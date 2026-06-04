import { Order } from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
        success: false,
      });
    }

    const order = await Order.create({
      user: req.id, 
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.id });

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "fullname email");

    return res.status(200).json({
      success: true,
      orders,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    return res.status(200).json({
      message: "Order marked as delivered",
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};