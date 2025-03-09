import React from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import Sidebar from '../components/Sidebar';


export default function Whiteboard() {

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Sidebar />
      <Tldraw />
    </div>
  );
}
