import axios from "axios";
import { useEffect, useState } from "react";

export const useDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  const colors = [
    "#4e79a7",
    "#f28e2b",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc949",
    "#af7aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/dashboard");

      setStats(response.data);
    };
    fetchData();
  }, []);

  return {
    stats,
    colors,
  };
};
