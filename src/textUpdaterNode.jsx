import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import './textUpdaterNode.css'

const handleStyle = { left: 10 }

// eslint-disable-next-line react/prop-types
export default function TextUpdaterNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, [])

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top}></Handle>
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" className="nodrag" onChange={onChange} type="text" value={data.value} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a"></Handle>
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle}></Handle>
    </div>
  )
}