document.addEventListener("DOMContentLoaded", async () => {
    // Weryfikacja czy użytkownik próbujący przejść na daną stronę jest zalogowany
    // To czy jest zalgoowany sprawdzamy patrząc czy są dane w localstorage
    if(!localStorage.getItem("userData"))
    {
        window.location = "/"
        return
    }

    const btnLogOut = document.getElementById("btnLogOut")
    const studentName = document.getElementById("studentName")

    btnLogOut.addEventListener("click", (e) => 
    {
        localStorage.removeItem("userData")
        window.location = "/"
    })


    // 1. Pobrać z localstorage dane użytkownika
    // 2. Sparsować dane użytkownika do obiektu
    // 3. Wyświetlić dane użytkownika w elemencie "studentName"

    const jsonUserData = localStorage.getItem("userData")
    const userData = JSON.parse(jsonUserData)
    console.log(userData)

    studentName.innerText = userData.user.name + " " + userData.user.surname
})