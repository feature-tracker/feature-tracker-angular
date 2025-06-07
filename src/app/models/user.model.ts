
export interface UserProfile {
  sub: string;
  email: string;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
}

export interface UserDto {
  username: string;
  email: string;
  fullName: string;
  role: string;
}
