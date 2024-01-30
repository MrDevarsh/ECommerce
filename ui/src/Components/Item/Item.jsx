import React, { useContext, useEffect, useState } from "react";
import "./Item.css";
import data from "../Assets/img-data";
import Products from "../Products/Products";
import { IconButton, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Error from "../../Pages/Error";
import CustomLoader from "../../Pages/CustomLoader";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const Item = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [productData, setProductData] = useState(data);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);

  const [productData, setProductData] = useState([]);

  const token = accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!accessToken) {
          return;
        }

        console.log(token);

        const response = await axios.get(process.env.REACT_APP_BASE_URL + '/api/products/'
        , {
          headers: {
            'Authorization': `Bearer ` + token,
          }
        });

        setProductData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const loader = (
    <div className="loader-container">
      <CustomLoader />
    </div>
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on searchTerm
  const filteredProducts = productData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="item container">
      <h1>Products</h1>
      <hr />

      {loading ? (
        loader
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <TextField
            style={{ width: "50%", marginBottom: '10px' }}
            id="standard-bare"
            variant="standard"
            placeholder="Search a Product"
            type="search"
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />

          {filteredProducts.length === 0 ? (
            <div className="alert alert-danger rounded text-center d-block">
              No Product Found.
            </div>
          ) : (
            <div className="popular-item">
              {filteredProducts.map((item, i) => {
                return (
                  <Products
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Item;
