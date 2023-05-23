// Se fichier permet la connexion

const loginURI = "http://localhost:5678/api/users/login";
const form = document.querySelector(".form-primary");
let alreadyMsgError = false;

function getUserLog() {
    let email = form["email"].value;
    let password = form["password"].value;

    return {email, password}

}

function showErrorMsg() {
    let errorMsg = "Erreur dans l'identifiant ou le mot de passe";
    let p = document.createElement("p");

    if (!alreadyMsgError) {
        document.getElementById('error-msg-log')
            .appendChild(p).classList.add("error-msg");
        p.innerHTML = errorMsg;
        alreadyMsgError = true;
    }
}

function login(user){
    fetch(loginURI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            // Affiche le message d'erreur
            showErrorMsg();
            return null;
        })
        .then(function (value) {
            if (value) {
                sessionStorage.setItem("token", value.token);
                location.href = "index.html";
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let user = getUserLog();
    login(user)
}); 