export default function FeaturesPage() { /* keeping this here in case we need it */
  return (
    <div>
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
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
