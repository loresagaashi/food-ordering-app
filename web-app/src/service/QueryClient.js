import { QueryClient } from "react-query";
import { QueryKeys } from "./QueryKeys";
import { CategoryService } from "./CategoryService";

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

  queryClient.setQueryDefaults(QueryKeys.CATEGORIES, {
    queryFn: () => categoriesService.findAll(),
  });
};
