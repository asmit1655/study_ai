import os
import json
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from fastapi import HTTPException
from ..services import schema

from dotenv import load_dotenv
load_dotenv()

llm = ChatGroq(api_key=os.getenv("GROQ_API_KEY"),model="llama-3.3-70b-versatile",temperature=0.5)

def generate_study_content(request: schema.ContentRequest):
    prompt = ""
    if request.content_type == "quiz":
        prompt = f"""
        Generate a 5-question multiple-choice quiz on the topic of '{request.topic}'.
        Return ONLY a valid JSON object.
        The object must have a single key "questions" which is an array.
        Each object in the array must have keys: "question", "options" (an array of 4 strings), and "answer" (the correct option string).
        """
        parser = JsonOutputParser(pydantic_object=schema.Quiz)
    elif request.content_type == "flashcards":
        prompt = f"""
        Generate 5 flashcards on the topic of '{request.topic}'.
        Return ONLY a valid JSON object.
        The object must have a single key "flashcards" which is an array.
        Each object in the array must have two keys: "front" and "back".
        """
        parser = JsonOutputParser(pydantic_object=schema.Flashcards)
    else:
        raise HTTPException(status_code=400, detail="Invalid content type specified.")

    try:
        print(f"--- Received request for topic: {request.topic} ---") 
        prompt_template = ChatPromptTemplate.from_template(
            "Answer the user query.\n{format_instructions}\nQuery: {query}\n"
        )

        chain = prompt_template | llm | parser
        query = f"Generate a {request.content_type} on the topic of '{request.topic}'."
        response = chain.invoke({
            "format_instructions": parser.get_format_instructions(),
            "query": query
        })

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate content from AI model: {str(e)}")
    
def get_chat_response(request: schema.ChatRequest):
    """
    Handles a chat request to the personal assistant.
    """
    # For a more advanced chatbot, you would also pass the conversation history
    # as part of the messages array.
    prompt = f"""You are a friendly and helpful assistant named StudyAI. 
        Your primary goal is to help users with their academic studies. 
        However, you are also empathetic. If a user expresses feelings of stress or asks for non-academic advice, 
        offer brief, supportive, and encouraging words. Do not give medical advice. 
        Gently guide the conversation back to how you can help with their studies."""
    
    try:
        messages=[
                {"role": "system", "content": f"You are a friendly and knowledgeable study assistant. Answer the user's question clearly and concisely."},
                {"role": "user", "content": prompt}
        ]
        chat_reply = llm.invoke(messages)
        return {"response": chat_reply.content.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get chat response from AI model: {str(e)}")