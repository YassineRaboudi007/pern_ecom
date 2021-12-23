import API from "../api/axios.config";

class UserService {
  static signup = async (fields) => {
    try {
      const res = await API.post("/users/signup", fields);
      const { token } = res.data;
      return token;
    } catch (err) {
      throw err;
    }
  };

  static signin = async (fields) => {
    try {
      const res = await API.post("/users/signin", fields);
      return res.data;
    } catch (e) {
      throw e;
    }
  };
}

export default UserService;
