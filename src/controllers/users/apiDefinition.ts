export interface Request {
  body: { username: string; password: string };
  headers: { authorization: string };
}

export interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}
