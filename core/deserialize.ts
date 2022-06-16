import {
  SnakeObjectToCamelType,
  NarrowUnionObjectType,
  ExtractArrayType,
} from "./util";
import { BaseJsonApiType, BaseJsonApiArrayType, BaseRelationshipApiType, BaseRelationshipApiArrayType } from './base'

export type JsonApiDeserializedType<T extends BaseJsonApiType | BaseJsonApiArrayType> =
  T extends BaseJsonApiType
    ? SnakeObjectToCamelType<T['data']['attributes']> & { id: string }
    : T extends BaseJsonApiArrayType
    ? SnakeObjectToCamelType<ExtractArrayType<T['data']>['attributes'] & { id: string }>[]
    : never

export type JsonApiDeserializedWithMetaType<
  T extends BaseJsonApiType | BaseJsonApiArrayType,
  MetaType extends Record<string, unknown>
> = {
  data: JsonApiDeserializedType<T>
  meta: SnakeObjectToCamelType<MetaType>
}

export type JsonApiRelationshipDeserializedType<
  T extends BaseRelationshipApiType | BaseRelationshipApiArrayType
> = JsonApiDeserializedType<T> &
  (T extends BaseRelationshipApiType
    ? SnakeObjectToCamelType<{
        [K in keyof T['data']['relationships']]: SnakeObjectToCamelType<
          NarrowUnionObjectType<
            ExtractArrayType<T['data']['included']>,
            'type',
            ExtractArrayType<T['data']['relationships'][K]['data']>['type']
          >['attributes'] & { id: string }
        >[]
      }>
    : T extends BaseRelationshipApiArrayType
    ? SnakeObjectToCamelType<{
        [K in keyof ExtractArrayType<T['data']>['relationships']]: SnakeObjectToCamelType<
          NarrowUnionObjectType<
            ExtractArrayType<ExtractArrayType<T['data']>['included']>,
            'type',
            ExtractArrayType<ExtractArrayType<T['data']>['relationships'][K]['data']>['type']
          >['attributes'] & { id: string }
        >[]
      }>[]
    : never)

export type JsonApiRelationshipDeserializedWithMetaType<
  T extends BaseRelationshipApiType | BaseRelationshipApiArrayType,
  MetaType extends Record<string, unknown>
> = {
  data: JsonApiRelationshipDeserializedType<T>
  meta: SnakeObjectToCamelType<MetaType>
}
