import { CustomerService } from "../../../service/CustomerService";
import { CityService } from "../../../service/CityService";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { NumberFieldTableCell, SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { DateTextFieldCell } from "../../../component/DateTextFieldCell ";

const customersService = new CustomerService();
const cityService = new CityService();
export default function CustomersView({}) {
    const errorRef = useRef();
    const {data: allCities} = useQuery(QueryKeys.CITY, () => cityService.findAll());
    const columns = [
        {
          title: "First Name",
          field: "firstName",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
            title: "Last Name",
            field: "lastName",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: "Email",
            field: "email",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: "Password",
            field: "password",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: "Birth Date",
            field: "birthDate",
            editComponent: (props) => DateTextFieldCell(props, errorRef),
          },
          {
            title: "Phone Number",
            field: "phoneNumber",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
          {
            title: 'City',
            field: 'city',
            render: rowData => rowData.city?.name,
            editComponent: props => SelectTableCell(props, errorRef, allCities?.map(x => ({value: x, label: x.name})) || [], "id")
        },
          {
            title: "Bonus Points",
            field: "bonusPoints",
            editComponent: (props) => NumberFieldTableCell(props, errorRef),
          },
      ];

      return (
        <CustomMaterialTable
          title="Manage Customers"
          columns={columns}
          service={customersService}
          queryKey={QueryKeys.CUSTOMERS}
          errorRef={errorRef}
        />
      );
  }