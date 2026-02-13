import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  workflow: {
    id: "start",
    type: "start",
    label: "Start",
    children: [],
  },
};

// 🔍 DFS search
function findNodeById(node, id) {
  if (node.id === id) return node;

  for (let child of node.children) {
    const found = findNodeById(child, id);
    if (found) return found;
  }

  return null;
}

function findParentNode(node, childId) {
  for (let child of node.children) {
    if (child.id === childId) return node;

    const found = findParentNode(child, childId);
    if (found) return found;
  }
  return null;
}

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { parentId, nodeType, branch } = action.payload;

      const parentNode = findNodeById(state.workflow, parentId);
      if (!parentNode) return;

      // ❌ End ke baad kuch nahi
      if (parentNode.type === "end") return;

      // ❌ Action ke baad sirf ek child
      if (parentNode.type === "action" && parentNode.children.length > 0)
        return;

      // ❌ Branch node me sirf 2 children (True & False)
      if (parentNode.type === "branch" && parentNode.children.length >= 2)
        return;

      // ❌ Branch-context me Condition allow nahi
      if (parentNode.isBranchChild && nodeType === "branch") return;

      const newNode = {
        id: nanoid(),
        type: nodeType,
        label:
          nodeType === "action"
            ? "New Action"
            : nodeType === "branch"
            ? "New Condition"
            : "End",
        children: [],
      };

      // ⭐ True / False ke liye
      if (branch) {
        newNode.branch = branch;
        newNode.isBranchChild = true;
      }

      // ⭐ Branch-context propagate karo (IMPORTANT FIX 🔥)
      if (parentNode.isBranchChild) {
        newNode.isBranchChild = true;
      }

      parentNode.children.push(newNode);
    },

    deleteNode: (state, action) => {
      const { nodeId } = action.payload;

      // ❌ Start node delete nahi
      if (nodeId === "start") return;

      const parentNode = findParentNode(state.workflow, nodeId);
      if (!parentNode) return;

      const index = parentNode.children.findIndex(
        (child) => child.id === nodeId
      );

      if (index === -1) return;

      const nodeToDelete = parentNode.children[index];

      // 🔁 Auto reconnect
      if (nodeToDelete.children.length > 0) {
        parentNode.children.splice(index, 1, ...nodeToDelete.children);
      } else {
        parentNode.children.splice(index, 1);
      }
    },
    // updateLabel: (state, action) => {

    // },
  },
});

export const { addNode, deleteNode, updateLabel } = workflowSlice.actions;
export default workflowSlice.reducer;
