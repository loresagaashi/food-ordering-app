import { CustomerService } from "../../../service/CustomerService";
import { CityService } from "../../../service/CityService";
import CustomMaterialTable from "../../../component/dashboard/CustomMaterialTable";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  NumberFieldTableCell,
  SelectTableCell,
  TextFieldTableCell,
} from "../../../component/TableCells";
import { QueryKeys } from "../../../service/QueryKeys";
import { DateTextFieldCell } from "../../../component/DateTextFieldCell ";
import DateFilter from "../../../component/DateFilter";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DatePickers from "../../../component/DatePickers";

const customersService = new CustomerService();
const cityService = new CityService();
export default function CustomersView({}) {
  const errorRef = useRef();
  const { data: allCities } = useQuery(QueryKeys.CITY, () =>
    cityService.findAll(),
  );

  const [birthDate, setBirthDate] = useState(new Date());

  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };
  const handleSaveOrUpdate = (newData, oldData) => {
    const dataToSend = { ...newData };
    dataToSend.birthDate = birthDate.toISOString().split('T')[0]; // Format birth date as YYYY-MM-DD
  
    // Make your request to the backend with dataToSend
    console.log('Data to send:', dataToSend);
  
    // Placeholder for making the request to the backend
    fetch('/api/customers', {
      method: 'POST', // Adjust method according to your backend API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save/update customer data');
      }
      // Handle successful response
      console.log('Customer data saved/updated successfully');
    })
    .catch(error => {
      console.error('Error saving/updating customer data:', error);
    });
  };

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
      // editComponent: (props) => (
      //   <DatePickers
      //     value={birthDate}
      //     onChange={handleBirthDateChange}
      //     {...props}
      //   />
      // ),
      editComponent: (props) => DateTextFieldCell(props, errorRef),
    },
    {
      title: "Phone Number",
      field: "phoneNumber",
      editComponent: (props) => TextFieldTableCell(props, errorRef),
    },
    {
      title: "City",
      field: "city",
      render: (rowData) => rowData.city?.name,
      editComponent: (props) =>
        SelectTableCell(
          props,
          errorRef,
          allCities?.map((x) => ({ value: x, label: x.name })) || [],
          "id",
        ),
    },
    {
      title: "Bonus Points",
      field: "bonusPoints",
      editComponent: (props) => NumberFieldTableCell(props, errorRef),
    },
  ];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <DateFilter rangeRef={errorRef} /> */}
      <CustomMaterialTable
        title="Manage Customers"
        columns={columns}
        service={customersService}
        queryKey={QueryKeys.CUSTOMERS}
        errorRef={errorRef}
        handleSaveOrUpdate={handleSaveOrUpdate}
      />
    </MuiPickersUtilsProvider>
  );
}
