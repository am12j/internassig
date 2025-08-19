import React from "react";
import { DataTable, Column } from "./datatable";

type User = {
  id: number;
  name: string;
  age: number;
};

export default function App() {
  const users: User[] = [
    { id: 1, name: "Alice", age: 24 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
  ];

  const columns: Column<User>[] = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  return (
    <div>
      <h2>Users Table</h2>
      <DataTable<User>
        data={users}
        columns={columns}
        loading={false}
        selectable={true}
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
}
