import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {  useParams, useNavigate } from 'react-router-dom'

function Book() {
  const {bookId} = useParams()
  const [bookTitle, setBookTitle] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [bookReviews, setBookReviews] = useState([])
  const [bookRating, setBookRating] = useState(0)
  const [bookGenre, setBookGenre] = useState('')
  const navigate = useNavigate()
  console.log(bookId)

  const fetchDetails = async () => {
     try{
         
        const response = await fetch(`http://localhost:4000/api/books/getBook/${bookId}`)
        const data = await response.json()
        console.log(data)
        if(data.success){
            setBookTitle(data.book.title)
            setBookAuthor(data.book.author)
            setBookDescription(data.book.description)
            setBookReviews(data.reviews)
            setBookRating(data.book.averageRating)
            setBookGenre(data.book.genre)
         
            console.log('Fetched data:', {
              title: bookTitle,
              author: bookAuthor,
              description: bookDescription,
              reviews: bookReviews,
              rating: bookRating,
              genre: bookGenre
            })
         }
         
        else{
           console.error('Failed to fetch book details')
        }
     }
     catch( error)
     {
        console.error('Error fetching book details:', error)
        
     }
  }

  const handleNavigate = () => {
   navigate('/write-review')
  }

  useEffect(() => {
    if (bookId) {
      fetchDetails();
    }
  }, [bookId]);
  
  
  useEffect(() => {
    console.log('Fetched data after state updated:', {
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
      reviews: bookReviews,
      rating: bookRating,
      genre: bookGenre
    });
  }, [bookTitle, bookAuthor, bookDescription, bookReviews, bookRating, bookGenre]);
  
  return (
    <> {
         bookTitle ? 
         <div className="text-white min-h-screen flex flex-col items-center py-10 px-4">
        
        {/* Book Title Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">{bookTitle}</h1>
          <p className="text-lg text-gray-300">by {bookAuthor}</p>
          <p className="mt-2 w-2/3 text-md max-w-2xl text-gray-300">{bookDescription}</p>
        </div>
  
        {/* Book Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 opacity-80 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2 ">Genre</h3>
            <p className="">{bookGenre}</p>
          </div>
          <div className="bg-gray-800 opacity-80 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Rating</h3>
            <p className="">{bookRating}/5</p>
          </div>
        </div>
  
        {/* Reviews Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Reviews</h2>
          <div className="flex flex-col gap-6">
            {bookReviews.length > 0 ? (
              bookReviews.map((review) => (
                <div key={review.reviewId} className="bg-gray-800 opacity-80 p-6 rounded-lg shadow-md">
                  <div className='flex items-center gap-3'>
                  <div className='bg-gray-400 text-white rounded-full h-8 w-8 flex justify-center items-center font-semibold'><p className='flex justify-center items-center'>{review.username.charAt(0)}</p></div>
                  <p className="font-semibold text-lg">{review.username}</p>
                  </div>
                  <p className="text-gray-300 mt-2">"{review.reviewText}"</p>
                  <p className="text-yellow-300 mt-2">Rating: {review.rating}/5</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No reviews yet.</p>
            )}
          </div>
        </div>

        <div className='bg-gray-500 mt-4 text-white cursor-pointer hover:scale-105 hover:bg-gray-400 rounded-full h-10 w-10 flex justify-center items-center font-semibold'>
        <Plus onClick={()=>handleNavigate()}/>
        </div>
        
      </div> :
      <div className='flex justify-center items-center h-screen'>

      <div className='flex flex-col gap-3 w-2/3 rounded-lg justify-center items-center h-screen opacity-80'>

        <div className='w-2/3 h-24 rounded-lg flex bg-gray-500 opacity-80 animate-pulse'></div>
        <div className='w-2/3 h-24 rounded-lg flex bg-gray-500 opacity-80 animate-pulse'></div>
        <div className='w-2/3 h-24 rounded-lg flex bg-gray-500 opacity-80 animate-pulse'></div>
      </div>
      </div>
    }
      
    </>
  )
  
}

export default Book
