(function ($) {

  var snth = $('synth'),
      frm = $('formula'),
      npt = $('input');

  $('submit').addEventListener('click', function () {
    if ( npt.value ) {
      snth.wav = npt.value;
      frm.reset();
    }
  }, false);

  frm.addEventListener('submit', function (evnt) {
    evnt.preventDefault();
    return false;
  }, false);

})(document.getElementById.bind(document));