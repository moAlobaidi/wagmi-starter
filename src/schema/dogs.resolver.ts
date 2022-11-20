import { Resolver, Query, Arg } from "type-graphql";

import { Dog } from "./dogs";
import dogs from "./dogs.json";

@Resolver(Dog)
export class DogsResolver {
  @Query(() => Dog, { nullable: true })
  dog(@Arg("name", () => String) name: string): Dog | undefined {
    const dog = dogs.find((dog) => dog.name === name);
    if (dog === undefined) {
      throw new Error("Dog not found");
    }
    return dog;
  }

  @Query(() => [Dog])
  dogs(): Dog[] {
    return dogs;
  }
  @Query(() => Dog, { nullable: true })
  dog2(@Arg("weight", () => Number) weight: number): Dog | undefined {
    const dog = dogs.find((dog) => dog.weight === weight);
    if (dog === undefined) {
      throw new Error("Dog not found");
    }
    return dog;
  }
}

export class DogsResolver2 {
  dog(name: string): Dog | undefined {
    const dog = dogs.find((dog) => dog.name === name);
    if (dog === undefined) {
      throw new Error("Dog not found");
    }
    return dog;
  }

  dogs(): Dog[] {
    return dogs;
  }
}
