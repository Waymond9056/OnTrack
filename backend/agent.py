import os
from dotenv import load_dotenv
from openai import OpenAI
from datetime import date

class Model():
    def __init__(self):

        load_dotenv()
        gpt_key = os.getenv("CHAT_GPT_KEY")

        self.client = OpenAI(api_key=gpt_key)
        self.history = []

        # Specify instructions

        todays_date = date.today()

        self.instruction = f"""You are a chat agent that will help students keep track of academic goals.
        Your message must start with a header containing information for helper functions. Use plain text. This means there should be NO FORMATTING such as bullets or numbering.
        The first three lines will ALWAYS be three concise messages suggested to the user by the platform to ask you back (no numbering). NEVER omit these.
        The next lines will be tags to indicate possible user information based on user intent. These lines should be formatted with the tag on one line. There should ALWAYS be corresponding information on the next separate line.
        The user may have several intents:
        The user may want to specify activites such as extracurriculars. When you identify an activity, put an ACTIVITY tag followed by activity information in "[ACTIVITY]@[TIME]@[LOCATION]" on a separate line after. If information is not given, prompt the user. Do not make a new tag if information is missing. Make a new tag for each new activity to add.
        The user may want to upload a syllabi file to parse. Put an SYLLABI tag.
        The user may want to specify semester goals. When you identify these goals, put a GOAL tag followed by the goal on a separate line after
        The user may want to receive suggestions to maximize their goals. Provide a useful suggestion to them. 
        The user may want to generate a daily schedule. Today's date is {date.ctime(todays_date)}. Help them out.
        End the indicator section with the MESSAGE tag after all these indicators. DO NOT ADD empty lines in the header.
        Start a useful dialog with the user after this tag
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
        ret_object = self.clean_response(return_text)
        print(ret_object)

        return ret_object["message"]
    
    def clean_response(self, input_text):
        print(input_text)
        ret = dict()
        lines = input_text.splitlines()
        ret["custom_responses"] = []
        ret["activities"] = []
        ret["goals"] = []
        status = None
        for i in range(len(lines)):
            line = lines[i]
            if i < 3:
                ret["custom_responses"].append(line)
                continue
            if line == "":
                continue
            if line == "MESSAGE":
                ret["message"] = ""
                for ii in range(i + 1, len(lines)):
                    ret["message"] = ret["message"] + lines[ii] + "\n"
                return ret
            if lines == "ACTIVITY":
                status = "ACITIVITY"
                continue
            if lines == "GOAL":
                status = "GOAL"
            if lines == "SYLLABI":
                pass
                # CUSTOM IMPLEMENTATION HERE

            if status == "GOAL":
                ret["goals"].append(line)
            if status == "ACTIVITY":
                ret["activities"].append(line)
        return ret
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

