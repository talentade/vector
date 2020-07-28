import $, { jquery } from 'jquery';
var input = document.querySelector("#phone");
window.intlTelInput(input, {
  utilsScript: "node_modules/intl-tel-input/build/js/utils.js?20",
});
// analytics
$('.selected-flag').one('click', function () {
  ga('send', 'event', 'demo', 'clicked selected country');
});
$('#phone').one('keyup', function () {
  ga('send', 'event', 'demo', 'typed something in input');
});
$('#donate').on('click', function () {
  ga('send', 'event', 'demo', 'clicked donate');
  window.open("https://www.paypal.me/jackoconnor/1usd");
});
