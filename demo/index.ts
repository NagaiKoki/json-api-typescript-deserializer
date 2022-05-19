import {
  JsonApiDeserializeType,
  JsonApiRelationshipDeserializeType,
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

type SampleBaseJsonApiType = JsonApiDeserializeType<ApiType>;
type SampleArrayJsonApiType = JsonApiDeserializeType<ArrayApiType>;
type SampleRelationalJsonApiType =
  JsonApiRelationshipDeserializeType<RelationShipsApiType>;

const Sample1: SampleBaseJsonApiType = {
  name: "Koki Nagai",
  imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
  age: 26,
};

const Sample2: SampleArrayJsonApiType = [
  {
    name: "Koki Nagai",
    imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
    age: 26,
  },
  {
    name: "Koki Nagai2",
    imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
    age: 21,
  },
];

const Sample3: SampleRelationalJsonApiType = {
  name: "Nagai Koki",
  drinks: [
    {
      name: "Coke",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      createdAt: "2021/01/01",
    },
  ],
  books: [
    {
      title: "TDD",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      publishedAt: "2021/01/01",
    },
    {
      title: "DDD",
      imageUrl: "https://avatars.githubusercontent.com/u/50698194?v=4",
      publishedAt: "2021/01/02",
    },
  ],
};
