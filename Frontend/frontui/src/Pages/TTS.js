import React, { useState } from "react";
import { Box, Heading, Text, Button, Textarea } from '@chakra-ui/react';

const TTS = () => {
  const [text, setText] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertToSpeech = async () => {
    try {
      const formData = new FormData();
      formData.append('text', text);

      const response = await fetch('https://punt-partners-vishnu.onrender.com/text-to-speech/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to convert text to speech.');
    }
  };

  const handlePlayAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <Box p={4} maxW="container.sm" mx="auto">
      <Heading as="h1" size="xl" mb={4}>Text to Speech</Heading>
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Kindly enter the text.."
        size="lg"
        mb={4}
      />
      <Button
        size="lg"
        borderRadius="full"
        p={8}
        bg="teal.500"
        color="white"
        _hover={{ bg: 'teal.700' }}
        onClick={handleConvertToSpeech}
        mb={4}
      >
        Convert to Speech
      </Button>
      {audioURL && (
        <Button
          size="lg"
          borderRadius="full"
          p={8}
          bg="teal.500"
          color="white"
          _hover={{ bg: 'teal.700' }}
          onClick={handlePlayAudio}
        >
          Play Audio
        </Button>
      )}
      {error && <Text color="red.500" mt={4}>{error}</Text>}
    </Box>
  );
};

export default TTS;
