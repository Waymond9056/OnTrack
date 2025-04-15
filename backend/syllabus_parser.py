import os
from dotenv import load_dotenv
from openai import OpenAI

class SyllabusParser():
    def __init__(self):
        load_dotenv()
        gpt_key = os.getenv("CHAT_GPT_KEY")

        self.client = OpenAI(api_key=gpt_key)
        self.history = []

        # Specify instructions

        self.instruction = f"""You are to act as a parser to pull important information out of syllabi text. Use only plain text. No bullets or other formatting. The structure of your response is as follows:
        - Pull out important dates that must be met, such as exam dates and class meeting times. They should be given in the format: "[ACTIVITY]@[TIME]@[LOCATION]"
        - End this section with one line of ENDDATES
        - On each of the following lines, specify up to 5 actionable goals that the user can accomplish to be successful in the course.
        """

        self.history.append({"role": "developer", "content": self.instruction})

    def pull_information(self, text):
        self.history.append({"role": "user", "content": input})
        response = self.client.chat.completions.create(
            model = "gpt-4o",
            messages = self.history,
            # previous_response_id = self.previous_id
        )

        return_text = response.choices[0].message.content
        return (self.clean_response(return_text))

    def clean_response(self, text):
        lines = text.splitlines()

        activites = []
        goals = []
        switched = False
        for line in lines:
            if (line == "ENDDATES"):
                switched = True
                continue
            if switched:
                goals.append(line)
            else:
                activites.append(line)
        return activites, goals
            