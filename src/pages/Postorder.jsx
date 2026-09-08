import React from "react";
import TraversalGame from "../components/TraversalGame";

// All three traversal games share one implementation — they differ only in
// which traversal order the player has to produce. The tree itself is
// generated fresh on every play.
export default function Postorder() {
  return <TraversalGame order="postorder" />;
}
