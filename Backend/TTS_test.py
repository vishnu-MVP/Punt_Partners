import pyttsx4,pyttsx3

engine = pyttsx3.init()
engine.say('this is an english text to voice test.')
engine.runAndWait()
for voice in engine.getProperty('voices'):
    print(voice)