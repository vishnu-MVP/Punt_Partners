import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Flex, Button, Icon, Textarea } from '@chakra-ui/react';
import { FaMicrophone, FaStop, FaPlay } from 'react-icons/fa';
import { AudioRecorder } from 'react-audio-voice-recorder';

const SST = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [micPermission, setMicPermission] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [translation, setTranslation] = useState('');
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  
  useEffect(() => {
   
    const checkMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission(true);
      } catch (error) {
        console.error("Microphone access denied:", error);
        setMicPermission(false);
      }
    };

    checkMicPermission();
  }, []);

  const handleRecordingComplete = async (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioURL(url);

    
    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      
      const response = await fetch('http://localhost:8000/speech-to-text/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setRecognizedText(data.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
  };

  const handlePlayAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  const handleTranslate = async () => {
    try {
      const formData = new FormData();
      formData.append('q', textToTranslate);
      formData.append('target', 'en');  

      const response = await fetch('http://localhost:8000/translate', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (micPermission === null) {
    return <Text>Loading...</Text>;
  }

  if (!micPermission) {
    return <Text>Microphone access is required to use this feature.</Text>;
  }

  return (
    <Flex direction="column" minHeight="100vh">
      <Box bg="teal.700" color="white" py={4} textAlign="center">
        <Heading as="h1" size="xl">Speech to Text</Heading>
      </Box>
      <Flex flex="1" justify="center" align="center" py={8}>
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Input</Heading>
          <Textarea value={recognizedText} placeholder="Recorded speech will appear here..." size="lg" isReadOnly />
        </Box>
        <Box flex="1" maxW="container.sm" px={4} textAlign="center">
          <AudioRecorder 
            onRecordingComplete={handleRecordingComplete}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }} 
            downloadOnSavePress={false}
            downloadFileExtension="webm"
            record={recording}
          />
          
          {audioURL && (
            <Box mt={4}>
              <Button
                size="lg"
                borderRadius="full"
                p={8}
                bg="teal.500"
                color="white"
                _hover={{ bg: 'teal.700' }}
                onClick={handlePlayAudio}
              >
                <Icon as={FaPlay} w={8} h={8} mr={2} />
                Play Recording
              </Button>
            </Box>
          )}
        </Box>
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Output</Heading>
          <Textarea value={translatedText} placeholder="Converted text will appear here..." size="lg" isReadOnly />
          <Button
            size="lg"
            borderRadius="full"
            p={8}
            bg="teal.500"
            color="white"
            _hover={{ bg: 'teal.700' }}
            mt={4}
            onClick={handleTranslate}
          >
            Translate
          </Button>
        </Box>
      </Flex>
      <Box bg="teal.500" color="white" py={4} textAlign="center" mt="auto">
        <Text>&copy; Project By Vishnu Prasad (125158085)</Text>
      </Box>
    </Flex>
  );
};

export default SST;
