/**
 * basic-synth - 0.1.0
 *
 * A basic declarative synthesizer
 *
 * http://www.emanuel-kluge.de/
 *
 * @element basic-synth
 *
 * Copyright (c) 2014 Emanuel Kluge;
 * Licensed MIT
 */


(function (window, xtag) {


var URL = window.URL || window.webkitURL
var workerFn = "onmessage = function (evnt) {" +
  "var bytes = 'RIFF_oO_WAVEfmt ' + atob('EAAAAAEAAQBAHwAAQB8AAAEACAA') + 'data'," +
      "len = evnt.data.length ? parseInt(evnt.data.length, 10) : 3e5," +
      "t = 0," +
      "tmp;" +
  "for ( ; t < len; t += 1 ) {" +
    "bytes += String.fromCharCode(eval(evnt.data.wav + '&255'));" +
  "}" +
  "postMessage(btoa(bytes));" +
"}";

xtag.register('basic-synth', {

  extends: 'audio',

  lifecycle: {
    created: function () {
      this.compile();
    },
    removed: function () {
      this.src = null;
      this._wav = null;
    },
    attributeChanged: function (attr) {
      /^(wav|length)$/.test(attr) && this.compile();
    }
  },

  accessors: {
    wav: {
      get: function () {
        return this.getAttribute('wav');
      },
      set: function (str) {
        this.setAttribute('wav', (str || ''));
      },
      attribute: {
        name: 'wav'
      }
    },
    length: {
      get: function () {
        return this.getAttribute('length');
      },
      set: function (str) {
        this.setAttribute('length', (str || ''));
      },
      attribute: {
        name: 'length'
      }
    }
  },

  methods: {
    compile: function () {

      var blob = new Blob([workerFn], {type: 'text/javascript'}),
          url = URL.createObjectURL(blob),
          worker = new Worker(url);

      URL.revokeObjectURL(url);

      worker.addEventListener('message', function (evnt) {
        this.src = 'data:audio/wav;base64,' + evnt.data;
      }.bind(this), false);

      worker.addEventListener('error', console.log.bind(console), false);

      worker.postMessage({
        length: this.length,
        wav: this.wav
      });

    }
  }

});


})(window, xtag);