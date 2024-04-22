import Carousel from "react-material-ui-carousel";
import { Box } from "@material-ui/core";
import image1 from "../../images/home/1.png";
import image2 from "../../images/home/2.png";
import image3 from "../../images/home/3.png";
import image4 from "../../images/home/4.png";
import image5 from "../../images/home/5.png";
import ProductList from "../../component/home/ProductList";

export default function HomePage() {
  const items = [
    {
      image: image2,
    },
    {
      image: image1,
    },
    {
      image: image4,
    },
    {
      image: image3,
    },
    {
      image: image5,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box style={{ margin: "60px", borderRadius: "20px", width: "80%" }}>
        <Carousel>
          {items.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </Carousel>
      </Box>
      <ProductList />
    </Box>
  );
}

function Item(props) {
  return (
    <img
      src={props.item.image}
      alt={props.item.name}
      style={{ height: "60vh", width: "100%", borderRadius: "20px" }}
    />
  );
}
