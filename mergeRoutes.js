/**
 * Merge given routes into one single routing object.
 *
 * @date 06/05/2022
 * @input array of routes to be merged.
 * @output merged routes object.
 */

const routes = [
  "products",
  "products/station",
  "products/station/with-mini",
  "products/mini",
  "products/mini/wifi",
  "products/mini/wifi/with-flex",
  "products/mini/lte",
  "products/mini/lte/with-flex",
  "integrations/",
  "integrations/partners",
  "careers/",
  "features/payments",
];

// solution - parse all the routes and fill the content along the way.
const mergeRoutes = (routes) => {
  const finalRoute = {};
  for (let route of routes) {
    const paths = route.split("/").filter((path) => path.length !== 0);
    let current = finalRoute;
    for (let path of paths) {
      if (current[path] === undefined) {
        current[path] = {};
      }
      current = current[path];
    }
  }
  return finalRoute;
};

console.log(mergeRoutes(routes));
