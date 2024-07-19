import { User } from 'src/apis/user/entities/user.entity';

export interface IOAuthUser {
  user: Pick<User, 'email' | 'name' | 'age' | 'point'>;
}
