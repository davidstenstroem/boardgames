export interface ExtendedGameInfo {
  version: string;
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  name: {
    type: string;
    value: string;
    sortindex: string;
  };
  description: string;
  yearpublished: string;
  minplayers: string;
  maxplayers: string;
  poll: Record<string, any>[];
  playingtime: number;
  minplaytime: number;
  maxplaytime: number;
  minage: number;
  link: {
    type: string;
    id: string;
    value: string;
  }[];
}
