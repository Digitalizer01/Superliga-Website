firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;

    if(user != null){

      logout()
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function InsertData() {
  var dato = document.getElementById("set_data_field").value;
  set(ref(db, "TheStudents/" + dato), {
    NameOfStd: "Hola"
  })
      .then(() => {
        alert("data store succesfully!")
      })
      .catch((error) => {
        alert("unsuccessful, error" + error);
      });
}

// ------------- SELECT DATA FUNCTION ------------- //

function SelectData() {
  const dbref = ref(db);

  get(child(dbref, "TheStudents/" + rollbox.value)).then((snapshot) => {
    if (snapshot.exists()) {
      namebox.value = snapshot.val().NameOfStd;
      secbox.value = snapshot.val().Section;
      genbox.value = snapshot.val().Gender;
    } else {
      alert("No data found");
    }
  })
      .catch((error) => {
        alert("Unseccessful, error" + error)
      })
}

// ------------- UPDATE DATA FUNCTION ------------- //

function UpdateData() {
  update(ref(db, "TheStudents/" + rollbox.value), {
    NameOfStd: namebox.value,
    RollNo: rollbox.value,
    Section: secbox.value,
    Gender: genbox.value
  })
      .then(() => {
        alert("data updated succesfully!")
      })
      .catch((error) => {
        alert("unsuccessful, error" + error);
      });
}

// ------------- REMOVE DATA FUNCTION ------------- //

function RemoveData() {
  remove(ref(db, "TheStudents/" + rollbox.value))
      .then(() => {
        alert("data removed successfully");
      })
      .catch((error) => {
        alert("unsuccessfully, error" + error);
      });
}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

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


function register(){

  var userEmail = document.getElementById("email_register_field").value;
  var userPass = document.getElementById("password_register_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
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
  window.alert("Gracias por crear su cuenta. Inicie sesión para disfrutar de la página.");
  window.location("Noticias.html")
}

function logout(){
  firebase.auth().signOut();
  eliminarCookie("user_mail");
  eliminarCookie("user_pass");
}
