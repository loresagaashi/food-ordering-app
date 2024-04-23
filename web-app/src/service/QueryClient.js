import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { CategoryService } from "./CategoryService";
import { CustomerService } from "./CustomerService";
import { AdminService } from "./AdminService";
import { CityService } from "./CityService";

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
};
