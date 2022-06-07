import { api, authenticateApi } from "src/boot/axios";
import { useUserStore } from "src/stores/user-store";

const user = useUserStore();

export const recoverCredentials = () => {
  user.recover();
  authenticateApi(user.token);
};
export const signin = async ({ email, password }) => {
  const credentials = (await api.post("/user/auth", { email, password })).data;
  user.signin(credentials);
  authenticateApi(credentials.token);
};

export const signup = async ({ name, email, password }) => {
  return (await api.post("/user", { name, email, password })).data;
};
