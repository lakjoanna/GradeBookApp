document.addEventListener("DOMContentLoaded", async () => {
    // Weryfikacja czy użytkownik próbujący przejść na daną stronę jest zalogowany
    // To czy jest zalgoowany sprawdzamy patrząc czy są dane w localstorage
    if(!localStorage.getItem("userData"))
    {
        window.location = "/"
        return
    }


    const btnLogOut = document.getElementById("btnLogOut")

    btnLogOut.addEventListener("click", (e) => 
    {
        localStorage.removeItem("userData")
        window.location = "/"
    })
})