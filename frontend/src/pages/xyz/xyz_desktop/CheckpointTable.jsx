import React,{useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

const columns = [
  { key: "id", label: "Checkpoint ID" },
  { key: "shipping_id", label: "From Shipping" },
  { key: "total_packages", label: "Quantity" },
  { key: "arrival_datetime", label: "Arrival Datetime" },
  { key: "note", label: "Description Note" },
];
  
function CheckPointTable({ data }) {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedRows = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const [date, time] = dateTimeString.split("T");
    return `${date} ${time}`;
  };

	return (
    <div className="flex items-center flex-col">
      <Table
        aria-label="Example table with dynamic content"
        className="text-left drop-shadow-md border-collapse mb-5"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="bg-quinary text-black text-sm" style={{ textAlign: 'center' }}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedRows} style={{ textAlign: 'center', color: 'black' }}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key} className="text-base">
                  {column.key === "arrival_datetime"
                    ? formatDateTime(item[column.key])
                    : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        total={totalPages}
        onChange={handlePageChange}
        color="quinary"
        className="drop-shadow-lg"
      />
    </div>
	);
};

export default CheckPointTable;