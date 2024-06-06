document.addEventListener("DOMContentLoaded", () => {

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
            if(res.ok)
            {
                alert("Zalogowano")
                return res.json()
            }
            else
            {
                alert("Error")
            }
        })
        .then(data => {
            if(!data)
            {
                return
            }

            const json = JSON.stringify(data)
            localStorage.setItem("userData", json)
        })
    })
})