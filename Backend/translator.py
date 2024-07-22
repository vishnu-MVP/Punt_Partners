from deep_translator import GoogleTranslator

# Use any translator you like, in this example GoogleTranslator
translated = GoogleTranslator(source='auto', target='de').translate("")  # output -> Weiter so, du bist großartig

print(translated)
langs_dict = GoogleTranslator().get_supported_languages(as_dict=True)
print(langs_)