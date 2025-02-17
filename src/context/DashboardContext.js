import React, { createContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);

  return <DashboardContext.Provider value={{ sessions, setSessions }}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => React.useContext(DashboardContext);
