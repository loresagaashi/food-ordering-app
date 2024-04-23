import { CustomerService } from "../../../service/CustomerService";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { DateTextFieldCell } from "../../../component/DateTextFieldCell ";

const customersService = new CustomerService();

export default function CustomersView({}) {
    const errorRef = useRef();

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
            title: "Bonus Points",
            field: "bonusPoints",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
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