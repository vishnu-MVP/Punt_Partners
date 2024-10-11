import React from 'react';
import { ChakraProvider, Box, Heading, Text, Flex, Container, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" minHeight="100vh">
        <Box bg="teal.700" color="white" py={4} textAlign="center">
          <Heading  size="xl">Welcome, Partners!</Heading>
        </Box>
        <Container flex="1" maxW="container.xl" py={8}>
          <Flex justify="center" align="center" wrap="wrap" spacing={8}>
            <Link as={RouterLink} to="/translate" _hover={{ textDecoration: 'none' }} m={4} width={{ base: '100%', md: '30%' }}>
              <Box bg="white" borderRadius="md" boxShadow="md" p={6} textAlign="center" _hover={{ boxShadow: 'lg', bg: 'teal.50' }}>
                <Heading  size="lg" mb={4}>Translate</Heading>
                <Text> Auto Detect and Translate from/to 100+ Languages Without Any Limits!!</Text>
              </Box>
            </Link>
           
          </Flex>
        </Container>
        <Box bg="teal.500" color="white" py={4} textAlign="center" mt="auto">
          <Text>&copy; Project By Vishnu Prasad (125158085)</Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
