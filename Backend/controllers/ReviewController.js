import { db } from "../utils/config.js";
import { books } from "../utils/schema/BookSchema.js";
import { eq, and } from "drizzle-orm";
import { reviews } from "../utils/schema/ReviewSchema.js";
import { users } from "../utils/schema/UserSchema.js";


const addReview = async (req, res) => {
    const { bookId, rating, reviewText } = req.body;
    const userId = req.user.id; 
    try { 
        if (!bookId || !userId || !rating || !reviewText) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }

        const book = await db.select().from(books).where(eq(books.id, bookId))
        const user = await db.select().from(users).where(eq(users.id, userId));
        if (!book.length || !user.length) {
            return res.status(404).json({ success: false, message: "Book or User not found" });
        }
        const newReview = await db
            .insert(reviews)
            .values({ bookId, userId, rating, reviewText });

        res.status(201).json({ success: true, message: "Review added successfully", review: newReview });

    }
    catch (error) {
      console.error('Error adding review:', error);  
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}


const getAllReviews = async (req, res) => {
  const { userId } = req.query;

  try {
    if ( !userId) {
      return res.status(400).json({ success: false, message: "Please Login first." });
    }

    const whereConditions = [];
    if (userId) whereConditions.push(eq(reviews.userId, Number(userId)));

    const result = await db
      .select({
        reviewId: reviews.id,
        rating: reviews.rating,
        reviewText: reviews.reviewText,
        createdAt: reviews.createdAt,
        bookTitle: books.title,
        username: users.username,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .innerJoin(books, eq(reviews.bookId, books.id))
      .where(and(...whereConditions));

    return res.json({ success: true, reviews: result });
  } catch (error) {
    console.error("Error getting reviews:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user?.id; 

  try {
    const existing = await db.select().from(reviews).where(eq(reviews.id, Number(reviewId)));

    if (!existing.length) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    
    if (existing[0].userId !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
    }

    await db.delete(reviews).where(eq(reviews.id, Number(reviewId)));

    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


 const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, reviewText } = req.body;
  const userId = req.user?.id;

  try {
    const existing = await db.select().from(reviews).where(eq(reviews.id, Number(reviewId)));

    if (!existing.length) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (existing[0].userId !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized to update this review" });
    }

    const updated = await db
      .update(reviews)
      .set({
        rating: rating ?? existing[0].rating,
        reviewText: reviewText ?? existing[0].reviewText,
      })
      .where(eq(reviews.id, Number(reviewId)))
      .returning();

    res.json({ success: true, message: "Review updated", review: updated[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export { addReview, getAllReviews, deleteReview, updateReview };

  


    
