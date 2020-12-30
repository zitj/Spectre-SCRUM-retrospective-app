export interface Dashboard {
  id: number;
  name: string;
  template: string;
  teamName: string;
  posts: Array<string>;
  teamId: number;
  creatorId: number;
}
