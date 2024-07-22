import React from 'react';
import { Box, Heading, Text, Flex, Button, Icon, Input, Textarea } from '@chakra-ui/react';
import { FaMagic } from 'react-icons/fa';

const TTS = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box bg="teal.700" color="white" py={4} textAlign="center">
        <Heading as="h1" size="xl">Text to Speech</Heading>
      </Box>
      <Flex flex="1" justify="center" align="center" py={8}>
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Input</Heading>
          <Textarea placeholder="Enter text to convert to speech..." size="lg" />
        </Box>
        <Box flex="1" maxW="container.sm" px={4} textAlign="center">
          <Button size="lg" borderRadius="full" p={8} bg="teal.500" color="white" _hover={{ bg: 'teal.700' }}>
            <Icon as={FaMagic} w={8} h={8} mr={2} />
            Abracadabra
          </Button>
        </Box>
        <Box flex="1" maxW="container.sm" px={4}>
          <Heading as="h2" size="md" mb={4}>Output</Heading>
          <Textarea placeholder="Audio playback will appear here..." size="lg" isReadOnly />
        </Box>
      </Flex>
      <Box bg="teal.500" color="white" py={4} textAlign="center" mt="auto">
        <Text>&copy; Project By Vishnu Prasad (125158085)</Text>
      </Box>
    </Flex>
  );
};

export default TTS;
