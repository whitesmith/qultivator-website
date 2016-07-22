/**
 * Object for connecting to Qultivator as a user.
 * @constructor
 * @param {object} [options] - Additional options regarding the connection.
 * @param {string} [options.endpoint] - Qultivator user endpoint.
 */
function QultivatorUser(options) {
  options = options || {};
  this.endpoint = options.endpoint || QultivatorUser._defaultEndpoint();
  this.socket = null;
  this.onDataCallbacks = [];
}

QultivatorUser._defaultEndpoint = function () {
  return 'ws' + (window.location.protocol === 'https' ? 's' : '') + '://' + window.location.host + window.location.pathname + 'ws/user';
}

QultivatorUser.prototype._onMessage = function (msg) {
  var self = this;

  var data = JSON.parse(msg.data);
  var i;
  for (i = 0; i < this.onDataCallbacks.length; i++) {
    (function (cb) {
      setTimeout(function () {
        cb.call(self, data);
      }, 0);
    })(this.onDataCallbacks[i]);
  }
};

QultivatorUser.prototype.connect = function () {
  this.socket = new WebSocket(this.endpoint);
  this.socket.onmessage = this._onMessage.bind(this);
};

/**
 * @callback onDataFn
 * @param {object} data - An object containing multiple plant metrics.
 */

/**
 * Attach a callback function to be called when data arrives
 * @param {onDataFn} fn - The function to be called when data arrives.
 */
QultivatorUser.prototype.onData = function (fn) {
  this.onDataCallbacks.push(fn);
  return this;
};

/**
 * Sets how bright the light for a given plant should be.
 * From completely on (1) to completely off (0).
 * @param {string} plantId - The id of the plant to be brighten.
 * @param {number} value - How bright the light should be, from 0 to 1.
 */
QultivatorUser.prototype.light = function (plantId, value) {
  return this.socket.send({
    id: plantId,
    action: 'light',
    value: value
  });
}

/**
 * Sets how open the water tap for a given plant should be.
 * From completely open (1) to completely closed (0).
 * @param {string} plantId - The id of the plant to be watered.
 * @param {number} value - How open the water tap should be, from 0 to 1.
 */
QultivatorUser.prototype.water = function (plantId, value) {
  return this.socket.send({
    id: plantId,
    action: 'water',
    value: value
  });
}
