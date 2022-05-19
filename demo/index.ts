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
