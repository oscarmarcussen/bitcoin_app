import { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { PageSelector } from "./components/PageSelector";
import useFetchData from "./hooks/useFetchData";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(20);

  const { data, loading, error } = useFetchData();

  const column = [
    { heading: "Date", value: "time" },
    { heading: "High ($)", value: "high" },
    { heading: "Low ($)", value: "low" },
    { heading: "Open ($)", value: "open" },
    { heading: "Volume from", value: "volumefrom" },
    { heading: "Volume to", value: "volumeto" },
    { heading: "Close ($)", value: "close" },
  ];

  /*currencyConverter = (sum) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sum)*/

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  if (error) return <h1>Something went wrong...</h1>;

  return (
    <div className="App container">
      <h1>Daily Bitcoin</h1>
      <Table data={currentEntries} column={column} loading={loading} />
      <PageSelector
        entriesPerPage={entriesPerPage}
        totalEntries={data.length}
        changePage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
