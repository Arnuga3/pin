import React from "react";
import { ConfigProvider } from "./ConfigContext";
import PinGenerator from "./components/PinGenerator";

export default function App() {
  return (
    <ConfigProvider>
      <PinGenerator />
    </ConfigProvider>
  );
}
