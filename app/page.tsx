"use client";

import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";

const baseNodeStyle = {
  padding: 16,
  borderRadius: 16,
  background: "#111827",
  color: "#E5E7EB",
  border: "1px solid #374151",
  width: 200,
  textAlign: "center" as const,
  fontWeight: 500,
};

const nodes: Node[] = [
  {
    id: "core",
    position: { x: 400, y: 250 },
    data: { label: "Nabeel Ahmed\nSystems Engineer" },
    style: {
      ...baseNodeStyle,
      background: "#0F172A",
      border: "2px solid #4B5563",
      fontWeight: 600,
    },
  },
  {
    id: "ai",
    position: { x: 150, y: 50 },
    data: { label: "AI Systems" },
    style: baseNodeStyle,
  },
  {
    id: "hardware",
    position: { x: 650, y: 50 },
    data: { label: "Hardware Systems" },
    style: baseNodeStyle,
  },
  {
    id: "web",
    position: { x: 150, y: 450 },
    data: { label: "Web Systems" },
    style: baseNodeStyle,
  },
  {
    id: "crypto",
    position: { x: 650, y: 450 },
    data: { label: "Cryptography" },
    style: baseNodeStyle,
  },
];

const edges: Edge[] = [
  {
    id: "e1",
    source: "core",
    target: "ai",
    type: "smoothstep",
    style: { stroke: "#6B7280", strokeWidth: 1.5 },
  },
  {
    id: "e2",
    source: "core",
    target: "hardware",
    type: "smoothstep",
    style: { stroke: "#6B7280", strokeWidth: 1.5 },
  },
  {
    id: "e3",
    source: "core",
    target: "web",
    type: "smoothstep",
    style: { stroke: "#6B7280", strokeWidth: 1.5 },
  },
  {
    id: "e4",
    source: "core",
    target: "crypto",
    type: "smoothstep",
    style: { stroke: "#6B7280", strokeWidth: 1.5 },
  },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-screen h-screen bg-[#0B0F14]"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
      >
        <Background
          color="#1F2937"
          gap={40}
          size={1}
        />
      </ReactFlow>
    </motion.div>
  );
}
