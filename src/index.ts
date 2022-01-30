import server from "./server";

(async () => {
  const address = await server.listen(3000);
  console.log(`Listening on ${address}`);
})();
