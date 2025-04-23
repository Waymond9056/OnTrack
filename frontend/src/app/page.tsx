export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section className="bg-white py-60 px-4">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:space-x-12">
    
          {/* text stuff */}
          <div className="w-full md:w-1/2 text-left mt-8 md:mt-0">
            <h1 className="text-6xl font-bold text-black">
              OnTrack
            </h1>
            <p className="text-xl text-gray-500 mt-2">
              Your personalized AI education assistant.
            </p>
            <p className="text-black mt-8 max-w-lg">
              OnTrack is a personalized AI assistant designed to help students manage their classwork, goals, 
              grades, and other commitments. Users can input details like grades, assignments, schedules, and 
              events, and OnTrack provides personalized suggestions to prioritize tasks, adapting as new updates 
              are shared. It also uses location-based information to suggest efficient transportation routes. With 
              its adaptive chatbot, OnTrack offers advice and support tailored to the user’s needs.
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

      <section id = "features" className="px-6 pt-80 pb-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Section (Left) */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Amazing Features
            </h1>
            <p className="text-gray-600 mb-6">
              {
                "Our product offers a wide range of features designed to improve your workflow, enhance collaboration, and simplify your tasks. Whether you're a solo developer or a large team, you'll love the flexibility and power we provide."
              }
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Fast and intuitive interface</li>
              <li>Seamless team collaboration</li>
              <li>Customizable to your needs</li>
              <li>Secure and reliable infrastructure</li>
            </ul>
          </div>

          {/* "Amazing Features" Image */}
          <div className="flex justify-center">
            <img
              src="/features-image.png"
              alt="Features Illustration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* "Another Feature" Image */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
              Smart Integrations
            </h2>
            <p className="text-gray-600 mb-6">
              Easily connect with your favorite tools and services. Our platform
              supports seamless integrations that enhance productivity and
              minimize context switching.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Integrate with Slack, Notion, GitHub, and more</li>
              <li>Automate repetitive tasks</li>
              <li>Build custom workflows</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
