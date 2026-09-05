// Quiz level metadata, carried over from the original *-levels.js files.
// `track` matches the keys in data/quizzes.json and the /quiz/:track/:level route.

export const LEVEL_TRACKS = {
  html: {
    title: "HTML Quiz",
    levels: [
      { name: "Easy", image: "/images/html-easy.png" },
      { name: "Medium", image: "/images/html-medium.png" },
      { name: "Hard", image: "/images/html-hard.png" },
    ],
  },
  css: {
    title: "CSS Quiz",
    levels: [
      { name: "Easy", image: "/images/css-easy.png" },
      { name: "Medium", image: "/images/css-medium.png" },
      { name: "Hard", image: "/images/css-hard.png" },
    ],
  },
  js: {
    title: "JavaScript Quiz",
    levels: [
      { name: "Easy", image: "/images/js-easy.png" },
      { name: "Medium", image: "/images/js-medium.png" },
      { name: "Hard", image: "/images/js-hard.png" },
    ],
  },
  dsa: {
    title: "DSA Quiz",
    levels: [
      { name: "Arrays Mastery", image: "/images/arrays.png" },
      { name: "String Manipulation", image: "/images/strings.png" },
      { name: "Linked List Logic", image: "/images/linkedlist.png" },
      { name: "Stacks & Queues", image: "/images/stack.png" },
      { name: "Sorting Techniques", image: "/images/sorting.png" },
      { name: "Search Strategies", image: "/images/searching.png" },
      { name: "Tree Traversals", image: "/images/trees.png" },
      { name: "Graph Explorers", image: "/images/graphs.png" },
      { name: "Hashing Hacks", image: "/images/hashmap.png" },
      { name: "Recursive Thinking", image: "/images/recursion.png" },
      { name: "Dynamic Programming", image: "/images/dynamic-programming.png" },
      { name: "Greedy Algorithms", image: "/images/greedy-algo.png" },
    ],
  },
};

export function readProgress(track) {
  const stars = JSON.parse(localStorage.getItem("stars") || "{}");
  const unlockedLevel = parseInt(localStorage.getItem("unlockedLevel"), 10) || 1;
  const coins = parseInt(localStorage.getItem("coins"), 10) || 0;

  const levels = LEVEL_TRACKS[track].levels.map((level, index) => {
    const id = index + 1;
    return {
      ...level,
      id,
      unlocked: id <= unlockedLevel,
      stars: stars[id] || 0,
    };
  });

  return { coins, levels };
}

export function resetProgress(track) {
  localStorage.removeItem("stars");
  localStorage.setItem("unlockedLevel", "1");
  localStorage.setItem("coins", "0");
  return readProgress(track);
}
