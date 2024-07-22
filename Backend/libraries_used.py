from deep_translator import GoogleTranslator
from paddlespeech.cli.asr.infer import ASRExecutor
from paddlespeech.cli.tts.infer import TTSExecutor
import detectlanguage


translated = GoogleTranslator(source='auto', target='de').translate("")  # output -> Weiter so, du bist großartig

#print(translated)
langs_dict = GoogleTranslator().get_supported_languages(as_dict=True)
#print(langs_dict)

my_api_key = "3bb1cba98da8d5fef65f47e7142f1baf"
detectlanguage.configuration.api_key = my_api_key
asr = ASRExecutor()
#result = asr(audio_file="C:\\Users\\vishnu\\Documents\\Sound recordings\\Audio_STT.m4A")
tts = TTSExecutor()
tts(text="今天天气十分不错。", output="output.wav")
var=detectlanguage.detect("Buenos dias señor")
print(var)


