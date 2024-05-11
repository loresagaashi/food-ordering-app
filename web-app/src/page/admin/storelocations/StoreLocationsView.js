import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { 
  TextFieldTableCell, 
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { StoreLocationService } from "../../../service/StoreLocationService";

const storeLocations = new StoreLocationService();
const storeHoursService = new storeHoursService();

export default function StoreLocationsView({}) {
    const errorRef = useRef();
    const {data: allStoreHours} = useQuery(QueryKeys.STOREHOURS, () => storeHoursService.findAll());
    const columns = [
        {
          title: "Name",
          field: "nameOfLocation",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "Working Hours",
          field: "workingHours",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        }
      ];

      return (
        <CustomMaterialTable
          title="Manage Store Locations"
          columns={columns}
          service={storeLocationService}
          queryKey={QueryKeys.STORELOCATION}
          errorRef={errorRef}
        />
      );
  }