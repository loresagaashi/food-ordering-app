import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { CategoryService } from "../../../service/CategoryService";
import { ProductService } from "../../../service/ProductService";

const productsService = new ProductService();
const categoryService = new CategoryService();
export default function ProductsView({}) {
    const errorRef = useRef();
    const {data: allCategories} = useQuery(QueryKeys.CATEGORIES, () => categoryService.findAll());
    const columns = [
        {
          title: "Name",
          field: "name",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
            title: "Description",
            field: "description",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: "Price",
            field: "price",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: 'Category',
            field: 'category',
            render: rowData => rowData.category?.name,
            editComponent: props => SelectTableCell(props, errorRef, allCategories?.map(x => ({value: x, label: x.name})) || [], "id")
        },
          {
            title: "Bonus Points",
            field: "bonusPoints",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
      ];

      return (
        <CustomMaterialTable
          title="Manage Products"
          columns={columns}
          service={productsService}
          queryKey={QueryKeys.PRODUCTS}
          errorRef={errorRef}
        />
      );
  }