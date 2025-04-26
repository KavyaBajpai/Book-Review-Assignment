import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen  py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-100 mb-4">About Us</h1>
          <p className="text-lg text-gray-100">
            Welcome to <span className="text-primary">Voice & Verse</span> — A place to connect through books!
          </p>
        </div>
        <div className=" opacity-80 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-white leading-relaxed mb-12">
            Our mission is to provide an inclusive platform where readers can discover new books, write thoughtful reviews, and engage with a community of like-minded individuals. We aim to foster a love for reading and writing, and empower people to share their experiences with the stories that shape our lives.
          </p>
          <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Book Reviews</h3>
              <p className="text-gray-600">
                We offer in-depth and honest reviews of the latest books across various genres. From fiction to non-fiction, fantasy to historical, we cover it all.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Reader Community</h3>
              <p className="text-gray-600">
                Join discussions, share your opinions, and find recommendations based on what you love to read. We encourage an open exchange of ideas to help you find your next great read.
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg text-white mb-12">
            <li><strong>Integrity:</strong> We believe in transparency and honesty in all of our reviews and interactions.</li>
            <li><strong>Inclusivity:</strong> Everyone’s voice matters. Our community is open to readers and writers from all walks of life.</li>
            <li><strong>Passion for Books:</strong> We love books and everything that comes with them. Our team is driven by a shared passion for literature, and we aim to inspire that same passion in our audience.</li>
          </ul>
          <h2 className="text-2xl font-bold text-white mb-4">Join Us!</h2>
          <p className="text-lg text-white mb-12">
            We invite you to explore our growing collection of reviews, write your own, and become a part of the <span className="text-primary">Voice & Verse</span> community. Let’s talk books, connect, and make the world of literature even more exciting!
          </p>
          <div className="text-center">
            <button className="bg-primary text-white py-2 px-6 bg-gray-700 hover:translate-z-1 hover:scale-105  duration-300 rounded-full hover:bg-gray-900 transition-all">
              Explore Our Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
