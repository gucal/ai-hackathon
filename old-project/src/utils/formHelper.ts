import type FormData from '../types/FormData';

export const getInitialFormState = (): FormData => ({
  name: '',
  email: '',
  password: '',
  gender: '',
  hobbies: [],
  country: '',
  bio: '',
  file: null,
});
