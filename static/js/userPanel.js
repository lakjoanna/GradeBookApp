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

    const userData = JSON.parse(jsonUserData)
    console.log(userData)

    studentName.innerText = userData.user.name + " " + userData.user.surname

    // 1. Utworzyć funkcję o nazwie "fetchSubjects"
    // 2. W funkcji tej z wykorzystaniem fetch() pobrać dane przedmiotów
    // 3. Generować na podsatwie pobranej tablicy przedmiotów kierwsze tabeli
    fetchSubjects()


    // 1. Utworzyć funkcję o nazwie "fetchComments(id)". Funkccja przyjmuje argument id
    // 2. W funkcji tej z wykorzystaniem fetch() pobrać dane uwag zalogowanego ucznia
    // 3. Pobrac do zmiennej tbody tabeli z html i zrobić pętlę po pobranych uwagach
    // 4. W pętli dla każdej uwagi tworzyć tr i dodać do tbody
    // 5. Tworzyć td z tematem uwagi, ustawić innerText i dodać do tr
    // 6. Tworzyć td z treścią uwagi, ustawić innerText i dodać do tr
    fetchComments(userData.user.id)
})

function fetchComments(id) {

    const commentsTBody = document.getElementById("commentsTBody")
    commentsTBody.innerHTML = ""

    const query = "?studentId=" + id
    fetch("http://localhost:3000/api/comments/query" + query)
        .then(res=> {
            if(res.ok)
            {
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

            console.log(data)

            for (let comment of data.comments)
            {
                const tr = document.createElement("tr")
                commentsTBody.appendChild(tr)

                const tdTitle = document.createElement("td")
                tr.appendChild(tdTitle)
                tdTitle.innerText = comment.title

                const tdText = document.createElement("td")
                tr.appendChild(tdText)
                tdText.innerText = comment.text
            }
        })

}

function fetchSubjects()
{
    fetch("http://localhost:3000/api/courses/all")
    .then(res =>{
        if(res.ok)
        {
            return res.json()
        }
        else
        {
            alert("Error")
        }    
    })
    .then(data =>{
        if(!data)
        {
            return
        }
        console.log(data)

        const coursesTBody = document.getElementById("coursesTBody")

        let lp = 1
        for (let course of data.courses)
        {
            const tr = document.createElement("tr")
            coursesTBody.appendChild(tr)

            const tdLp = document.createElement("td")
            tr.appendChild(tdLp)
            tdLp.innerText = lp

            const tdNazwa = document.createElement("td")
            tr.appendChild(tdNazwa)
            tdNazwa.innerText = course.name

            tr.addEventListener("click", () => {
                window.location = "/user/grades?courseId=" + course.id
            })

            lp++
        }
    })
}