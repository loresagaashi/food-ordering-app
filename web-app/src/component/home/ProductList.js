import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      spacing={2}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ margin: 0, width: "100%" }}
      {...other}
    >
      {value === index && children}
    </Grid>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function ProductList({}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data: categories } = useQuery(QueryKeys.CATEGORIES);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {categories?.map((category, index) => (
          <Tab key={index} label={category.name} />
        ))}
      </Tabs>
      <div>
        {categories?.map((category, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Grid
              container
              spacing={2}
              style={{ marginTop: "80px", marginBottom: "40px" }}
            >
              {category?.products?.map((product) => {
                return (
                  <Grid
                    key={product?.id}
                    item
                    xs={4}
                    style={{
                      marginBottom: "60px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <img
                        src={`../../../products/${product.imageUrl}`}
                        alt={"product"}
                        width={"250px"}
                        height={"150px"}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "115%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        <Typography>{product?.name}</Typography>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </TabPanel>
        ))}
      </div>
    </Paper>
  );
}
