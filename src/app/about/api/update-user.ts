import { User } from "@/app/about/interfaces/user";
import { api } from "@/app/lib/axios";

interface UserData {
  name: string;
  username: string;
  email: string;
  id: string;
  password: string | undefined;
}

export async function updateUser(user: User) {
  const data: UserData = {
    name: user.name,
    username: user.username,
    email: user.email,
    id: user.id,
    password: undefined,
  };

  if (user.password) {
    data.password = user.password;
  }

  try {
    const response = await api.put("/user/", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
