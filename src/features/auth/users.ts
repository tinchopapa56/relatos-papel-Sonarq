export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "reader";
  memberSince: string;
}

export const users: User[] = [
  {
    id: "1",
    name: "Martin Ruiz",
    email: "test@relatos.com",
    password: "test123",
    role: "reader",
    memberSince: "Diciembre 2023",
  },
  {
    id: "2",
    name: "Administrador",
    email: "admin@relatos.com",
    password: "admin123",
    role: "admin",
    memberSince: "Enero 2024",
  },
  {
    id: "3",
    name: "Jero",
    email: "jero@relatos.com",
    password: "jero123",
    role: "reader",
    memberSince: "Febrero 2024",
  },
];
