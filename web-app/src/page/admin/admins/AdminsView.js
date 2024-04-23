import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import { TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { AdminService } from "../../../service/AdminService";
import { DateTextFieldCell } from "../../../component/DateTextFieldCell ";

const adminsService = new AdminService();

export default function AdminsView({}) {
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
            type:"date",
            field: "birthDate",
            editComponent: (props) => DateTextFieldCell(props, errorRef),
          },
          {
            title: "Phone Number",
            field: "phoneNumber",
            editComponent: (props) => TextFieldTableCell(props, errorRef),
          },
      ];

      return (
        <CustomMaterialTable
          title="Manage Admins"
          columns={columns}
          service={adminsService}
          queryKey={QueryKeys.ADMINS}
          errorRef={errorRef}
        />
      );
  }