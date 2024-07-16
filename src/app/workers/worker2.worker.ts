/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  let factorial = 1;
  for (let i = 1; i <= 30; i++) {
    await setTimeout(() => {
      console.log("Esperando..",i)
    }, 1000);
    factorial *= i;
  }
  postMessage(factorial);
});
