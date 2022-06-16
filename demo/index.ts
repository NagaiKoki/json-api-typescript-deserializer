import {
  JsonApiDeserializedType,
  JsonApiRelationshipDeserializedType,
} from "../core";

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

type ArrayApiType = {
  data: {
    id: string;
    type: "user";
    attributes: {
      name: string;
      image_url: string;
      age: number | null;
    };
  }[];
};

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

type SampleBaseJsonApiType = JsonApiDeserializedType<ApiType>;
type SampleArrayJsonApiType = JsonApiDeserializedType<ArrayApiType>;
type SampleRelationalJsonApiType =
JsonApiRelationshipDeserializedType<RelationShipsApiType>;

const Sample1: SampleBaseJsonApiType = {
  id: '1',
  name: "Koki Nagai",
  imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
  age: 26,
};

const Sample2: SampleArrayJsonApiType = [
  {
    id: '1',
    name: "Koki Nagai",
    imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
    age: 26,
  },
  {
    id: '2',
    name: "Koki Nagai2",
    imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
    age: 21,
  },
];

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
