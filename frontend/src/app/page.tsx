export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-60 px-4">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:space-x-12">
          {/* text stuff */}
          <div className="w-full md:w-1/2 text-left mt-8 md:mt-0">
            <h1 className="text-6xl font-bold text-black">OnTrack</h1>
            <p className="text-xl text-gray-500 mt-2">
              Your personalized AI education assistant.
            </p>
            <p className="text-black mt-8 max-w-lg">
              OnTrack is a personalized AI assistant designed to help students
              manage their classwork, goals, grades, and other commitments.
              Users can input details like grades, assignments, schedules, and
              events, and OnTrack provides personalized suggestions to
              prioritize tasks, adapting as new updates are shared. It also uses
              location-based information to suggest efficient transportation
              routes. With its adaptive chatbot, OnTrack offers advice and
              support tailored to the user’s needs.
            </p>
          </div>

          {/* image on the right */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/home/temp_img.png" // this image is temporary
              alt="Home Image"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section*/}

      <section id="features" className="px-6 pt-80 pb-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section (Left) */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Smart Chatbot Assistant
            </h1>
            <p className="text-gray-600 mb-6">
              {
                "Our intelligent chatbot is designed to provide instant support, streamline your queries, and guide you through tasks with ease. Whether you're uploading a syllabus or seeking quick answers, the chatbot is always ready to assist, keeping your workflow smooth and efficient."
              }
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Natural and conversational interface</li>
              <li>Instant responses tailored to your content</li>
              <li>Integrates directly with your dashboard</li>
              <li>Reduces time spent searching or waiting</li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/features-image.png"
              alt="Features Illustration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section (Left) */}
          <div className="flex justify-center">
            <img
              src="/features-image-2.png"
              alt="Another Feature"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>

          {/* Text Section (Right) */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Interactive Map Integration
            </h2>
            <p className="text-gray-600 mb-6">
              Navigate your data visually with our interactive map icon feature.
              Whether you're exploring location-based inputs or toggling views,
              the built-in map tools make orientation effortless and
              intuitive—perfect for keeping context without ever breaking focus.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Click-to-toggle map icon</li>
              <li>Instantly view location-based elements</li>
              <li>Responsive design across devices</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
