import CloudIcon from "@mui/icons-material/Cloud";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {changeResult} from "./features/weather/weatherSlice";

import "./App.css";

function App() {
  const dispatch=useDispatch();
  const result = useSelector((state) => state.weather.result);


  const [nowTemp, setNowTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [date, setDate] = useState(null);
  const [maxWindSpeed, setMaxWindSpeed] = useState(null);
  const [minWindSpeed, setMinWindSpeed] = useState(null);
  let cancelAxios = null;
  useEffect(() => {
    axios
      .get(
        "https://my.meteoblue.com/packages/basic-day_clouds-day?apikey=FrdUAGqNuxJyIPRz&lat=30.0444&lon=31.2357&asl=17&format=json",
        { cancelToken: new axios.CancelToken((c) => (cancelAxios = c)) }
      )
      .then(function (response) {
        // handle success
        const DateNow = response.data.data_day.time[0];
        setDate(DateNow);

        const windMaxArr = response.data.data_day.windspeed_max[0];
        setMaxWindSpeed(windMaxArr);
        const windMinArr = response.data.data_day.windspeed_min[0];
        setMinWindSpeed(windMinArr);

        const tempNow = Math.round(
          Math.round(response.data.data_day.temperature_instant[0])
        );
        setNowTemp(tempNow);

        const maxArr = response.data.data_day.temperature_max;
        const tempMax = Math.round(maxArr[0]);
        setMaxTemp(tempMax);

        const minArr = response.data.data_day.temperature_min;
        const tempMin = Math.round(minArr[0]);
        setMinTemp(tempMin);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      cancelAxios();
    };
  }, []);
  useEffect(()=>{
    dispatch(changeResult());
  })
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card
          sx={{
            color: "white",
            backgroundColor: "#0c539aff",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 11px 1px rgba(0, 0, 0, 0.1)",
          }}
          dir="ltr"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
              marginLeft: "20px",
              marginRight: "20px",
            }}
            dir="ltr"
          >
            <Typography variant="h2">Cairo</Typography>
            <Typography
              variant="h5"
              sx={{ marginRight: "5px", marginLeft: "5px" }}
            >
              {date}
            </Typography>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "20px", marginLeft: "20px" }}>
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h1"
                  sx={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  {nowTemp}
                </Typography>
                <FilterDramaIcon sx={{ fontSize: 60 }} />
              </div>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "start", margin: "10px" }}
              >
                WindSpeed:{minWindSpeed} - {maxWindSpeed} km/h
              </Typography>
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  sx={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Max: {maxTemp}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  |
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ marginRight: "10px", marginLeft: "10px" }}
                >
                  Min: {minTemp}
                </Typography>
              </div>
            </div>
            <div>
              <CloudIcon sx={{ fontSize: "180px" }} />
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default App;
