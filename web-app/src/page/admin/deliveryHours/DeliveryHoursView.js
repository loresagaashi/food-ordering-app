import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { 
  SelectTableCell,
  TextFieldTableCell, 
  DayOfWeekTableCell
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { DeliveryHoursService} from "../../../service/DeliveryHoursService";
import { StoreHoursService } from "../../../service/StoreHoursService";

const storeHoursService = new StoreHoursService();
const deliveryHoursService = new DeliveryHoursService();
export default function DeliveryHoursView({}) {
    const errorRef = useRef();
    const {data: allStoreHours} = useQuery(QueryKeys.STOREHOURS, () => storeHoursService.findAll());
    
    const columns = [
        {
          title: "Day Of Week",
          field: "dayOfWeek",
          editComponent: (props) => DayOfWeekTableCell(props, errorRef),
        },
        {
          title: "Start time",
          field: "startTime",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "End time",
          field: "endTime",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: 'Store Hours',
          field: 'storeHours',
          render: rowData => `${rowData.storeHours?.startTime}-${rowData.storeHours?.endTime}`,
          editComponent: props => SelectTableCell(props, errorRef, allStoreHours?.map(x => ({ value: x.id, label: `${x.startTime} - ${x.endTime}` })) || [], "id")
        },
    ]

    return (
      <CustomMaterialTable
        title="Manage Delivery Hours"
        columns={columns}
        service={deliveryHoursService}
        queryKey={QueryKeys.DELIVERYHOURS}
        errorRef={errorRef}
      />
    );
}