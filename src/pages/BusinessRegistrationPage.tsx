import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SEO } from "../components/SEO";
import { Header } from "../components/Header";
import { BusinessRegistrationSteps } from "../components/business/BusinessRegistrationSteps";
import { BusinessRegistrationProvider } from "../contexts/BusinessRegistrationContext";
import { useLocation } from "react-router-dom";

// Create a custom theme that matches your dark design
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white'
      }
    }
  }
});

export default function BusinessRegistrationPage() {
  const location = useLocation();
  const businessType = location.state?.businessType || 'gym';

  return (
    <ChakraProvider theme={theme}>
      <SEO 
        title="Register Your Business | FitFinder"
        description="Complete your business registration on FitFinder"
      />
      <Header />
      <Box minH="100vh" bg="gray.900" pt="24">
        <Container maxW="4xl" px={4} py={16}>
          <VStack spacing={8} align="stretch">
            <Heading textAlign="center" size="xl">
              Complete Your Registration
            </Heading>
            <BusinessRegistrationProvider initialState={{ businessType }}>
              <BusinessRegistrationSteps />
            </BusinessRegistrationProvider>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
} 