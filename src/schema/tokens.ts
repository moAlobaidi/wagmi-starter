import { Field, ID, ObjectType } from "type-graphql";

/*
token {
    collectionAddress
    tokenId
    name
    tokenUrl
    metadata
}
"metadata": {
              "name": "Monarch #1",
              "description": "Monarchs is a limited edition series of generative butterfly NFTs by Eric Hu and Roy Tatum. Viewable as both still and moving image, each artwork features a unique one-of-a-kind butterfly with varying wing shapes, colors, bodies, and patterns—some traits much less common than others.",
              "tokenId": 0,
              "image": "https://gateway.pinata.cloud/ipfs/QmYBY9R9YDZNyx7eSSA99vZynyyuwwYxHoBZSYtEuVsSd3",
              "animation_url": "https://gateway.pinata.cloud/ipfs/QmdSBDJz88EWUu6Hg2BJA6PghN8iM4L3N4VEJ3QmoLkaJu",
              "external_url": "https://www.monarchs.art",
              "attributes": [
                {
                  "trait_type": "Environment",
                  "value": "Pony"
                },
                {
                  "trait_type": "Base Pattern",
                  "value": "Shinzaemon"
                },
                {
                  "trait_type": "Secondary Pattern",
                  "value": "Krakow"
                },
                {
                  "trait_type": "Wing Shape",
                  "value": "Osman"
                },
                {
                  "trait_type": "Body Type",
                  "value": "Qing"
                }
              ]
            }
*/

@ObjectType()
export class Attribute {
  @Field(() => String)
  trait_type!: string;
  @Field(() => String)
  value!: string;
}

@ObjectType()
export class MetaData {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  description!: string;
  @Field(() => Number)
  tokenId!: number;
  @Field(() => String)
  image!: string;
  @Field(() => String)
  animation_url!: string;
  @Field(() => String)
  external_url!: string;
  @Field(() => [Attribute])
  attributes!: Attribute[];
}

@ObjectType()
export class Token {
  @Field(() => String)
  collectionAddress!: string;

  @Field(() => String)
  tokenId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => MetaData)
  metadata!: MetaData;
}
