import { BaseService } from "./BaseService";

export class JobPositionService extends BaseService {
  constructor() {
    super("/job/positions");
  }
}
