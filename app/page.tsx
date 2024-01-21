"use client"

import {TerminalContextProvider } from "react-terminal";
import Terminal from "./Terminal";

export default function Home() {


  return (
  <TerminalContextProvider>
    <div className="w-screen h-screen overflow-hidden">
      <Terminal />
    </div>
  </TerminalContextProvider>
  )
}
