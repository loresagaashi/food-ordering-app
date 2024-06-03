import React, { useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useMutation } from 'react-query';
import PendingIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import InProgressIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CompletedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { format } from 'date-fns';
import OrderTab from '../../../component/OrderTab';
import { OrderDetailService } from '../../../service/OrderDetailService';
import OrderEditDialog from '../../../component/OrderEditDialog';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function getTabColor(value, theme) {
  switch (value) {
    case 0:
      return { color: theme.palette.primary.main };
    case 1:
      return { color: theme.palette.secondary.main };
    case 2:
      return { color: theme.palette.warning.main };
    case 3:
      return { color: theme.palette.success.main };
    default:
      throw new Error('Tab color not specified!');
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: 'calc(100% - 65px)',
    '& > div': {
      height: 'calc(100% - 54px) !important',
    },
    '& .react-swipeable-view-container': {
      height: '100%',
    },
  },
  tabHeader: {
    height: 54,
    '& *.Mui-selected': {
      color: (props) => props.color,
    },
    '& *.MuiTab-wrapper': {
      flexDirection: 'row',
      '& :first-child': {
        marginRight: theme.spacing(1),
      },
    },
    '& *.MuiTab-labelIcon': {
      minHeight: 54,
    },
  },
  tabIndicator: {
    backgroundColor: (props) => props.color,
  },
  swipeableViews: {
    height: '100%',
    overflow: 'hidden !important',
    backgroundColor: theme.palette.background.default,
  },
}));

const statusByIndex = new Map([
  [0, 'IN_PROGRESS'],
  [1, 'PROCESSING'],
  [2, 'DELIVERING'],
  [3, 'COMPLETED'],
]);

const orderDetailService = new OrderDetailService();

export default function OrdersView({}) {
  const theme = useTheme();
  const rangeRef = useRef({ from: new Date(), to: new Date() });
  const [order, setOrder] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState(0);
  const [user, setUser] = useState('');
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const { mutate: searchOrders, data, isLoading } = useMutation(({ status, user, from, to }) =>
    orderDetailService.findByDateBetweenAndStatusAndUser(status, user, from, to)
  );
  const { mutate: moveToProgress } = useMutation((order) => orderDetailService.moveToProgress(order), {
    onSuccess: handleSearch,
  });
  const { mutate: moveToDelivering } = useMutation((order) => orderDetailService.moveToDelivering(order), {
    onSuccess: handleSearch,
  });
  const { mutate: moveToCompleted } = useMutation((order) => orderDetailService.moveToCompleted(order), {
    onSuccess: handleSearch,
  });
  const { mutate: deleteAppointment } = useMutation((id) => orderDetailService.delete(id), {
    onSuccess: handleSearch,
  });
  const classes = useStyles(getTabColor(value, theme));

  useEffect(() => {
    handleSearch();
  }, [value]);

  function handleMoveToProgress(order) {
    return moveToProgress(order);
  }

  function handleMoveToDelivering(order) {
    return moveToDelivering(order);
  }

  function handleMoveToCompleted(order) {
    return moveToCompleted(order);
  }

  function handleSearch() {
    if (!rangeRef.current || !rangeRef.current.from || !rangeRef.current.to) {
      console.error('Range reference is not properly defined');
      return;
    }

    const filters = {
      status: statusByIndex.get(value),
      user: user,
      from: format(rangeRef.current.from, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      to: format(rangeRef.current.to, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
    };

    console.log('Searching orders with filters:', filters);
    searchOrders(filters);
  }

  function handleEditClick(order) {
    setOrder(order);
    setOpenEdit(true);
  }

  function handleDeleteClick(order) {
    deleteAppointment(order.id);
  }

  // // Updated handleSubmitOrder function to re-fetch orders after submission
  // function handleSubmitOrder(orderDetails) {
  //   onSubmitOrder(orderDetails).then(() => {
  //     setSubmittedOrders((prevOrders) => [...prevOrders, orderDetails]);
  //     handleSearch(); // Re-fetch orders to include the new order
  //   });
  // }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            TabIndicatorProps={{ className: classes.tabIndicator }}
            className={classes.tabHeader}
          >
            <Tab label="In progress" icon={<PendingIcon />} {...a11yProps(0)} />
            <Tab label="Processing" icon={<InProgressIcon />} {...a11yProps(1)} />
            <Tab label="Delivering" icon={<InProgressIcon />} {...a11yProps(2)} />
            <Tab label="Completed" icon={<CompletedIcon />} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={setValue}
          slideClassName={classes.swipeableViews}
        >
          <OrderTab
            index={0}
            label="In progress"
            value={value}
            rangeRef={rangeRef}
            data={data}
            user={user}
            setUser={setUser}
            isLoading={isLoading}
            onMoveClick={handleMoveToProgress}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            handleSearch={handleSearch}
          />
          <OrderTab
            index={1}
            label="Processing"
            value={value}
            rangeRef={rangeRef}
            data={data}
            user={user}
            setUser={setUser}
            isLoading={isLoading}
            onMoveClick={handleMoveToProgress}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            handleSearch={handleSearch}
          />
          <OrderTab
            index={2}
            label="Delivering"
            value={value}
            rangeRef={rangeRef}
            data={data}
            user={user}
            setUser={setUser}
            isLoading={isLoading}
            onMoveClick={handleMoveToDelivering}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            handleSearch={handleSearch}
          />
          <OrderTab
            index={3}
            label="Completed"
            value={value}
            rangeRef={rangeRef}
            data={data}
            user={user}
            setUser={setUser}
            isLoading={isLoading}
            onMoveClick={handleMoveToCompleted}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            handleSearch={handleSearch}
          />
        </SwipeableViews>
        {openEdit && <OrderEditDialog appointment={order} setAppointment={setOrder} open={openEdit} setOpen={setOpenEdit} refetch={handleSearch} />}
      </div>
    </MuiPickersUtilsProvider>
  );
}