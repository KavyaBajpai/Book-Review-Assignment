import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
function WriteReview() {
    const [bookTitle, setBookTitle] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!bookTitle.trim() || !reviewText.trim() || !rating) {
            alert("Please fill out all fields including rating.");
            return;
        }
        
        console.log(bookTitle, reviewText, rating)
        try {
            //checking if entered book title exists or not.
            const bookRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/getByTitle?title=${encodeURIComponent(bookTitle)}`);
            console.log('Book response:', bookRes);
            const bookData = await bookRes.json();
            
            console.log('Fetched book data:', bookData);
            if (!bookData.success || !bookData.data) {
                toast.error("Book not found. Please make sure you've entered the correct title.");
                
                return;
            }
    
            const bookId = bookData.data.id;
            const token = localStorage.getItem('token');
            console.log(token)
            //calling api to add review to the book's db.
            const reviewRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookId,
                    
                    rating: Number(rating),
                    reviewText
                }),
            });
            console.log('Review response:', reviewRes);
            if (!reviewRes.ok) {
                throw new Error('Failed to submit review');
            }
    
            const reviewResult = await reviewRes.json();
            toast.success("Review submitted successfully!");
            
            console.log(reviewResult);
            setBookTitle('');
            setReviewText('');
            setRating('');
        } catch (error) {
            console.error(error);
            toast.error("There was an error submitting your review.");
            
        }
    };
    
    return (
        <>
            <div>
                <h1 className='text-3xl font-bold text-center mt-10 text-white'>Write a Review</h1>
                <form className='max-w-lg mx-auto mt-5 flex justify-center items-center flex-col gap-4 w-2/3'>
                    <div className='mb-4 w-full'>
                        <label htmlFor='bookTitle' className='block text-white mb-1'>Book Title :</label>
                        <input type='text' id='bookTitle' value={bookTitle} onChange={(e) => { setBookTitle(e.target.value) }} className='w-full p-2 border bg-gray-600 border-gray-600 text-white rounded' required />
                    </div>
                    <div className='mb-4 w-full'>
                        <label htmlFor='reviewText' className='block text-white mb-1'>Your Review :</label>
                        <textarea id='reviewText' rows='5' value={reviewText} onChange={(e) => { setReviewText(e.target.value) }} className='w-full p-2 border  bg-gray-600 border-gray-600 text-white rounded' required></textarea>
                    </div>
                    <div className='mb-4 w-full'>
          <label htmlFor='rating' className='block text-white mb-1'>Rating (1 to 5):</label>
          <select
            id='rating'
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className='w-full p-2 border bg-gray-600 border-gray-600 text-white rounded'
            required
          >
            <option value=''>Select Rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{`${star} `}</option>
            ))}
          </select>
        </div>
                    <button type='submit' className='bg-gray-700 text-white px-4 py-2 rounded' onClick={ handleSubmit}>Submit Review</button>
                </form>
            </div>

            <ToastContainer />
        </>
    )
}

export default WriteReview
