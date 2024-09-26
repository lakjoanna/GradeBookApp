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
    if(user.userrole.name == "Teacher")
    {
        window.location = "/teacher/main"
        return
    }


    const querySplited = document.location.search.slice(1).split("=")
    let indexKeyId = querySplited.findIndex(key => key == "courseId")

    let courseId = 0
    if(indexKeyId >= 0)
    {
        courseId = parseInt(querySplited[indexKeyId + 1])
    }


    // 1. Na podsatwie courseId i id ucznia (user.id) pobieramy oceny ucznia z serwera
    //    przy pomocy fetch
    // 2. Wyświetlamy pobrane oceny w konsoli
    CreateTableGrades(user.id, courseId)


    // 1. Pobieramy button btnCofnij do zmiennej
    // 2. Dodajemy click
    // 3. W funkcji click używając windows.location przekierowujemy użytkownika na stronę "/user/main"

    const btnCofnij = document.getElementById("btnCofnij")
    btnCofnij.addEventListener("click", (e) => {
        window.location = "/user/main"
    })

})

async function CreateTableGrades(userId, courseId)
{
    const tGrades = document.getElementById("tGrades")


    const query = "?studentId=" + userId + "&courseId=" + courseId
    const resGrades = await fetch("http://localhost:3000/api/grades/query" + query)

    if(resGrades.ok)
    {
        const dataGrades = await resGrades.json()
        console.log(dataGrades)


        for(let grade of dataGrades.grades)
        {
            const tr = document.createElement("tr")
            tGrades.appendChild(tr)

            const tdOcena = document.createElement("td")
            tr.appendChild(tdOcena)
            tdOcena.innerText = grade.value

            const tdOpis = document.createElement("td")
            tr.appendChild(tdOpis)
            tdOpis.innerText = grade.description
        }
    }
}