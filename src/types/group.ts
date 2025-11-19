export type GroupCreateRequest = {
  name: string;
  url: string;
};

export type GroupCreateResponse = {
  name: string;
  image: string;
  updatedAt: Date;
  createdAt: Date;
  id: number;
};
