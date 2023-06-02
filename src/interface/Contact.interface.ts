export interface ContactInterface {
  id: string;
  name: string;
  phone: string;
}

export enum ContactType {
  PERSON = "@c.us",
  GROUP = "@g.us",
}
