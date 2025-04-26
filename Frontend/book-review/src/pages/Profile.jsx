import React, { useContext, useEffect } from 'react'

import { MainContext } from '../contexts/context.jsx'
function Profile() {
  const { userId, user } = useContext( MainContext )
  const [reviews, setReviews] = React.useState([])

  const fetchReviews = async () => {
    try{
      const queryParams = new URLSearchParams();
      if (userId) queryParams.append("userId", userId);
      const res = await fetch(`http://localhost:4000/api/reviews/getAll?${queryParams.toString()}`)
      const data = await res.json()
      console.log(data)
      console.log("Reviews:", data.reviews)
      setReviews(data.reviews || [])
    }
    catch (err) {
      console.error("Error fetching reviews:", err)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [userId])

  return (
    <div className="p-6">
  <h2 className="text-white ml-4 font-bold text-3xl mb-2">Hey, {user} 👋</h2>
  <h3 className="text-gray-300 ml-4 font-semibold text-xl mb-6">Here are your reviews:</h3>

  <div className="flex flex-col gap-6 ml-4">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div
          key={review.reviewId}
          className="bg-gray-800 w-4/5 opacity-80 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <h4 className="text-white font-bold text-lg mb-2">{review.bookTitle}</h4>
          <p className="text-gray-400 mb-4">{review.reviewText}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-semibold">Rating:</span>
            <span className="text-yellow-500">{review.rating} Stars </span>
          </div>
        </div>
      ))
    ) : (
      <p className=" text-white">You haven't written any reviews yet.</p>
    )}
  </div>
</div>

  )
}

export default Profile
