export default function Choosify(siteID, options) {
  // Note: using factory function instead of class, see e.g. https://www.freecodecamp.org/news/class-vs-factory-function-exploring-the-way-forward-73258b6a8d15/
  if (!siteID) {
    throw new Error('No Choosify site ID specified.');
  }

  const domain = 'https://plugin.choosify.chat';

  // Add the iframe to the body
  const iframe = document.createElement('iframe');
  let queryString = `_=${Math.random()}`; // Add a random value to the query string for cache busting

  function onWindowMessage(e) {
    let message;
    // Make sure the origin of the data is correct
    if (e.origin.indexOf(domain) === 0) {
      try {
        message = JSON.parse(e.data);

        if (message.type === 'choosify_resize') {
          iframe.style.setProperty('width', message.width, 'important');
          iframe.style.setProperty('height', message.height, 'important');
        }
      } catch (_) {
        // Nothing to do
      }
    }
  }

  function onWindowResize() {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        type: 'window_resize',
        width: window.innerWidth,
      }),
      '*'
    );
  }

  // destroy() completely removes the Choosify plugin from the page
  function destroy() {
    // Remove the iframe
    document.body.removeChild(iframe);

    // Remove event listeners
    window.removeEventListener('message', onWindowMessage);
    window.removeEventListener('resize', onWindowResize);
  }

  // Append the options to the iframe URL
  if (options && typeof options === 'object') {
    [
      'title',
      'subtitle',
      'iconColor',
      'icon',
      'headerColor',
      'operatorName',
      'operatorIcon',
      'env', // Can be 'test'
    ].forEach((option) => {
      if (options[option]) {
        queryString += `&${option}=${encodeURIComponent(options[option])}`;
      }
    });
  }

  queryString += `&parentWidth=${window.innerWidth}`;

  iframe.src = `${domain}/${siteID}?${queryString}`;
  iframe.style.cssText =
    'display: block !important; position: fixed !important; width: 100px !important; height: 100px !important; top: auto !important; left: auto !important; bottom: 0 !important; right: 0 !important; z-index: 2147483647 !important; max-height: none !important; max-width: 100% !important; transition: all 0s ease 0s !important; background: none !important; border: none !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; touch-action: auto !important;';
  document.body.appendChild(iframe);

  // Add event listeners
  window.addEventListener('message', onWindowMessage);
  window.addEventListener('resize', onWindowResize);

  return Object.freeze({
    destroy,
  });
}
