## Deserialize JSON:API Type

- deserialize JSON:API TypeScript

## Usage

- [see sample code](https://github.com/NagaiKoki/json-api-typescript-deserializer/blob/master/demo/index.ts)

```ts
type ApiType = {
  data: {
    id: string;
    type: "user";
    attributes: {
      name: string;
      image_url: string;
      age: number | null;
    };
  };
};

type DeserializeJsonApiType = JsonApiDeserializeType<ApiType>;

const user: DeserializeJsonApiType = {
  name: "Koki Nagai",
  imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
  age: 26,
};
```
