import { Token } from "./tokens";

export class TokensResolver {
  token(collectionAddress: string): Token {
    return new Token();
  }
}
