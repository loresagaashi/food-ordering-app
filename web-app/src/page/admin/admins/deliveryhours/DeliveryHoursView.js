import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { 
 
  TextFieldTableCell, 
 
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { DeliveryHoursService} from "../../../service/DeliveryHoursService";
import { StoreHoursService } from "../../../service/StoreHoursService";

const storeHoursService = new StoreHoursService();
const deliveryHoursService = new DeliveryHoursService();
export default function DeliveryHoursView({}) {
    const errorRef = useRef();
    const {data: allDeliveries} = useQuery(QueryKeys.DELIVERYHOURS, () => deliveryHoursServiceService.findAll());
    const columns = [
        {
          title: "Day of Week",
          field: "dayOfWeek",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "Start time",
          field: "startTime",
          editComponent: (props) => TextFieldTableCell(props, errorRef),
        },
        {
          title: "End time",
          field: "endTime",
          render: rowData => `${rowData.price.toFixed(2)}$`,
          editComponent: (props) => PriceFieldTableCell(props, errorRef), 
        },
    ]

      return (
        <CustomMaterialTable
          title="Delivery Hours"
          columns={columns}
          service={deliveryHoursService}
          queryKey={QueryKeys.DELIVERYHOURS}
          errorRef={errorRef}
        />
      );
      }