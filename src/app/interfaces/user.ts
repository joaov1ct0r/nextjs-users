export default interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  userWhoUpdatedId: string | null;
  photoUrl: string | null
}
