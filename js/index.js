$(document).ready(function(){
  $('.sidenav').sidenav();

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
  $('#welcome-text').text(function () {
    return $(this).text().replace("###user###", sessionStorage.username);
  });


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
      answer = JSON.parse(php_response);
      if (answer !== null){
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
  });
}

function resetForm(){
  $('#user_name').val("");
  $('#password').val("");
}
