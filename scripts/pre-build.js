const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const { BUILD_ID } = process.env;

if (BUILD_ID != null) {
  const nowConfigPath = resolve('./now.json');
  const nowConfig = JSON.parse(readFileSync(nowConfigPath));
  nowConfig.routes = nowConfig.routes.map((route) => {
    if (route.src === '/sw.bundle.js') {
      return Object.assign(route, {
        dest: `_next/static/${BUILD_ID}/pages/sw.js`,
      });
    }
    return route;
  });
  writeFileSync(nowConfigPath, JSON.stringify(nowConfig, null, 2));
}
