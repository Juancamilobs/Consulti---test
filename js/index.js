$(document).ready(function(){
  $('.sidenav').sidenav();

  $('#login').on( 'click', function(){
    var fname = $('#user_name').val();
    var fpass = $('#password').val();
    login(fname,fpass);
  })

});

function login(username,password){

  $.ajax({
    url : "php/login.php",
    method : "POST",
    data : {
      fname: username,
      fpass: password
    },
    success: function (php_response){
      if (php_response == '"OK"'){
        alert('ingreso existoso');
        $('#login-form').trigger("reset");
      }else{
        alert ("El usuario o contraseña ingresada no son correctos, intenta de nuevo.");
      }
    }
  });
}
