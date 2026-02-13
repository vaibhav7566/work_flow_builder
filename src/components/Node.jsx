import { useDispatch } from "react-redux";
import { addNode, deleteNode } from "../features/workflowSlice";

export default function Node({ node }) {
  const dispatch = useDispatch();

  const addAction = () =>
    dispatch(addNode({ parentId: node.id, nodeType: "action" }));

  const addCondition = () =>
    dispatch(addNode({ parentId: node.id, nodeType: "branch" }));

  const addTrue = () =>
    dispatch(
      addNode({
        parentId: node.id,
        nodeType: "action",
        branch: "true",
      })
    );

  const addFalse = () =>
    dispatch(
      addNode({
        parentId: node.id,
        nodeType: "action",
        branch: "false",
      })
    );

  const addEnd = () =>
    dispatch(addNode({ parentId: node.id, nodeType: "end" }));

  const handleDelete = () => {
    dispatch(deleteNode({ nodeId: node.id }));
  };

  if (node.type === "end") {
    return (
      <div className="ml-6 mt-3">
        <div className="border-2 border-red-600 px-4 py-3 font-bold bg-gradient-to-br from-red-50 to-red-100 w-fit rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center gap-2">
          <span className="text-2xl">🛑</span>
          <span className="text-red-800">End</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-6 mt-3  ">
      <div className="border-2 border-slate-300 px-4 py-3 font-bold w-fit flex items-center gap-2 bg-white rounded-xl shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-200">
        <span className="text-slate-800">
          {node.label}
          {node.branch && (
            <span className="ml-2 px-2.5 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full border border-blue-200">
              ({node.branch})
            </span>
          )}
        </span>

        {node.type !== "start" && (
          <button
            onClick={handleDelete}
            className="text-red-500 border-none bg-transparent cursor-pointer font-bold hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg transition-all duration-150 hover:scale-110"
          >
            ❌
          </button>
        )}
      </div>

      {node.type === "action" &&
        node.children.length === 0 &&
        !node.isBranchChild && (
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={addAction}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1.5"
            >
              ➕ Action
            </button>
            <button
              onClick={addCondition}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1.5"
            >
              ➕ Condition
            </button>
            <button
              onClick={addEnd}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-1.5"
            >
              ➕ End
            </button>
          </div>
        )}

      {node.type === "action" &&
        node.children.length === 0 &&
        node.isBranchChild && (
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              onClick={addAction}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1.5"
            >
              ➕ Action
            </button>
            <button
              onClick={addEnd}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-1.5"
            >
              ➕ End
            </button>
          </div>
        )}

      {node.type === "branch" && node.children.length === 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={addTrue}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-1.5"
          >
            ➕ True
          </button>
          <button
            onClick={addFalse}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-1.5"
          >
            ➕ False
          </button>
        </div>
      )}

      {node.type === "start" && (
        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={addAction}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1.5"
          >
            ➕ Action
          </button>
          <button
            onClick={addCondition}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1.5"
          >
            ➕ Condition
          </button>
        </div>
      )}

      {node.children.map((child) => (
        <Node key={child.id} node={child} />
      ))}
    </div>
  );
}
