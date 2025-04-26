📚 Write a Book Review
This project allows users to submit reviews for books by entering the book title, writing their thoughts, and assigning a rating between 1 to 5 stars.

✨ Features
Enter the book title and search for it in the database.

Write a text review about the book.

Assign a rating from 1 to 5 stars.

Create an account and add reviews.

View books and all of the reviews on them.

Error handling if the book is not found or the submission fails.

Success and error notifications using React Toastify.

Secure review submission with JWT-based authentication.

🛠 Tech Stack
Frontend: React.js, Tailwind CSS

Backend APIs: Node.js, Express.js

Backend: Neon DB, Drizzle-ORM

Authentication: JWT (Token-based auth)

Notifications: React-Toastify

📝 Usage Instructions
Login to your account (to get the token stored in localStorage).

Browse the books in the database.

Enter the exact book title as registered in the database.

Fill in the review text and select a rating.

Click Submit Review.

A success or error toast message will appear based on the outcome.

📂 API Endpoints Used

GET /api/books/getByTitle?title={book-title} → Fetch book details by title.
GET /api/books/getAllBooks -> Search among books with title and genre
GET /api/books/getSingleBook -> Get the details of one specific book

POST /api/reviews/add → Add a new review (requires Authorization Bearer Token).
POST /api/reviews/getAllReviews → Get all the reviews written by the logged in user
POST /api/reviews/deleteReview -> delete review (not implemented)
POST /api/reviews/updateReview -> update review (not implemented)

POST /api/user/login -> Login using email and password
POST /api/user/register -> Register for a new account with username, email and password
POST /api/user/logout -> Logout (not implemented)


⚡ Improvements for Future
Add missing route for admin to add books.

Add AI integration for review refining.

Add API to update the profile.

Add auto-suggestions while typing the book title.

🙌 Acknowledgments
Special thanks to all open-source contributors who made libraries like React Toastify and Tailwind CSS available!

