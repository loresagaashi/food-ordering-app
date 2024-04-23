import { makeStyles, useTheme } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "@material-table/core";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';


export default function CustomMaterialTable({
  title,
  queryKey,
  service,
  columns,
  errorRef,
  disableDeleteAction 
}) {
  const theme = useTheme();
  const { isLoading, data, refetch } = useQuery(queryKey, () =>
    service.findAll(),
  );
  const { mutateAsync: createRecord } = useMutation(
    (payload) => service.create(payload),
    {
      onSuccess: onSuccessReset,
      onError: (e) => (errorRef.current = e),
    },
  );
  const { mutateAsync: updateRecord } = useMutation(
    (payload) => service.update(payload),
    {
      onSuccess: onSuccessReset,
      onError: (e) => (errorRef.current = e),
    },
  );
  const { mutateAsync: deleteRecord } = useMutation(
    (payload) => service.delete(payload),
    {
      onSuccess: onSuccessReset,
      onError: (e) => (errorRef.current = e),
    }
  );


  function onSuccessReset() {
    refetch();
    resetErrors();
  }

  function resetErrors() {
    errorRef.current = null;
  }
  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  const actions = disableDeleteAction ? [] : [
    {
      icon: DeleteIcon,
      tooltip: "Delete",
      onClick: (event, rowData) => handleDelete(rowData.id),
    },
  ];

  return (
    <MaterialTable
      style={{
        margin: "2em",
      }}
      isLoading={isLoading}
      localization={{
        header: {
          actions: "",
        },
      }}
      title={
        <Typography
          variant={"h4"}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0.5em",
          }}
        >
          {title}
        </Typography>
      }
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        pageSize: 10,
        headerStyle: {
          backgroundColor: "transparent",
        },
        paginationType: "stepped",
      }}
      editable={{
        onRowAdd: createRecord,
        onRowUpdate: updateRecord,
        onRowUpdateCancelled: resetErrors,
        onRowAddCancelled: resetErrors,
      }}
      actions={actions} 
    />
  );
}
