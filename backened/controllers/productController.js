import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      image,
      countInStock,
    } = req.body;

    if (!name || !price || !description || !category || !image) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
      countInStock,
    });

    return res.status(201).json({
      message: "Product added successfully",
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const { name, price, description, category, image, countInStock } = req.body;

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (image) product.image = image;
    if (countInStock !== undefined) product.countInStock = countInStock;

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};