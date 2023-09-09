import { useState, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

import TextUpdaterNode from "./textUpdaterNode";

const groupNodes = [
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: 200, y: 200 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "child node 1" },
    position: { x: 10, y: 10 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "child node 2" },
    position: { x: 10, y: 90 },
    parentNode: "A",
    extent: "parent",
  },
  {
    id: "B",
    type: "output",
    data: null,
    position: { x: 100, y: 400 },
    style: {
      width: 170,
      height: 140,
      backgroundColor: "rgba(0,191,255,0.1)",
    },
  },
  {
    id: "B-1",
    data: { label: "B-1" },
    position: { x: 10, y: 10 },
    parentNode: "B",
    extent: "parent",
    draggable: false,
  },
  {
    id: "B-2",
    data: { label: "B-2" },
    position: { x: 10, y: 80 },
    style: {
      width: 60,
    },
    parentNode: "B",
    extent: "parent",
    draggable: false,
  },
  {
    id: "B-3",
    data: { label: "B-3" },
    position: { x: 100, y: 80 },
    style: {
      width: 60,
    },
    parentNode: "B",
    extent: "parent",
    draggable: false,
  },
  {
    id: "C",
    data: { label: "Node C" },
    position: { x: 300, y: 400 },
  },
];

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
  {
    id: "3",
    type: "textUpdater",
    position: { x: 100, y: 0 },
    data: { value: 123 },
  },
  {
    id: "4",
    type: "textUpdater",
    position: { x: 100, y: 0 },
    data: { value: 456 },
  },
  ...groupNodes,
];

const initialEdges = [
  {
    id: "3a-4",
    source: "3",
    sourceHandle: "a",
    target: "4",
    lable: "to the",
    animated: false,
  },
  {
    id: "a2-b",
    source: "A-2",
    target: "B",
  },
  {
    id: "b1-b3",
    source: "B-1",
    target: "B-3",
  },
  {
    id: "b1-b2",
    source: "B-1",
    target: "B-2",
  },
];

const nodeTypes = { textUpdater: TextUpdaterNode };

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    console.log(changes);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    console.log(params);
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
