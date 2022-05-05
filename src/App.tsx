import React from "react";
import useGetUserIP from "./hooks/useGetUserIP";
import AppRouter from "./router/AppRouter";

function App() {
  useGetUserIP();
  return <AppRouter />;
}

export default App;
