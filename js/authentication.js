firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    //document.getElementById("user_div").style.display = "block";
    //document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if (user != null) {

      var email_id = user.email;
      var user_token = user.token;
      //document.getElementById("user_para").innerHTML = "Token user : " + user_token;
      console.log("hay usuario");
      //window.location.href = "Noticias.html";
    }

  } else {
    // No user is signed in.
    console.log("no hay usuario");

    //document.getElementById("user_div").style.display = "none";
    //document.getElementById("login_div").style.display = "block";

  }
});

function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

  crearCookie ("user_mail", userEmail);
  crearCookie ("user_pass", userPass);

  window.alert("Ha iniciado sesión. Disfrute de la página.")
}

function login_cookie() {

  var userEmail = leerCookie("user_mail");
  var userPass = leerCookie("user_pass");
  console.log("valor de userEmail: " + userEmail);
  console.log("valor de userPass: " + userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });



}

function register() {

  var userEmail = document.getElementById("email_register_field").value;
  var userPass = document.getElementById("password_register_field").value;

  console.log("register - userMail: " + userEmail);
  console.log("register - userPass: " + userPass);

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);

    // ...
  });
  eliminarCookie("user_mail");
  eliminarCookie("user_pass");
  crearCookie("user_mail", userEmail);
  crearCookie("user_pass", userPass);

}


function logout() {
  firebase.auth().signOut();
  eliminarCookie("user_mail");
  eliminarCookie("user_pass");
}



// Función para crear una Cookie en el navegador incluyendo key y valor
function crearCookie (key, value) {
  // Creamos una variable de tipo Date y establecemos la caducidad de la Cookie un día después de crearla
  expires = new Date();
  expires.setTime(expires.getTime() + 86400000); // 1 día = 86.400.000 milisegundos
  cookie = key + "=" + value + ";expires=" + expires.toLocaleString();
  console.log("crearCookie: " + cookie);
  // Sentencia que crea la Cookie
  document.cookie = cookie;
}


// Función para leer una Cookie del navegador dada una key y mostrar su valor
function leerCookie (key) {
  var name = key + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if ((c.indexOf(name)) == 0) {
      return c.substr(name.length);
    }

  }
  return null;
}


// Función para borrar una Cookie del navegador dada una key
function eliminarCookie (key) {
  console.log("eliminarCookie: " + key);
  // Sentencia que elimina la Cookie
  document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
