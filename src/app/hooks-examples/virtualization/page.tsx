"use client";
import React from "react";
import { FixedSizeList as List } from "react-window";


const itemCount = 10000;
const itemHeight = 35;

const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
  <div style={style} className="border-b px-4 py-2">
    Row #{index + 1}
  </div>
);

export default function VirtualizationExample() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Virtualization Example (react-window)</h1>
      <p className="mb-4">Efficiently render large lists by only mounting visible items. This example uses <code>react-window</code> to virtualize a list of 10,000 rows.</p>
      <div style={{ height: 400, width: "100%", maxWidth: 400 }}>
        <List
          height={400}
          itemCount={itemCount}
          itemSize={itemHeight}
          width={400}
        >
          {Row}
        </List>
      </div>
    </div>
  );
} 