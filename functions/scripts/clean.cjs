// Remove stale build output so archived endpoints cannot remain in packaging.
require('node:fs').rmSync(require('node:path').resolve(__dirname, '../lib'), { recursive: true, force: true });
