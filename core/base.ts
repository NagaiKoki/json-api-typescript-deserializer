import { SnakeObjectToCamelType } from './util'

export type BaseJsonApiType = {
  data: {
    id: string
    type: string
    attributes: Record<string, unknown>
  }
}

export type BaseJsonApiArrayType = {
  data: BaseJsonApiType['data'][]
}

export type BaseRelationshipApiType<
  MetaType extends Record<string, unknown> = Record<string, unknown>
> = {
  data: {
    id: string
    type: string
    attributes: Record<string, unknown>
    relationships: Record<
      string,
      {
        data: {
          id: string
          type: string
        }[]
      }
    >
    included: BaseJsonApiType['data'][]
  }
  meta?: SnakeObjectToCamelType<MetaType>
}

export type BaseRelationshipApiArrayType<
  MetaType extends Record<string, unknown> = Record<string, unknown>
> = {
  data: BaseRelationshipApiType<MetaType>['data'][]
  meta?: BaseRelationshipApiType<MetaType>['meta']
}
