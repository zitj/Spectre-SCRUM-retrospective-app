import { User } from './user';

export interface Team {
  id: number;
  name: string;
  industry: string;
  members: Array<User>;
  creator: User;
}
