const { location: { host, pathname } } = window;
const isFE = /^fe/.test(host);
const isProjectPath = new RegExp(projectPath).test(pathname);
let localDev = pathname.match(/^\/[a-zA-Z]+[0-9]{2,5}/);
if (localDev) localDev = localDev[0];

export default {
  transformBefore(router) {
    const ip = /(\d{1,3}\.){3}\d{1,3}/;
    if (ip.test(host)) {
      delete router.base;
      return router;
    }
    if (router.mode === 'history') {
      if (isProjectPath && localDev) {
        // mode: /xxx8000/project-path
        router.base = `${localDev}${projectPath}`;
      } else if (isFE && localDev) {
        // mode: xxx8000
        router.base = localDev;
      }
    }
    return router;
  },
};
