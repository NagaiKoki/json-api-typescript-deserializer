import ts, { createImportSpecifier, factory } from "typescript";
import path from "path";
import fs from "fs";
const { exec } = require("child_process");

const targetPath = path.resolve(__dirname, "./response.ts");
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const newFile = ts.createSourceFile(
  "result.ts",
  "",
  ts.ScriptTarget.ESNext,
  false,
  ts.ScriptKind.TS
);

const createProperty = (keyName: string, valueType: any, union?: boolean) => {
  if (!!union) {
    return ts.factory.createPropertySignature(
      undefined,
      keyName,
      undefined,
      ts.factory.createUnionTypeNode(valueType)
    );
  }
  return ts.factory.createPropertySignature(
    undefined,
    keyName,
    undefined,
    ts.factory.createKeywordTypeNode(valueType)
  );
};

const pushAttributesProperty = (
  property: ts.PropertySignature,
  deserializedProperties: any[]
) => {
  const type = property.type;
  if (type) {
    if (type.kind === ts.SyntaxKind.UnionType) {
      // @ts-expect-error
      const factoryNodes = type.types.map((t: ts.TypeNode) => {
        if (t.kind === ts.SyntaxKind.LiteralType) {
          return ts.factory.createLiteralTypeNode(factory.createNull());
        } else {
          // @ts-expect-error
          return ts.factory.createKeywordTypeNode(t.kind);
        }
      });
      deserializedProperties.push(
        // @ts-expect-error
        createProperty(property.name.escapedText, factoryNodes, true)
      );
    } else if (type.kind === ts.SyntaxKind.TypeLiteral) {
      const typeLiteralProperty: any[] = [];
      // @ts-expect-error
      property.type.members.forEach((member: ts.PropertySignature) => {
        pushAttributesProperty(member, typeLiteralProperty);
      });
      const attributes = ts.factory.createPropertySignature(
        undefined,
        // @ts-expect-error
        property.name.escapedText,
        undefined,
        ts.factory.createTypeLiteralNode(typeLiteralProperty)
      );
      deserializedProperties.push(attributes);
    } else {
      deserializedProperties.push(
        // @ts-expect-error
        createProperty(property.name.escapedText, type.kind)
      );
    }
  }
};

const createDeserializeTypes = (
  typeName: string,
  deserializedProperties: any[]
): ts.Node => {
  return ts.factory.createTypeAliasDeclaration(
    undefined,
    undefined,
    typeName,
    undefined,
    ts.factory.createTypeLiteralNode(deserializedProperties)
  );
};

// JSON:APIの第一階層のattributesを取得する
const createAttributes = (node: ts.Node, deserializedProperties: any[]) => {
  if (
    ts.isPropertySignature(node) &&
    // @ts-expect-error
    node.name.escapedText === "data" &&
    // @ts-expect-error
    hasJsonApiProperties(node.type.members)
  ) {
    // @ts-expect-error
    const attributeMember = node.type.members.find(
      // @ts-expect-error
      (member: ts.PropertySignature) => member.name.escapedText === "attributes"
    );
    if (!!attributeMember) {
      attributeMember.type.members.forEach((property: ts.PropertySignature) => {
        pushAttributesProperty(property, deserializedProperties);
      });
    }
  }
};

// JSON:APIのpropertyを持っているかどうか
const hasJsonApiProperties = (nodes: ts.PropertySignature[]) => {
  console.log(nodes[0].name);
  const idNode = nodes.find(
    (node) =>
      // @ts-expect-error
      node.name.escapedText === "id"
  );

  const attributeNode = nodes.find(
    // @ts-expect-error
    (node) => node.name.escapedText === "attributes"
  );
  return idNode && attributeNode;
};

const generateDeserializedJsonApiResponse = () => {
  let deserializedProperties: any[] = [];
  const program = ts.createProgram([targetPath], {});
  const source = program.getSourceFile(targetPath);

  deserializedProperties.push(
    createProperty("id", ts.SyntaxKind.StringKeyword)
  );

  if (source) {
    let typeName = "";
    ts.forEachChild(source, function next(node) {
      console.log(node);
      if (ts.isModuleDeclaration(node)) {
        // @ts-expect-error
        typeName = node.name.escapedText;
      }
      if (ts.isPropertySignature(node)) {
        createAttributes(node, deserializedProperties);
      }
      ts.forEachChild(node, next);
    });
    const result = printer.printNode(
      ts.EmitHint.Unspecified,
      createDeserializeTypes(typeName, deserializedProperties),
      newFile
    );

    console.log(result);

    fs.writeFile("./result.ts", result, (err) => {
      if (err) throw err;
      console.log("finished export!! yeah!");
    });
  }
};

generateDeserializedJsonApiResponse();
