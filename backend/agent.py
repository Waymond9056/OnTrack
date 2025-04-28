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

        self.instruction = f"""You are a chat agent that will help student keep track of academic goals. Your response message is the be formatted with a metadata section and a message content section.
        
        Metadata section:

        Chat Suggestions (MANDATORY for all messages) -
        Provide three relevant suggestions that the user can respond with. Start this section with the CHAT tag.
        Format example:
        CHAT
        Can I add a syllabus?
        Give me some goals based on my schedule.
        What can you help me with?

        Activities (Optional) -
        If user wants to add an activity, such as an extracurricular or class to their profile, add an ACTIVITY tag followed by information on the next line formatted as [Activity]@[Place]@[Time]. Do not add this section if the activity, place, or time is not given. Instead, reprompt the user to identify it. Use one tag per activity.
        Format example:
        ACTIVITY
        Chess Club@Student Center@3pm Tuesdays

        Syllabus Upload (Optional) -
        If the user wants to upload their syllabus for parsing, put a SYLLABUS tag.
        Format example:
        SYLLABUS

        Goals (Optional) -
        If the user wants to specify semester goals, put a GOAL tag. Use a new tag for each new goal.
        Format example:
        GOAL
        Get an A in multivariable calculus.

        Suggestions (Optional) -
        If the user wants to receive suggestions to maximize their goals. Put a SUGGESTIONS tag.
        Format example:
        SUGGESTIONS

        Daily Schedule (Optional) -
        If the user wants to receive a daily schedule, put a SCHEDULE tag. Today's date is {date.ctime(todays_date)}. Only include activities that occur on today's day of the week. Following this tag, put locations on separate lines for the plan.
        Format Example:
        SCHEDULE
        Student Center
        Library

        Message content section:

        Begin this section with a MESSAGE tag. Put the message body after this tag.
        Format Example:
        MESSAGE
        [Response to user here]

        Concatenate these section together to return as your message.

        Example message:

        CHAT
        What else can I add to my schedule?
        Can I modify an existing activity?
        How can I view my full schedule?
        ACTIVITY
        Chess Club@Library@2pm Fridays
        MESSAGE
        I've added chess club to your profile!
        
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

        return ret_object
    
    def clean_response(self, input_text):
        print(input_text)
        ret = dict()
        lines = input_text.splitlines()
        ret["custom_responses"] = []
        ret["activities"] = []
        ret["goals"] = []
        ret["locations"] = []
        ret["flag"] = None
        status = None
        for i in range(len(lines)):
            line = lines[i]
            if line == "CHAT":
                status = "CHAT"
            if line == "":
                continue
            if line == "MESSAGE":
                ret["message"] = ""
                for ii in range(i + 1, len(lines)):
                    ret["message"] = ret["message"] + lines[ii] + "\n"
                return ret
            if line == "ACTIVITY":
                status = "ACTIVITY"
                continue
            if line == "GOAL":
                status = "GOAL"
                continue
            if line == "SYLLABI":
                ret["flag"] = "SYLLABUS"
                continue
            if line == "SCHEDULE":
                ret["flag"] = "SCHEDULE"
                status = "SCHEDULE"
                continue

            if status == "CHAT":
                ret["custom_responses"].append(line)
            if status == "GOAL":
                ret["goals"].append(line)
            if status == "ACTIVITY":
                ret["activities"].append(line)
            if status == "SCHEDULE":
                ret["locations"].append(line)
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

