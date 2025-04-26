export default function FeaturesPage() { /* keeping this here in case we need it */
  return (
    <div>
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
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
              <li>Natural and conversational interface
              </li>
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
            Navigate your data visually with our interactive map icon feature. Whether you're exploring location-based inputs or toggling views, the built-in map tools make orientation effortless and intuitive—perfect for keeping context without ever breaking focus.


            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Click-to-toggle map icon
              </li>
              <li>Instantly view location-based elements</li>
              <li>Responsive design across devices
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
