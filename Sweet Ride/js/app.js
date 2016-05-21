$(document).ready(function(){

   // Begin
   $('#begin').click(function(){
      $(this).slideDown().fadeOut("fast");

      // Fade in Character Selection
      $('#select-character').slideUp().fadeIn();
   });

});
