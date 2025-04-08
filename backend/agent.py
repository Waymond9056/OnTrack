import os
from dotenv import load_dotenv
from openai import OpenAI

class Model():
    def __init__(self):

        load_dotenv()
        gpt_key = os.getenv("CHAT_GPT_KEY")

        self.client = OpenAI(api_key=gpt_key)
        self.history = []

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
    
model = Model()

