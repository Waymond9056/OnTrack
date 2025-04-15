import os
from dotenv import load_dotenv
from openai import OpenAI
import fitz
from agent import Model

class Syllabus(): 
    def readPDF(file):
        pdf_data = file.read()
        doc = fitz.open(stream=pdf_data, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()

        return text