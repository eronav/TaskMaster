var accounts = {};

var isLoggedIn = false;
var accountEmail = "";
var accountPass = "";

window.onload = () => {
  // load accounts from local storage
  accountEmail = localStorage.getItem("accountEmail");
  console.log(accountEmail);
  if (accountEmail == null) {
    accountEmail = "";
  }
  accountPass = localStorage.getItem("accountPass");
  console.log(accountPass);
  if (accountPass == null) {
    accountPass = "";
  }
  accounts = JSON.parse(localStorage.getItem("accounts"));
  // accounts = null;
  if (accounts == null) {
    accounts = {};
  }
  // saveAccounts();
  console.log(accounts);

  if (accountEmail != "" && accountPass != "") {
    document.getElementById("show-login").style.opacity = "0";
    document.getElementById("show-login").style.pointerEvents = "none";
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
		document.getElementById("signout-btn").style.opacity = "0";
  }
}

document.onclick = function(e) {
  e = e || window.event;
  var element = e.target || e.srcElement;

  if (element.tagName == 'A') {
    if (isLoggedIn) {
      return true;
    }
    showLogin();
    return false; // prevent default action and stop event propagation
  }
};

function addNewUser() {
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  if (email == "" && password == "") {
		// console.log("soidjf");
    document.getElementById("signup-error-message").style.opacity = "1";
    document.getElementById("signup-password").innerHTML = '';
    return;
  }

  accounts[email] = password;
  isLoggedIn = true;
  accountEmail = email;
  accountPass = password;
  saveAccounts();

  document.getElementById("show-login").style.opacity = "0";
  document.getElementById("show-login").style.pointerEvents = "none";
	document.getElementById("signout-btn").style.opacity = "1";

  signupCloseClicked();
  loginCloseClicked();
}

function login() {
  // let emailView = document.getElementById("login-email");
  // console.log(emailView);
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  console.log(email);
  console.log(password);
  if (accounts[email] == password) {
    // login successful
    isLoggedIn = true;
    accountEmail = email;
    accountPass = password;

    saveAccounts();

    document.getElementById("show-login").style.opacity = "0";
    document.getElementById("show-login").style.pointerEvents = "none";
		document.getElementById("signout-btn").style.opacity = "1";

    signupCloseClicked();
    loginCloseClicked();
  } else {
    // login failed
    //alert("Incorrect email or password");
    document.getElementById("login-error-message").style.opacity = "1";
    document.getElementById("login-password").innerHTML = '';
  }
}

// function signOut() {
// 	localStorage.setItem("accountEmail", "");
// 	localStorage.setItem("accountPass", "");
// 	window.location.href = "/";
// 	isLoggedIn = false;
// }

function menuButtonClick(pageToGo) {
  window.location.href = pageToGo;
}

function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("accountEmail", accountEmail);
  localStorage.setItem("accountPass", accountPass);
}

function showSignUp() {
  console.log("show sign up");
  loginCloseClicked();
  document.getElementById("signup-error-message").style.opacity = 0;
  document.getElementById("signup-popup").classList.add("active");
}
function showLogin() {
  document
  console.log("show log in");
  signupCloseClicked();
  document.getElementById("login-error-message").style.opacity = 0;
  document.getElementById("login-popup").classList.add("active");
}
function signupCloseClicked() {
  console.log("close clicked");
  document.getElementById("signup-popup").classList.remove("active");
}
function loginCloseClicked() {
  console.log("close clicked");
  document.getElementById("login-popup").classList.remove("active");
}


