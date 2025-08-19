import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  let sortedData = [...data];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSortConfig((prev) => {
      if (prev?.key === col.dataIndex) {
        return {
          key: col.dataIndex,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: col.dataIndex, direction: "asc" };
    });
  };

  const handleRowSelect = (row: T) => {
    const newSelected = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(newSelected);
    onRowSelect?.(newSelected);
  };

  if (loading) return <div>Loading...</div>;
  if (data.length === 0) return <div>No data available</div>;

  return (
    <table border={1} cellPadding={5} cellSpacing={0}>
      <thead>
        <tr>
          {selectable && <th>Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col)}
              style={{ cursor: col.sortable ? "pointer" : "default" }}
            >
              {col.title}{" "}
              {sortConfig?.key === col.dataIndex
                ? sortConfig.direction === "asc"
                  ? " 🔼"
                  : " 🔽"
                : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            {selectable && (
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>{String(row[col.dataIndex])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
