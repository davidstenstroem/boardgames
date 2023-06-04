import { Center, Flex, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

export const Loading: FC = () => (
  <Flex w="100%" flex="1" justify="center">
    <Center>
      <Spinner size="lg" />
    </Center>
  </Flex>
);
