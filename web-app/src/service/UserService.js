import { BaseService } from "./BaseService";
import { axiosInstance } from "./axiosInstance";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  adminLogIn(body) {
    return axiosInstance.post(`/admins/login`, body);
  }
  clientLogIn(body) {
    return axiosInstance.post(`/customers/login`, body);
  }
}
