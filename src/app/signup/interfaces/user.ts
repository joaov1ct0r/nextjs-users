export default interface User {
  username: string;
  email: string;
  name: string;
  password: string;
  file: File | null;
}
