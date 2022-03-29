export namespace Schemas {}
export namespace Responses {
  export namespace Sample {
    export interface Content {
      "application/json": {
        data: {
          id: string;
          type: string;
          attributes: {
            name: string;
            imageUrl: string;
            status: string | null;
          };
        };
      };
    }
  }
}
