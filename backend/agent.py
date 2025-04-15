import os
from dotenv import load_dotenv
from openai import OpenAI

class Model():
    def __init__(self):

        load_dotenv()
        gpt_key = os.getenv("CHAT_GPT_KEY")

        self.client = OpenAI(api_key=gpt_key)
        self.history = []

        # Specify instructions

        self.instruction = f"""You are a chat agent that will help students keep track of academic goals.
        Your message must start with a header containing information for helper functions. Use plain text. This means there should be NO FORMATTING such as bullets or numbering.
        The first three lines will ALWAYS be three concise responses that the user can respond with (no numbering). NEVER omit these.
        The next lines will be tags to indicate possible user information based on user intent specified later. These lines should be formatted with the tag on one line. There should ALWAYS be corresponding information on the next separate line.
        End the indicator section with the MESSAGE tag after all these indicators. DO NOT ADD empty lines in the header.
        Start a useful dialog with the user after this tag
        The user may have several intents:
        The user may want to specify extracurriculars. When you identify an activity, put an EXTRACURRICULAR tag followed by activity information in "[ACTIVITY]@[TIME]@[LOCATION]" on a separate line after. Prompt the user for additional information if not given. Make a new tag for each new activity to add.
        The user may want to upload a syllabi file to parse. Put an SYLLABI tag.
        The user may want to specify semester goals. When you identify these goals, put a GOAL tag followed by the goal on a separate line after
        The user may want to receive suggestions to maximize their goals. Provide a useful suggestion to them.
        The user may want to generate a daily schedule. Today's date is Tuesday, April 8. Help them out.
        These "intent" tags should come after the possible responses.
        """

        self.history.append({"role": "developer", "content": self.instruction})

    def get_response(self, input):

        self.history.append({"role": "user", "content": input})
        response = self.client.chat.completions.create(
            model = "gpt-4o",
            messages = self.history,
            # previous_response_id = self.previous_id
        )

        return_text = response.choices[0].message.content

        self.history.append({"role": "assistant", "content": return_text})

        return return_text
'''
model = Model()
print(model.get_response("Hi"))
print("------")
print(model.get_response("I'd like to add Chess on thursdays at 3:30 pm to my activities queue as well as fencing @ 5pm on monday and wednesdays"))
print("------")
print(model.get_response("I want to set some academic goals"))
print("------")
print(model.get_response("I'd like to get an A in discrete math"))
'''

