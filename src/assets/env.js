(function (window) {
  window['env'] = window['env'] || {};
  // This will be replaced by Docker entrypoint script
  window['env']['apiUrl'] = 'http://localhost:8989';
})(this);
