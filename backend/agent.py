import os
from dotenv import load_dotenv
from openai import OpenAI

class Model():
    def __init__(self):

        load_dotenv()
        gpt_key = os.getenv("CHAT_GPT_KEY")
        print(gpt_key)

        self.client = OpenAI(api_key=gpt_key)
        self.previous_id = None

    def get_response(self, input):

        self.history.append({"role": "user", "content": input})
        response = self.client.completions.create(
            model = "gpt-4o",
            input = input,
            previous_response_id = self.previous_id
        )

        self.previous_id = response.id

        return response.output_text
