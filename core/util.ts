type SnakeStringToCamelCaseType<T extends string> =
  T extends `${infer R}_${infer U}`
    ? `${R}${Capitalize<SnakeStringToCamelCaseType<U>>}`
    : T;

export type SnakeObjectToCamelType<T extends Record<string, unknown>> = {
  [K in keyof T as `${SnakeStringToCamelCaseType<
    string & K
  >}`]: T[K] extends Record<string, unknown>
    ? SnakeObjectToCamelType<T[K]>
    : T[K];
};

// Narrowing Union Object
export type FilterUnionObjectType<
  UnionObject extends Record<string, unknown>,
  UnionObjectKey extends keyof UnionObject,
  UnionObjectValue extends UnionObject[UnionObjectKey]
> = UnionObject extends { [x in UnionObjectKey]: UnionObjectValue }
  ? UnionObject
  : never;

// Extract Array<T> of T
export type ExtractArrayType<T> = T extends (infer U)[] ? U : T;
