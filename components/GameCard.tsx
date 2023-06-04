import {
  Card,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { Game } from '@/types/Game';

interface Props {
  game: Game;
}

export const GameCard: FC<Props> = ({ game }) => (
  <LinkBox key={game.id} as={Card} padding="4" boxShadow="md">
    <Stack spacing="4">
      <Heading as="h3" size="md">
        <LinkOverlay as={Link} href={`/game/${game.id}`}>
          #{game.rank} - {game.name}
        </LinkOverlay>
      </Heading>
      <Image
        src={game.thumbnail}
        alt={`Thumbnail for ${game.name}`}
        width={200}
        height={200}
        style={{
          height: 'auto',
          width: '100%',
        }}
      />
      <Text as="p" fontSize="sm">
        year published: {game.yearpublished}
      </Text>
    </Stack>
  </LinkBox>
);
