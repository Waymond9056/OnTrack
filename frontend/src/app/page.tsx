export default function HomePage() {
  return (
    <div>
      <section className="bg-blue-100 text-center py-20">
        <h1 className="text-3xl font-bold text-blue-800">OnTrack</h1>
        <p className="text-blue-700 mt-4">
          Your personalized AI education assistant
        </p>
      </section>

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
    </div>
  );
}
