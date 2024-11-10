import {
  SimpleGrid,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const getPricing = (businessType: string) => {
  switch (businessType) {
    case 'personal-trainer':
      return { price: 29.99, features: [
        'Client management',
        'Schedule coordination',
        'Payment processing',
        'Progress tracking',
        'Workout planning'
      ]};
    case 'studio':
      return { price: 79.99, features: [
        'Class scheduling',
        'Member management',
        'Instructor portal',
        'Equipment tracking',
        'Marketing tools'
      ]};
    default:
      return { price: 149.99, features: [
        'Multi-location support',
        'Advanced analytics',
        'Equipment management',
        'Staff scheduling',
        'Member engagement tools'
      ]};
  }
};

export function PricingStep({ businessType, onSelect }: {
  businessType: string;
  onSelect: (plan: 'free' | 'pro') => void;
}) {
  const pricing = getPricing(businessType);
  const cardBg = useColorModeValue('whiteAlpha.100', 'whiteAlpha.50');
  const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.200');

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
      <Box
        p={6}
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="lg" mb={2}>Free Plan</Heading>
            <Text fontSize="2xl" fontWeight="bold">$0</Text>
          </Box>

          <List spacing={3}>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color="green.400" />
              Basic listing
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color="green.400" />
              Contact information
            </ListItem>
            <ListItem display="flex" alignItems="center">
              <ListIcon as={CheckIcon} color="green.400" />
              Business hours
            </ListItem>
          </List>

          <Button
            variant="outline"
            onClick={() => onSelect('free')}
            size="lg"
          >
            Start with Free
          </Button>
        </VStack>
      </Box>

      <Box
        p={6}
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor="green.500"
      >
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="lg" mb={2}>Pro Plan</Heading>
            <Text fontSize="2xl" fontWeight="bold">${pricing.price}</Text>
          </Box>

          <List spacing={3}>
            {pricing.features.map((feature, i) => (
              <ListItem key={i} display="flex" alignItems="center">
                <ListIcon as={CheckIcon} color="green.400" />
                {feature}
              </ListItem>
            ))}
          </List>

          <Button
            colorScheme="green"
            onClick={() => onSelect('pro')}
            size="lg"
          >
            Start Pro Trial
          </Button>
        </VStack>
      </Box>
    </SimpleGrid>
  );
} 