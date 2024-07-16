/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let count = 0;
  for (let i = 0; i < data; i++) {
    count += i;
  }
  postMessage(count);
});
