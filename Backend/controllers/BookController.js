import { db } from '../utils/config.js';  
import { users } from '../utils/schema/UserSchema.js';  
import { eq, ilike } from 'drizzle-orm';
import { books } from '../utils/schema/BookSchema.js';
import { reviews } from '../utils/schema/ReviewSchema.js';

const getAllBooks = async (req, res) => {
    try {
      const { search = "", genre } = req.query;
      // offset = (page - 1) * limit;
  
      let query = db.select().from(books);
  
      if (search) {
        query = query.where(ilike(books.title, `%${search}%`));
      }
  
      if (genre) {
        query = query.where(ilike(books.genre, `%${genre}%`));
      }
  
      const allBooks = await query;
  
      return res.json({ success: true, data: allBooks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to fetch books' });
    }
  };

 const getSingleBook = async (req, res) => {
    const { bookId } = req.params;

    try {
      // Fetch book info
      const bookData = await db
        .select()
        .from(books)
        .where(eq(books.id,Number(bookId) ));
  
      if (bookData.length === 0) {
        return res.status(404).json({ success: false, message: "Book not found" });
      }
  
      const book = bookData[0];
  
      // Fetch all reviews for this book with usernames
      const bookReviews = await db
        .select({
          reviewId: reviews.id,
          rating: reviews.rating,
          reviewText: reviews.reviewText,
          createdAt: reviews.createdAt,
          username: users.username,
        })
        .from(reviews)
        .leftJoin(users, eq(reviews.userId, users.id))
        .where(eq(reviews.bookId, Number(bookId)));
  
      return res.json({
        success: true,
        book,
        reviews: bookReviews,
      });
    } catch (error) {
      console.error("Error getting single book:", error);
      return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
  };

  // controller
const getBookByTitle = async (req, res) => {
  const { title } = req.query;
  try {
      const book = await db.select().from(books).where(ilike(books.title, title));
      if (!book.length) {
          return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({success:true, data: book[0] });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

  
  
  export { getAllBooks, getSingleBook, getBookByTitle };