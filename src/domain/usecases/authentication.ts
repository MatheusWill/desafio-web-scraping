export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = Promise<string | null>;
}

export interface Authentication {
  auth(authentication: Authentication.Params): Authentication.Result;
}
