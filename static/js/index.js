document.addEventListener("DOMContentLoaded", () => {
    // Jeśli ktoś jest zalogowany i próbuje wejść na stronę logowania
    // to przekirowywujemy go do panelu użytkownika
    if(localStorage.getItem("userData"))
    {
        window.location = "/userpanel"
        return
    }


    const inputLogin = document.getElementById("inputLogin")
    const inputPassword = document.getElementById("inputPassword")
    const loginForm = document.getElementById("loginForm")

    loginForm.addEventListener("submit", (e) =>{
        e.preventDefault();

        const login = inputLogin.value;
        const password = inputPassword.value;

        const data = {
            login,
            password
        }

        fetch("http://localhost:3000/api/auth/signin", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>{
            return res.json()
        })
        .then(data => {
            if(!data)
            {
                return
            }

            if(!data.success)
            {
                alert(data.message)
                return
            }

            // Jeśli kod doszedł do tego momentu wykonania to
            // proces logowania i weryfikacji danych na serwerze przebiegł poprawnie
            const json = JSON.stringify({ user: data.user })
            localStorage.setItem("userData", json)

            window.location = "/userpanel"
        })
    })
})