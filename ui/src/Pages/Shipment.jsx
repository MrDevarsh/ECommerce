import React, { useContext, useState } from "react";
import img2 from "../Components/Assets/img2.jpg";
import { IconButton, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import CustomLoader from "./CustomLoader";
import Error from "./Error";
import { Paper } from "@mui/material";

const Shipment = () => {
  const containerStyle = {
    backgroundImage: `url(${img2})`,
    backgroundPosition: "bottom right",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f3ff",
  };

  const inputStyle = {
    width: "400px",
    padding: "15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#333",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const [shipmentId, setShipmentId] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const [shipmentDetails, setShipmentDetails] = useState({});

  const { accessToken } = useContext(AuthContext);

  const token = accessToken;

  const handleSearch = () => {
    try {
      if (!accessToken) {
        return;
      }

      console.log(token);

      const response = axios.post(
        process.env.REACT_APP_BASE_URL + "/api/shipmentDetails/" + shipmentId,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      setShipmentDetails(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const loader = (
    <div className="loader-container">
      <CustomLoader />
    </div>
  );

  return (
    <>
      {loading ? (
        loader
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="container" style={containerStyle}>
          <TextField
            type="text"
            placeholder="Enter Shipment ID"
            style={inputStyle}
            onChange={(e) => setShipmentId(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <ArrowForward />
                </IconButton>
              ),
            }}
          />
          <TableContainer component={Paper} style={{
            width: "500px",
            marginTop: "20px",
          }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Shipment ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{shipmentDetails.shipmentId}</TableCell>
                  <TableCell>{shipmentDetails.status}</TableCell>
                  <TableCell>{shipmentDetails.origin}</TableCell>
                  <TableCell>{shipmentDetails.destination}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Shipment;
