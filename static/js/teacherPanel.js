document.addEventListener("DOMContentLoaded", async () => {
    // Weryfikacja czy użytkownik próbujący przejść na daną stronę jest zalogowany
    // To czy jest zalgoowany sprawdzamy patrząc czy są dane w localstorage
    if(!localStorage.getItem("userData"))
    {
        window.location = "/"
        return
    }

    const jsonUserData = localStorage.getItem("userData")
    const user = JSON.parse(jsonUserData).user
    if(user.userrole.name != "Teacher")
    {
        window.location = "/user/main"
        return
    }

    const btnLogOut = document.getElementById("btnLogOut")
    const teacherName = document.getElementById("teacherName")

    btnLogOut.addEventListener("click", (e) => 
    {
        localStorage.removeItem("userData")
        window.location = "/"
    })


    // 1. Pobrać z localstorage dane użytkownika
    // 2. Sparsować dane użytkownika do obiektu
    // 3. Wyświetlić dane użytkownika w elemencie "studentName"

   
    const userData = JSON.parse(jsonUserData)
    console.log(userData)

    teacherName.innerText = userData.user.name + " " + userData.user.surname
})