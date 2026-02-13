import Node from "./Node";

export default function Canvas({ workflow }) {
  return (
    <div className="h-[80vh] overflow-y-auto ">
      <Node node={workflow} />
    </div>
  );
}



