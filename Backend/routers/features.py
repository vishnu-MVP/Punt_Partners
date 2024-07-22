from typing import List, Optional
from fastapi import APIRouter, Request, Body, status, HTTPException,Query
from datetime import date,datetime
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Form
import requests
from deep_translator import GoogleTranslator
router = APIRouter()

@router.post("/translate")
async def translate_text(q: str = Form(...), target: str = Form(...)):
    try:
        # Translate the text using GoogleTranslator
        translated_text = GoogleTranslator(source='auto', target=target).translate(q)
        return {"translatedText": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))