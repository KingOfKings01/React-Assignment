import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productsSlice";
import { Pagination } from "@mui/material";
import { BeatLoader } from "react-spinners";

export default function Products() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const [pageNumber, setPageNumber] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = pageNumber * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const numOfPages = Math.ceil(products.length / recordsPerPage);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status == "loading") {
    return (
      <div
        style={{ height: "500px" }}
        className="d-flex align-items-sm-center justify-content-center"
      >
        <BeatLoader color="rgba(0, 0, 0, 1)" />
      </div>
    );
  }

  if (status == "error") {
    return (
      <div className="text-danger">
        <h1>Sorry for inconvenience</h1>
        <h2>We are currently fixing this issue</h2>
        <h2>Please try after some time</h2>
      </div>
    );
  }

  const addToCart = (product) => {
    if (!cart.includes(product)) {
      dispatch(add(product));
    }
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth", //* Use smooth scrolling
    });
  };

  const cards = products.map((product, idx) => {
    return (
      <div key={idx} className="col-md-3 my-2 d-flex justify-content-center">
        <Card style={{ width: "18rem" }} className="d-flex flex-column">
          <Card.Img variant="top" src={product.imageUrl} height={220} />
          <Card.Body style={{ height: "120px" }}>
            <Card.Title className="fs-6">{product.title}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
          </Card.Body>
          <Card.Footer className='d-flex justify-content-center '>
            {!cart.includes(product) ? (
              <Button variant="primary" onClick={() => addToCart(product)}>
                Add to cart
              </Button>
            ) : (
              <Button variant="success">
                Item added
              </Button>
            )}
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <>
      <div className="row">{cards.slice(firstIndex, lastIndex)}</div>

      <div className="d-flex justify-content-center">
        <Pagination
          className="my-5"
          style={{ paddingBottom: "100px" }}
          color="primary"
          count={numOfPages}
          siblingCount={3}
          page={pageNumber}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
