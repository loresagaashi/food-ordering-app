import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef } from "react";
import {useQuery} from "react-query";
import { 

  TextFieldTableCell, 
 
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";

import { StoreHoursService } from "../../../service/StoreHoursService";

const storeHoursService = new StoreHoursService();

export default function StoreHoursView({}) {
    const errorRef = useRef();

    const columns = [
      {
        title: "Day Of Week",
        field: "dayOfWeek",
        editComponent: (props) => TextFieldTableCell(props, errorRef),
      },
    
      {
        title: "Start Time",
        field: "startTime",
        editComponent: (props) => TextFieldTableCell(props, errorRef),
      },
    
    
      {
        title: "End Time",
        field: "endTime",
        editComponent: (props) => TextFieldTableCell(props, errorRef),
      },
    
    
    
    
    
    
    ];
  
    return (
      <CustomMaterialTable
        title="Manage Store Hours"
        columns={columns}
        service={storeHoursServiceService}
        queryKey={QueryKeys.STOREHOURS}
        errorRef={errorRef}
        // disableDeleteAction
      />
    );
  }
  