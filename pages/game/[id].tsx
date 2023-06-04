import { Loading } from '@/components/Loading';
import { ExtendedGameInfo } from '@/types/ExtendedGameInfo';
import {
  Flex,
  HStack,
  Heading,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useId, useMemo } from 'react';
import useSWR from 'swr';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR([
    '/thing',
    { type: 'boardgame', id },
  ]);

  const normalizedData: ExtendedGameInfo | undefined = useMemo(
    () =>
      data
        ? {
            id: data.items.item._attributes.id,
            version: data._declaration._attributes.version,
            type: data.items.item._attributes.type,
            thumbnail: data.items.item.thumbnail._text,
            image: data.items.item.image._text,
            name: {
              sortindex: data.items.item.name._attributes.sortindex,
              type: data.items.item.name._attributes.type,
              value: data.items.item.name._attributes.value,
            },
            description: data.items.item.description._text,
            yearpublished: data.items.item.yearpublished._attributes.value,
            minplayers: data.items.item.minplayers._attributes.value,
            maxplayers: data.items.item.maxplayers._attributes.value,
            poll: data.items.item.poll,
            playingtime: data.items.item.playingtime._attributes.value,
            minplaytime: data.items.item.minplaytime._attributes.value,
            maxplaytime: data.items.item.maxplaytime._attributes.value,
            minage: data.items.item.minage._attributes.value,
            link: data.items.item.link.map((item: Record<string, any>) => ({
              type: item._attributes.type,
              id: item._attributes.id,
              value: item._attributes.value,
            })),
          }
        : undefined,
    [data]
  );

  console.log({ normalizedData });

  const linkKey = useId();

  return (
    <>
      <Head>
        <title>{normalizedData?.name.value}</title>
      </Head>
      <Flex as="main" flex="1" direction="column" gap="4">
        {isLoading ? <Loading /> : null}
        {error ? <Text>{error}</Text> : null}
        {normalizedData ? (
          <Stack
            spacing="4"
            maxW="50rem"
            width="100%"
            marginLeft="auto"
            marginRight="auto"
            marginBottom="8"
          >
            <Heading as="h1" size="2xl" textAlign="center" paddingTop="4">
              {normalizedData.name.value}
            </Heading>
            <Image
              src={normalizedData.image}
              alt={normalizedData.name.value}
              width={800}
              height={800}
            />
            <Text
              as="p"
              fontSize="md"
              dangerouslySetInnerHTML={{ __html: normalizedData.description }}
            />
            <UnorderedList>
              <ListItem>
                Year published: {normalizedData.yearpublished}
              </ListItem>
              <ListItem>Min players: {normalizedData.minplayers}</ListItem>
              <ListItem>Max players: {normalizedData.maxplayers}</ListItem>
              <ListItem>Playing time: {normalizedData.playingtime}</ListItem>
              <ListItem>Min. play time: {normalizedData.minplaytime}</ListItem>
              <ListItem>Max. play time: {normalizedData.maxplaytime}</ListItem>
              <ListItem>Min. age: {normalizedData.minage}</ListItem>
            </UnorderedList>
            <HStack spacing="4" wrap="wrap">
              {normalizedData.link.map((link, i) => (
                <Link
                  passHref
                  href={`https://boardgamegeek.com/${link.type}/${link.id}`}
                  key={linkKey + i}
                >
                  <Tag>{link.value}</Tag>
                </Link>
              ))}
            </HStack>
          </Stack>
        ) : null}
      </Flex>
    </>
  );
}
