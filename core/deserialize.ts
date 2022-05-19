import {
  SnakeObjectToCamelType,
  FilterUnionObjectType,
  ExtractArrayType,
} from "./util";

// base of normal JSON:API type with no meta
type BaseJsonApiType = {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
};

// base of relation JSON:API type
type BaseRelationShipApiType = {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships: Record<
    string,
    {
      data: {
        id: string;
        type: string;
      }[];
    }
  >;
  included: BaseJsonApiType[];
};

// Base JSON:API Deserialize Type
export type JsonApiDeserializeType<
  T extends { data: BaseJsonApiType | BaseJsonApiType[] }
> = T extends { data: BaseJsonApiType }
  ? SnakeObjectToCamelType<T["data"]["attributes"]>
  : T extends { data: BaseJsonApiType[] }
  ? SnakeObjectToCamelType<ExtractArrayType<T["data"]>["attributes"]>[]
  : never;

// Relation JSON:API Deserialize Type
export type JsonApiRelationshipDeserializeType<
  T extends {
    data: BaseRelationShipApiType;
  }
> = SnakeObjectToCamelType<T["data"]["attributes"]> &
  SnakeObjectToCamelType<{
    [K in keyof T["data"]["relationships"]]: SnakeObjectToCamelType<
      FilterUnionObjectType<
        ExtractArrayType<T["data"]["included"]>,
        "type",
        ExtractArrayType<T["data"]["relationships"][K]["data"]>["type"]
      >["attributes"]
    >[];
  }>;
