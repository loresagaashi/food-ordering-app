import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  useMediaQuery,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MaterialTable from "@material-table/core";
import { formatCurrency, formatName, getCurrency } from "../utils/Utils";
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "../service/QueryKeys";
import LoadingButton, { SuccessLoadingButton } from "./LoadingButton";
import { SelectTableCell, TextFieldTableCell } from "./TableCells";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import { OrderLineService } from "../service/OrderLineService";
import { CustomerService } from "../service/CustomerService";
import { OrderDetailService } from "../service/OrderDetailService";
import OrderDetails from "./home/OrderDetails";

const orderLineService = new OrderLineService();
const customerService = new CustomerService();
const orderDetailService = new OrderDetailService();

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
  },
  dialogTitle: {
    backgroundColor: theme.palette.background.paper,
  },
  dialogContent: {
    backgroundColor: theme.palette.background.default,
    overflowY: "hidden",
  },
}));

export default function OrderEditDialog({
    order,
    setOrder,
    open,
    setOpen,
    refetch,
  }) {
    const errorRef = useRef();
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { data: orderDetails } = useQuery(QueryKeys.ORDERLINE, () =>
      orderLineService.findAll()
    );
    const { data: customers } = useQuery(QueryKeys.CUSTOMERS, () =>
      customerService.findAll()
    );
    const {mutateAsync: validateOrder} = useMutation(order => orderLineService.validateOnCreate(order), {
      onError: e => errorRef.current = e
  });
    const { mutateAsync: updateAppointment } = useMutation(
      (order) => orderDetailService.update(order),
      {
        onSuccess: () => {
          setOpen(false);
          refetch();
        },
        onError: (e) => (errorRef.current = e),
      }
    );
    const columns = [
      {
        title: "Customer",
        field: "customer",
        render: (rowData) => rowData.customer?.firstName,
        editComponent: (props) =>
          SelectTableCell(
            props,
            errorRef,
            customers?.map((x) => ({ value: x, label: x.firstName })) || [],
            "id"
          ),
      },
      {
        title: "OrderLine",
        field: "lines",
        render: (rowData) =>
          formatName(rowData.lines.product, rowData.lines.price),
        editComponent: (props) =>
          SelectTableCell(
            props,
            errorRef,
            orderDetails?.map((x) => ({ value: x, label: x.product })) || [],
            "id"
          ),
      },
      {
        title: "Price",
        field: "lines.price",
        render: (rowData) => formatCurrency(rowData.lines.price),
        editComponent: (props) =>
          TextFieldTableCell(props, errorRef, "number", {
            InputProps: {
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">{getCurrency()}</InputAdornment>
              ),
            },
          }),
      },
    ];
  
    const [isLoading, setIsLoading] = useState(false);
  
    function handleSave() {
      setIsLoading(true);
      updateAppointment(order).finally(() => setIsLoading(false));
    }
  
    function handleUpdate(rowData) {
      return new Promise((resolve) => {
        setOrder((prev) => ({
          ...prev,
          orderLines: prev.orderLines.map((line) => {
            if (line.id === rowData.id) {
              return rowData;
            }
            return line;
          }),
        }));
        resolve();
      });
    }
  
    function handleAdd(rowData) {
      const orderLine = {...rowData, order: order?.orderLines?.length || 1}
      return validateOrder(orderLine)
          .then(() => setOrder(prev => ({
              ...prev,
              orderLines: [...prev.orderLines, orderLine]
          })));
    }
  
    function handleDelete(rowData) {
      return new Promise((resolve) => {
        setOrder((prev) => ({
          ...prev,
          orderLines: prev.orderLines.filter((x) => x.id !== rowData.id),
        }));
        resolve();
      });
    }
  
    function resetErrors() {
      errorRef.current = null;
    }
  
    return (
      <Dialog
        fullWidth
        maxWidth="lg"
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className={classes.dialogTitle}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <EditIcon className={classes.icon} />
            Edit Order
          </Box>
        </DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent className={classes.dialogContent}>
          <MaterialTable
            style={{
              margin: theme.spacing(2),
            }}
            isLoading={isLoading}
            localization={{
              header: {
                actions: "",
              },
            }}
            title={
              <Box display="flex" justifyContent="center" alignItems="center">
                <PersonIcon fontSize={"large"} color={"primary"} />
                <Typography
                  variant={"h5"}
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: "0.5em",
                  }}
                >
                  {`${order.customer.firstName} ${order.customer.lastName}`} {/* Update to order.customer */}
                </Typography>
              </Box>
            }
            columns={columns}
            data={order.lines}
            options={{
              search: false,
              paging: false,
              actionsColumnIndex: -1,
              minBodyHeight: "50vh",
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
            editable={{
              onRowAdd: handleAdd,
              onRowAddCancelled: resetErrors,
              onRowUpdate: handleUpdate,
              onRowDelete: handleDelete,
            }}
          />
        </DialogContent>
        <DialogActions
          style={{ backgroundColor: theme.palette.background.default, padding: theme.spacing(2, 4) }}
        >
          <LoadingButton
            variant="outlined"
            color={"primary"}
            autoFocus
            onClick={() => setOpen(false)}
            icon={<CancelIcon />}
          >
            Cancel
          </LoadingButton>
          <SuccessLoadingButton
            variant="outlined"
            onClick={handleSave}
            autoFocus
            loading={isLoading}
            style={{ marginLeft: theme.spacing(2) }}
            icon={<SaveIcon />}
          >
            Save
          </SuccessLoadingButton>
        </DialogActions>
      </Dialog>
    );
  }
  