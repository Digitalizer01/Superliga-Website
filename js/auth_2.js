var hay_usuario = false;
  login_cookie();

  if(hay_usuario==true){
    console.log("la variable hay_usuario vale true");
  }
  else{
    console.log("la variable hay_usuario vale false");
  }

console.log("Vamos a entrar en donde el auth");
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("Estamos en el auth");

    var user = firebase.auth().currentUser;

    if (user != null) {

      var email_id = user.email;
      var user_token = user.token;
      //document.getElementById("user_para").innerHTML = "Token user : " + user_token;
      console.log("hay usuario");
      document.getElementById("idnuevo").innerHTML =
        "Bienvenido, " + email_id;
      document.getElementById("id_logout").innerHTML =
        "LOG OUT";
      var el = document.getElementById( 'id_iniciar_sesion' );
      el.parentNode.removeChild( el );
    }

  } else {
    // No user is signed in.
    console.log("no hay usuario");

    document.getElementById("idnuevo").innerHTML =
      "NOHAYUSUARIO";
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


  firebase.auth().createUserWithEmailAndPassword("userEmail@gmail.com", "userPass").catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  crearCookie("user_mail", userEmail);
  crearCookie("user_pass", userPass);
}


function logout() {
  firebase.auth().signOut();
  eliminarCookie("user_mail");
  eliminarCookie("user_pass");
  history.go(0);
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
      hay_usuario=true;
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
