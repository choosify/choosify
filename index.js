export default function Choosify(siteID, options) {
  // Note: using factory function instead of class, see e.g. https://www.freecodecamp.org/news/class-vs-factory-function-exploring-the-way-forward-73258b6a8d15/
  if (!siteID) {
    throw new Error('No Choosify site ID specified.');
  }

  const domain = 'https://plugin.choosify.chat';

  // Create the iframe element
  const iframe = document.createElement('iframe');

  // Use a random value in the iframe query string for cache busting, to be sure the latest version is loaded
  let queryString = `_=${Math.random()}`;

  // onWindowMessage listens to messages emitted from the plugin iframe
  function onWindowMessage(e) {
    let message;
    // Make sure the origin of the data is correct
    if (e.origin.indexOf(domain) === 0) {
      try {
        message = JSON.parse(e.data);

        // Continue only if the message has a kind='choosify_emit' attribute
        if (message.kind !== 'choosify_emit') {
          return;
        }

        if (message.type === 'resize') {
          iframe.style.setProperty('width', message.payload.width, 'important');
          iframe.style.setProperty(
            'height',
            message.payload.height,
            'important'
          );
        }
      } catch (_) {
        // Nothing to do
      }
    }
  }

  // dispatch posts a message to the plugin iframe
  function dispatch(type, payload) {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        kind: 'choosify_dispatch',
        type,
        payload,
      }),
      '*'
    );
  }

  // onWindowResize posts a message to the iframe when the parent window is resized
  function onWindowResize() {
    dispatch('resize', { width: window.innerWidth });
  }

  // destroy completely removes the Choosify plugin from the page
  function destroy() {
    // Remove the iframe
    document.body.removeChild(iframe);

    // Remove event listeners from the window
    window.removeEventListener('message', onWindowMessage);
    window.removeEventListener('resize', onWindowResize);
  }

  // Append the passed options to the iframe query string
  if (options && typeof options === 'object') {
    queryString += `&${Object.keys(options)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`
      )
      .join('&')}`;
  }

  // Add the parent width and location to the query string (at the end, since the query string might be truncated when longer than 2048 characters)
  queryString += `&parentWidth=${
    window.innerWidth
  }&location=${encodeURIComponent(window.location.href)}`;

  // Set the iframe attributes and add it to the body
  iframe.src = `${domain}/s/${siteID}?${queryString}`;
  iframe.style.cssText =
    'display: block !important; position: fixed !important; width: 100px !important; height: 100px !important; top: auto !important; left: auto !important; bottom: 0 !important; right: 0 !important; z-index: 2147483647 !important; max-height: none !important; max-width: 100% !important; transition: all 0s ease 0s !important; background: none !important; border: none !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; touch-action: auto !important;';

  document.body.appendChild(iframe);

  // Add event listeners to the window
  window.addEventListener('message', onWindowMessage);
  window.addEventListener('resize', onWindowResize);

  // Return the Choosify object
  return Object.freeze({
    destroy,
  });
}
