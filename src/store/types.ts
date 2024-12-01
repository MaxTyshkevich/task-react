export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id: string;
  login: string;
  password: string;
  roles: UserRole[];
}

/* export interface IProfile {
  id: string;
  user: IUser;
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
  userId?: string;
} */

export interface IPost {
  id: string;
  profileId: string;
  body: string;
  commentsIds: string[];
  img: string;
  likes: ProfileLiks[];
}

interface ProfileLiks {
  id: string;
  profileId: string;
}

export interface IComment {
  id: string;
  body: string;
  postId: string;
  profileId: string;
}

//update types
export interface IProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  avatar: string;
}

export interface IPostWithProfile {
  id: string;
  profileId: string;
  body: string;
  commentsIds: string[];
  likes: number;
  img: string;
  profile: IProfile;
}

export interface ICommenttWithProfile {
  id: string;
  body: string;
  postId: string;
  profileId: string;
  profile: IProfile;
}

//  console.log(`AvatarTooltip`, { profile });
