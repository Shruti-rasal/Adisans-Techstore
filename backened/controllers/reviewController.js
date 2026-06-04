import Review from "../models/review.model.js";


export const createReview = async (req, res) => {
  try {
    const { rating, comment, product } = req.body;

    if (!rating || !comment || !product) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const review = await Review.create({
      user: req.id, 
      product,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId })
      .populate("user", "name");

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

  
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};