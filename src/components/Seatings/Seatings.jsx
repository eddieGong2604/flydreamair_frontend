import { Row } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import SeatingOption from "./SeatingOption";

const Seatings = (props) => {
  const [seatings, setSeatings] = useState([]);
  const getSeatings = async () => {
    Axios.get(
      `/api/seating/flightId=${props.match.params.flightId}`
    ).then((res) => setSeatings(res.data));
  };

  useEffect(() => {
    getSeatings();
  }, []);
  return (
    <>
      <h1>Choose your Seating</h1>
      <Row justify="space-around">
        {seatings.map((seating) => (
          <SeatingOption seating={seating} />
        ))}
      </Row>
    </>
  );
};

export default Seatings;