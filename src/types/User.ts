export interface User {
  id?: number;        // optional because backend generates it
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}