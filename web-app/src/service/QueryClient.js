import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { CategoryService } from "./CategoryService";
import { CustomerService } from "./CustomerService";
import { AdminService } from "./AdminService";
import { CityService } from "./CityService";
import { ProductService } from "./ProductService";
import { EmployeeService } from "./EmployeeService";
import { StoreLocationService } from "./StoreLocationService";
import { JobPositionService } from "./JobPositionService";
import { OfferService } from "./OfferService";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (count, error) =>
        error.response?.status !== 401 &&
        error.response?.status !== 403 &&
        count < 3,
    },
  },
});

export const setQueryDefaults = () => {
  const categoriesService = new CategoryService();
  const customersService = new CustomerService();
  const adminsService = new AdminService();
  const cityService = new CityService();
  const productService = new ProductService();
  const employeeService = new EmployeeService();
  const storeLocationService = new StoreLocationService();
  const jobPositionService = new JobPositionService();
  const offerService = new OfferService();

  queryClient.setQueryDefaults(QueryKeys.CATEGORIES, {
    queryFn: () => categoriesService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CUSTOMERS, {
    queryFn: () => customersService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.ADMINS, {
    queryFn: () => adminsService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.CITY, {
    queryFn: () => cityService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.PRODUCTS, {
    queryFn: () => productService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.STORELOCATION, {
    queryFn: () => storeLocationService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.EMPLOYEE, {
    queryFn: () => employeeService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.JOBPOSITION, {
    queryFn: () => jobPositionService.findAll(),
  });
  queryClient.setQueryDefaults(QueryKeys.OFFER, {
    queryFn: () => offerService.findAll(),
  });
};
