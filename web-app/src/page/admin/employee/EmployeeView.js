import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { SelectTableCell, TextFieldTableCell } from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { EmployeeService } from "../../../service/EmployeeService";
import { StoreLocationService } from "../../../service/StoreLocationService";

const employeeService = new EmployeeService();
const storeLocationService = new StoreLocationService();

export default function EmployeeView({}) {
    const errorRef = useRef();
    const {data: allstoreLocations} = useQuery(QueryKeys.STORELOCATION, () => storeLocationService.findAll());
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
          title: "Job Position",
          field: "jobPosition",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: 'Store Location',
          field: 'storeLocation',
          render: rowData => rowData.storeLocation?.nameOfLocation,
          editComponent: props => SelectTableCell(props, errorRef, allstoreLocations?.map(x => ({value: x, label: x.nameOfLocation})) || [], "id")
        },
      ];

      return (
        <CustomMaterialTable
          title="Manage Employees"
          columns={columns}
          service={employeeService}
          queryKey={QueryKeys.EMPLOYEE}
          errorRef={errorRef}
        />
      );
  }