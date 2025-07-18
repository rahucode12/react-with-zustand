"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const DynamicMUITable = dynamic(() => import("../_component/MUITable"), {
  ssr: false,
  loading: () => <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>,
});

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
];

export default function MUITableDemoPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        console.log("data ", data);
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box maxWidth={900} mx="auto" mt={6} p={2}>
      <Typography variant="h4" gutterBottom>Dynamic MUI Table Demo</Typography>
      <Typography variant="body1" gutterBottom>
        This page demonstrates dynamic import of a reusable MUI Table component and fetching data from jsonplaceholder.
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DynamicMUITable columns={columns} rows={rows} />
      )}
    </Box>
  );
} 