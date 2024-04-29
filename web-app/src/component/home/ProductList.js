import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { useQuery } from "react-query";
import { QueryKeys } from "../../service/QueryKeys";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function ProductList({}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { data: categories } = useQuery(QueryKeys.CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function handleChange(event, newValue) {
    setValue(newValue);
    setSelectedCategory(categories[newValue]);
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
      {selectedCategory && (
        <div>
          <h2>Products in {selectedCategory.name}</h2>
        </div>
      )}
    </Paper>
  );
}
