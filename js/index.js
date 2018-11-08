$(document).ready(function(){
  $('.sidenav').sidenav();
//------------Login page-----------//
  $('#login').on( 'click', function(){
    var fname = $('#user_name').val();
    var fpass = $('#password').val();
    login(fname,fpass);
  });
  $(document).keypress( function (e) {
    var key = e.which;
    if (key == 13) {
      var fname = $('#user_name').val();
      var fpass = $('#password').val();
      login(fname,fpass);
      return false;
    }
  })
//------------Home Page-----------//
  $('#user-identification').text(function () {
    return $(this).text().replace("###username###", sessionStorage.username);
  });
  $('#logOut').on( 'click' , function () {
    if (confirm ("¿Deseas salir del sistema?")){
      logOut();
    }
  });
  $('#logOut-mobile').on( 'click' , function () {
    if (confirm ("¿Deseas salir del sistema?")){
      logOut();
    }
  })
  $('.datepicker').datepicker();
  $('.timepicker').timepicker({
        default: 'now',
        twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
        donetext: 'OK',
        format: "HH:ii:SS",
        autoclose: false,
        vibrate: true
    });
});
//-----------------Funciones-----------------//
//-------Iniciar sesión--------//
function login(username,password){
  $.ajax({
    url : "php/login.php",
    method : "POST",
    data : {
      fname: username,
      fpass: password
    },
    success: function (php_response){
      answer = JSON.parse(php_response);
      if (answer != null){
        if(answer.acceso == "OK"){
          window.sessionStorage.username = answer.name;
          resetForm();
          document.location.href = "./Home/";
        }else {
          alert ("Error de credenciales");
          resetForm();
        }

      }else {
        alert ("Error de credenciales");
        resetForm();
      }
    }
  })
};
//-------Reiniciar formulario--------//
function resetForm(){
  $('#user_name').val("");
  $('#password').val("");
}
//-------Cerrar sesión--------//
function logOut(){
  document.location.href = "../";
  sessionStorage.clear();

}
