import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { 
  TextFieldTableCell, 
  SelectTableCell
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { StoreLocationService } from "../../../service/StoreLocationService";
import { StoreHoursService } from "../../../service/StoreHoursService";

const storeLocationsService = new StoreLocationService();
const storeHoursService = new StoreHoursService();

export default function StoreLocationsView({}) {
    const errorRef = useRef();
    const {data: allStoreHours} = useQuery(QueryKeys.STOREHOURS, () => storeHoursService.findAll());
    const columns = [
        {
          title: "Name of Location",
          field: "nameOfLocation",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "Working Hours",
          field: "workingHours",
          render: rowData => `${rowData.workingHours?.startTime}-${rowData.workingHours?.endTime}`,
          editComponent: props => SelectTableCell(props, errorRef, allStoreHours?.map(x => ({ value: x.id, label: `${x.startTime} - ${x.endTime}` })) || [], "id")
        },
    ];

    return (
      <CustomMaterialTable
        title="Manage Store Locations"
        columns={columns}
        service={storeLocationsService}
        queryKey={QueryKeys.STORELOCATION}
        errorRef={errorRef}
      />
    );
}