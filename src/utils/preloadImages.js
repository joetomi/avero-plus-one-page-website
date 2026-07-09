const preloadedUrls = new Set();

/**
 * Preloads a list of image URLs.
 * @param {string[]} urls - URLs of images to preload.
 * @param {object} options - Options: concurrency (number), immediate (boolean)
 */
export function preloadImages(urls, options = {}) {
  if (typeof window === "undefined" || !urls || !Array.isArray(urls)) return;
  const { concurrency = 2, immediate = false } = options;

  // Filter unique and non-preloaded URLs
  const uniqueUrls = urls.filter(url => url && !preloadedUrls.has(url));
  if (uniqueUrls.length === 0) return;

  const runPreload = () => {
    let index = 0;
    let activeCount = 0;

    const loadNext = () => {
      if (index >= uniqueUrls.length) return;

      while (activeCount < concurrency && index < uniqueUrls.length) {
        const url = uniqueUrls[index++];
        preloadedUrls.add(url);
        activeCount++;

        const img = new Image();
        const done = () => {
          activeCount--;
          loadNext();
        };
        img.onload = done;
        img.onerror = done;
        img.src = url;
      }
    };

    loadNext();
  };

  if (immediate) {
    runPreload();
  } else {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => runPreload());
    } else {
      setTimeout(runPreload, 200);
    }
  }
}
