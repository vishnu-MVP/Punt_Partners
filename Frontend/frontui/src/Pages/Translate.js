import React, { useState } from 'react';
import { Box, Heading, Text, Flex, Button, Icon, Textarea, Spinner, Select } from '@chakra-ui/react';
import { FaMagic } from 'react-icons/fa';

// Language mapping
const languages = {
  'Afrikaans': 'af',
  'Albanian': 'sq',
  'Amharic': 'am',
  'Arabic': 'ar',
  'Armenian': 'hy',
  'Assamese': 'as',
  'Aymara': 'ay',
  'Azerbaijani': 'az',
  'Bambara': 'bm',
  'Basque': 'eu',
  'Belarusian': 'be',
  'Bengali': 'bn',
  'Bhojpuri': 'bho',
  'Bosnian': 'bs',
  'Bulgarian': 'bg',
  'Catalan': 'ca',
  'Cebuano': 'ceb',
  'Chichewa': 'ny',
  'Chinese (Simplified)': 'zh-CN',
  'Chinese (Traditional)': 'zh-TW',
  'Corsican': 'co',
  'Croatian': 'hr',
  'Czech': 'cs',
  'Danish': 'da',
  'Dhivehi': 'dv',
  'Dogri': 'doi',
  'Dutch': 'nl',
  'English': 'en',
  'Esperanto': 'eo',
  'Estonian': 'et',
  'Ewe': 'ee',
  'Filipino': 'tl',
  'Finnish': 'fi',
  'French': 'fr',
  'Frisian': 'fy',
  'Galician': 'gl',
  'Georgian': 'ka',
  'German': 'de',
  'Greek': 'el',
  'Guarani': 'gn',
  'Gujarati': 'gu',
  'Haitian Creole': 'ht',
  'Hausa': 'ha',
  'Hawaiian': 'haw',
  'Hebrew': 'iw',
  'Hindi': 'hi',
  'Hmong': 'hmn',
  'Hungarian': 'hu',
  'Icelandic': 'is',
  'Igbo': 'ig',
  'Ilocano': 'ilo',
  'Indonesian': 'id',
  'Irish': 'ga',
  'Italian': 'it',
  'Japanese': 'ja',
  'Javanese': 'jw',
  'Kannada': 'kn',
  'Kazakh': 'kk',
  'Khmer': 'km',
  'Kinyarwanda': 'rw',
  'Konkani': 'gom',
  'Korean': 'ko',
  'Krio': 'kri',
  'Kurdish (Kurmanji)': 'ku',
  'Kurdish (Sorani)': 'ckb',
  'Kyrgyz': 'ky',
  'Lao': 'lo',
  'Latin': 'la',
  'Latvian': 'lv',
  'Lingala': 'ln',
  'Lithuanian': 'lt',
  'Luganda': 'lg',
  'Luxembourgish': 'lb',
  'Macedonian': 'mk',
  'Maithili': 'mai',
  'Malagasy': 'mg',
  'Malay': 'ms',
  'Malayalam': 'ml',
  'Maltese': 'mt',
  'Maori': 'mi',
  'Marathi': 'mr',
  'Meiteilon (Manipuri)': 'mni-Mtei',
  'Mizo': 'lus',
  'Mongolian': 'mn',
  'Myanmar': 'my',
  'Nepali': 'ne',
  'Norwegian': 'no',
  'Odia (Oriya)': 'or',
  'Oromo': 'om',
  'Pashto': 'ps',
  'Persian': 'fa',
  'Polish': 'pl',
  'Portuguese': 'pt',
  'Punjabi': 'pa',
  'Quechua': 'qu',
  'Romanian': 'ro',
  'Russian': 'ru',
  'Samoan': 'sm',
  'Sanskrit': 'sa',
  'Scots Gaelic': 'gd',
  'Sepedi': 'nso',
  'Serbian': 'sr',
  'Sesotho': 'st',
  'Shona': 'sn',
  'Sindhi': 'sd',
  'Sinhala': 'si',
  'Slovak': 'sk',
  'Slovenian': 'sl',
  'Somali': 'so',
  'Spanish': 'es',
  'Sundanese': 'su',
  'Swahili': 'sw',
  'Swedish': 'sv',
  'Tajik': 'tg',
  'Tamil': 'ta',
  'Tatar': 'tt',
  'Telugu': 'te',
  'Thai': 'th',
  'Tigrinya': 'ti',
  'Tsonga': 'ts',
  'Turkish': 'tr',
  'Turkmen': 'tk',
  'Twi': 'ak',
  'Ukrainian': 'uk',
  'Urdu': 'ur',
  'Uyghur': 'ug',
  'Uzbek': 'uz',
  'Vietnamese': 'vi',
  'Welsh': 'cy',
  'Xhosa': 'xh',
  'Yiddish': 'yi',
  'Yoruba': 'yo',
  'Zulu': 'zu'
};

const Translate = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('de'); 
  const [detectedLanguage, setDetectedLanguage] = useState('');

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/translate", {
        method: "POST",
        body: new URLSearchParams({
          q: inputText,
          target: targetLanguage
        }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
    
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      const detectedLang = result.DetectedLang[0] || {};
      console.log(detectedLang)
      setDetectedLanguage(detectedLang);
      setOutputText(result.translatedText || 'Translation failed.');
    } catch (error) {
      setOutputText(`Error occurred while translating: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Box bg="teal.700" color="white" py={4} textAlign="center">
        <Heading as="h1" size="xl">Translate</Heading>
      </Box>
      <Flex flex="1" justify="center" align="center" py={8} wrap="wrap">
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Input</Heading>
          <Box
            borderWidth={1}
            borderRadius="md"
            p={4}
            mb={4}
            bg="gray.100"
            borderColor="gray.300"
          >
            {detectedLanguage ? (
              <Box>
                <Text fontWeight="bold">Language: {detectedLanguage.language}</Text>
                <Text>Reliable: {detectedLanguage.isReliable ? 'Yes' : 'No'}</Text>
                <Text>Confidence: {detectedLanguage.confidence.toFixed(2)}</Text>
              </Box>
            ) : (
              <Text>Not detected</Text>
            )}
          </Box>
          <Textarea
            placeholder="Enter text to translate..."
            size="lg"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Box>
        <Box flex="1" maxW="container.sm" px={4} textAlign="center">
          <Select
            placeholder="Select language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            mb={4}
          >
            {Object.entries(languages).map(([language, code]) => (
              <option key={code} value={code}>{language}</option>
            ))}
          </Select>
          <Button
            size="lg"
            borderRadius="full"
            p={8}
            bg="teal.500"
            color="white"
            _hover={{ bg: 'teal.700' }}
            onClick={handleTranslate}
          >
            <Icon as={FaMagic} w={8} h={8} mr={2} />
            {loading ? <Spinner size="md" /> : 'Abracadabra'}
          </Button>
        </Box>
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Output</Heading>
          <Textarea
            placeholder="Magic will be delivered here ..."
            size="lg"
            isReadOnly
            value={outputText}
          />
        </Box>
      </Flex>
      <Box bg="teal.500" color="white" py={4} textAlign="center" mt="auto">
        <Text>&copy; Project By Vishnu Prasad (125158085)</Text>
      </Box>
    </Flex>
  );
};

export default Translate;
