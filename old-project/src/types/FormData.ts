export default interface FormData {
  name: string;
  email: string;
  password: string;
  gender: string;
  hobbies: string[];
  country: string;
  bio: string;
  file: File | null;
}
