import React from "react";
import "./Table.css";

export const Table = ({ data, column, loading }) => {
  if (loading) return <h1>Loading...</h1>;

  return (
    <table className="table table-striped">
      <thead>
        <tr id="headRow">
          {column.map((item, index) => (
            <th key={item.heading}>{item.heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <RowElement
            key={`row ${index}`}
            item={item}
            rowIndex={index}
            column={column}
          />
        ))}
      </tbody>
    </table>
  );
};

const RowElement = ({ item, rowIndex, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      return (
        <td key={`${columnItem.value} ${rowIndex}`}>
          {item[columnItem.value]}
        </td>
      );
    })}
  </tr>
);
