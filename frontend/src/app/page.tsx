export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-blue-100 text-center py-20">
        <h1 className="text-3xl font-bold text-blue-800">OnTrack</h1>
        <p className="text-blue-700 mt-4">
          Your personalized AI education assistant
        </p>
      </section>

      {/* Intro */}
      <section className="bg-white text-center py-20">
        <p className="text-black mt-4 px-40">
          OnTrack is a personalized AI assistant that helps students stay on top
          of their classwork, semester goals, grades, and other commitments.
          This web-based assistant allows the user to input information related
          to each of these commitments across all aspects that the user wishes
          to succeed in, whether that is frequent updates to the user’s grades,
          course assignments and syllabi, sports schedules, or social events.
          From there, it is able to generate personalized suggestions for which
          commitments the user should prioritize to best suit their needs, and
          adapts to any updates the user may provide throughout this period of
          self-improvement. Additionally, location-based information of where
          each commitment takes place can be inputted for OnTrack, in which the
          application can generate optimal transportation paths to efficiently
          navigate between areas of commitments. These suggestions are primarily
          communicated and received through OnTrack’s adaptive chatbot, which
          understands the users needs and can provide advice at the user’s
          desire.
        </p>
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
              Our product offers a wide range of features designed to improve
              your workflow, enhance collaboration, and simplify your tasks.
              Whether you're a solo developer or a large team, you'll love the
              flexibility and power we provide.
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
