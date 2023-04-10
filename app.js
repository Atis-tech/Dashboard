function dijkstra(graph, source) {
  let distances = [];
  let visited = [];
  let length = graph.length;

  for (let i = 0; i < length; i++) {
    distances[i] = Infinity;
    visited[i] = false;
  }

  distances[source] = 0;

  for (let i = 0; i < length - 1; i++) {
    let u = getMinDistance(distances, visited);
    visited[u] = true;

    for (let v = 0; v < length; v++) {
      if (
        !visited[v] &&
        graph[u][v] != 0 &&
        distances[u] != Infinity &&
        distances[u] + graph[u][v] < distances[v]
      ) {
        distances[v] = distances[u] + graph[u][v];
      }
    }
  }

  return distances;
}

function getMinDistance(distances, visited) {
  let minDistance = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!visited[i] && distances[i] <= minDistance) {
      minDistance = distances[i];
      minIndex = i;
    }
  }

  return minIndex;
}

// Example usage:
let graph = [
  [0, 2, 4, 0, 0],
  [2, 0, 1, 4, 0],
  [4, 1, 0, 3, 5],
  [0, 4, 3, 0, 1],
  [0, 0, 5, 1, 0],
];

let sourceNode = 0;

console.log(dijkstra(graph, sourceNode)); // outputs [0, 2, 3, 6, 7]
