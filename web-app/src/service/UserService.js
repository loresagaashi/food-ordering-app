import { BaseService } from "./BaseService";
import { axiosInstance } from "./axiosInstance";

export class UserService extends BaseService {
  constructor() {
    super("/users");
  }

  adminLogIn(body) {
    return axiosInstance.post(`/auth/login`, body);
  }
  clientLogIn(body) {
    return axiosInstance.post(`/auth/login`, body);
  }
}
