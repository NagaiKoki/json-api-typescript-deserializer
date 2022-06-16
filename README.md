## Deserialize JSON:API Type

- deserialize JSON:API TypeScript

## Usage

- [see sample code](https://github.com/NagaiKoki/json-api-typescript-deserializer/blob/master/demo/index.ts)

```ts
// Serialized JSON:API Type
type RelationShipsApiType = {
  data: {
    id: string;
    type: "user";
    attributes: {
      name: string;
    };
    relationships: {
      drinks: {
        data: {
          id: string;
          type: "drink";
        }[];
      };
      books: {
        data: {
          id: string;
          type: "book";
        }[];
      };
    };
    included:
      | {
          id: string;
          type: "drink";
          attributes: {
            name: string;
            image_url: string;
            created_at: string;
          };
        }[]
      | {
          id: string;
          type: "book";
          attributes: {
            title: string;
            image_url: string;
            published_at: string;
          };
        }[];
  };
};

type SampleRelationalJsonApiType =
  JsonApiRelationshipDeserializedType<RelationShipsApiType>;

// Deserialized JSON:API Type
const Sample3: SampleRelationalJsonApiType = {
  id: '1',
  name: "Nagai Koki",
  drinks: [
    {
      id: '1',
      name: "Coke",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      createdAt: "2021/01/01",
    },
  ],
  books: [
    {
      id: '1',
      title: "TDD",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      publishedAt: "2021/01/01",
    },
    {
      id: '2',
      title: "DDD",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      publishedAt: "2021/01/02",
    },
  ],
};
```
