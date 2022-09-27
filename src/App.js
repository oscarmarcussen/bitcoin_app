import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Table } from "./components/Table";
import { timeConverter } from "./utils/timeConverter";
import { PageSelector } from "./components/PageSelector";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(20);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      axios
        .get(
          "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"
        )
        .then((response) => {
          const rawData = response.data["Data"]["Data"];
          const newData = rawData.map((item) => {
            const oldTime = item["time"];
            const newTime = timeConverter(oldTime);
            return { ...item, time: newTime };
          });
          setData(newData);
        })
        .catch((error) => console.log(error))
        .finally(setLoading(false));
    };

    fetchInfo();
  }, []);

  const column = [
    { heading: "Date", value: "time" },
    { heading: "High ($)", value: "high" },
    { heading: "Low ($)", value: "low" },
    { heading: "Open ($)", value: "open" },
    { heading: "Volume from", value: "volumefrom" },
    { heading: "Volume to", value: "volumeto" },
    { heading: "Close ($)", value: "close" },
  ];

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App container">
      <h1>Daily Bitcoin</h1>
      <Table data={currentEntries} column={column} loading={loading} />
      <PageSelector
        entriesPerPage={entriesPerPage}
        totalEntries={data.length}
        changePage={changePage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
