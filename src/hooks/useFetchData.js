import React, { useState, useEffect } from "react";
import axios from "axios";
import { timeConverter } from "../utils/timeConverter";

function useFetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInfo = () => {
      setLoading(true);
      axios
        .get(
          "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"
        )
        .then((response) => {
          const rawData = response.data["Data"]["Data"];
          const newData = rawData
            .sort((a, b) => (a.time < b.time ? 1 : -1))
            .map((item) => {
              const oldTime = item["time"];
              const newTime = timeConverter(oldTime);
              return { ...item, time: newTime };
            });
          setData(newData);
        })
        .catch((e) => {
          setError(true);
        })
        .finally(setLoading(false));
    };

    fetchInfo();
  }, []);

  return { data, loading, error };
}

export default useFetchData;
