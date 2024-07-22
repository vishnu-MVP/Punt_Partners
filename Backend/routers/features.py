from typing import List, Optional
from fastapi import APIRouter, Request, Body,File,UploadFile,status, HTTPException,Query
from datetime import date,datetime
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Form
from fastapi.responses import StreamingResponse
import requests
import os
import pyttsx3

import speech_recognition as sr
import detectlanguage
from deep_translator import GoogleTranslator
router = APIRouter()
my_api_key = "3bb1cba98da8d5fef65f47e7142f1baf"
detectlanguage.configuration.api_key = my_api_key
@router.post("/translate")
async def translate_text(q: str = Form(...), target: str = Form(...)):
    try:
       
        translated_text = GoogleTranslator(source='auto', target=target).translate(q)
        detected_lang=detectlanguage.detect(q)
        return {"translatedText": translated_text,
                "DetectedLang":detected_lang
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

recognizer = sr.Recognizer()

@router.post("/speech-to-text/")
async def speech_to_text(file: UploadFile = File(...)):
    try:
       
        file_location = f"temp/{file.filename}"
        with open(file_location, "wb") as buffer:
            buffer.write(file.file.read())

 
        with sr.AudioFile(file_location) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
        
      
        os.remove(file_location)
        
        return {"text": text}

    except sr.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Could not request results; {e}")
    except sr.UnknownValueError:
        raise HTTPException(status_code=500, detail="Could not understand audio")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/text-to-speech/")
async def text_to_speech(text: str = Form(...)):
    try:
        engine = pyttsx3.init()
        audio_file = "output.wav"
        engine.save_to_file(text, audio_file)
        engine.runAndWait()
        
        def iterfile():
            with open(audio_file, "rb") as f:
                yield from f
        

        response = StreamingResponse(iterfile(), media_type="audio/wav")
        response.headers["Content-Disposition"] = "attachment; filename=output.wav"
        os.remove(audio_file)
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))