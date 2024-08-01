document.addEventListener("DOMContentLoaded", () => {
    const querySplited = document.location.search.slice(1).split("=")
    let indexKeyId = querySplited.findIndex(key => key == "id")

    let id = 0
    if(indexKeyId >= 0)
    {
        id = parseInt(querySplited[indexKeyId + 1])
    }

    // 1. Pobrać dane ucznia na podstawie id, jeśli to id jest większe od 0
    // jeśli id jest równe 0 to nie robimy nic
    // 2. Wyświetlany imię i nazwisko w tabeli

    if(id > 0)
    {
        fetchStudentData(id)
        fetchStudentGrades(id)
        fetchStudentComments(id)
        initAddCommentForm(id)
    }
})

function fetchStudentData(id) {
    fetch("http://localhost:3000/api/users/one/" + id)
    .then(res=>{
        if(res.ok)
        {
            return res.json()
        }
        else
        {
            alert("Error")
        }    
    })
    .then(data=> {
        if(!data) {
            return
        }

        // 1. Pobieramy do zmiennych inputy oraz button
        // 2. ustawiamy value inputów na odpowiednie wartości tj. na imię i na nazwisko
        // 3. Dodajemy zdarzenie "click" do buttona

        // const tdName = document.getElementById("tdName")
        // tdName.innerText = data.user.name

        // const tdSurname = document.getElementById("tdSurname")
        // tdSurname.innerText = data.user.surname

        const inputName = document.getElementById("inputName")
        const inputSurname = document.getElementById("inputSurname")
        const btnSaveStudentData = document.getElementById("btnSaveStudentData")

        inputName.value = data.user.name
        inputSurname.value = data.user.surname

        btnSaveStudentData.addEventListener("click", (e) => {
            const name = inputName.value
            const surname = inputSurname.value

            const data = {
                name,
                surname
            }

            fetch("http://localhost:3000/api/users/" +id, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res=>{
                if(res.ok)
                {
                    alert("Dane zostały zaktualizowane")
                }
                else
                {
                    alert("Wystąpił błąd podczas aktualizacji")
                }
            })
        })
    })
}



function fetchStudentGrades(id)
{
    const tbodyOceny = document.getElementById("tbodyOceny")

    //1. Pobrać informacje o przedmiotach
    //2. Zrobić pętlę po pobranych przedmiotach
    //3. W pętli z punktu 2 pobierać dla każego przedmiotu oceny ucznia z tego przedmiotu
    //4. Tworzyć wiersz <tr> i dodać do niego 2 <td>
    // - 1 <td> z nazwą przedmiotu
    // - 2 <td> z ocenami rodzielonymi średnikiem

    fetch("http://localhost:3000/api/courses/all")
    .then(res => {
        if(res.ok)
        {
            return res.json()
        }
        else
        {
            alert("Error")
        }    
    })
    .then(async (data) => {
        if(!data){
            return
        }

        console.log(data)

        const divOceny = document.getElementById("divOceny")
        for(let course of data.courses)
        {
            // 1. Tworzymy w kodzie tabelę, wraz z thead, tbody oraz zawartością thead
            // 2. Dodajemy utworzoną tabelę do div'a o id="divOceny"
            // 3. Tworzymy wiersze tbody na podstawie pobranych danych dotyczących ocen

            const table = document.createElement("table")
            table.className = "datatable"
            const thead = document.createElement("thead")
            table.appendChild(thead)

            // 2.1 Tworzymy th
            // 2.2. Ustawiamy inner text th na course.name
            // 2.3 Ustawiamy colspan na 3
            // 2.4 Dodajemy th do thead

            const th = document.createElement("th")
            th.innerText = course.name
            th.colSpan = 3
            thead.appendChild(th)


            const tbody = document.createElement("tbody")
            table.appendChild(tbody)

            divOceny.appendChild(table)

            const query = "?studentId=" + id + "&courseId=" + course.id
            const resGrades = await fetch("http://localhost:3000/api/grades/query" + query)

            if(resGrades.ok)
            {
                const dataGrades = await resGrades.json()
                console.log(dataGrades)

                for(const grade of dataGrades.grades)
                {
                    const tr = document.createElement("tr")
                    tbody.appendChild(tr)

                    const tdOpis = document.createElement("td")
                    tr.appendChild(tdOpis)
                    tdOpis.innerText = grade.description

                    const tdOcena = document.createElement("td")
                    tr.appendChild(tdOcena)
                    tdOcena.innerText = grade.value

                    const tdBtnDelete = document.createElement("td")
                    tr.appendChild(tdBtnDelete)

                    const btn = document.createElement("button")
                    btn.innerText = "Usuń"
                    tdBtnDelete.appendChild(btn)
                }

            }
        }    
    })
}

function fetchStudentComments(id)
{
    const tbodyUwagi = document.getElementById("tbodyUwagi")
    tbodyUwagi.innerHTML = ""

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

            for(let comment of data.comments)
            {
                const tr = document.createElement("tr")
                tbodyUwagi.appendChild(tr)

                const tdTitle = document.createElement("td")
                tr.appendChild(tdTitle)
                tdTitle.innerText = comment.title

                const tdText = document.createElement("td")
                tr.appendChild(tdText)
                tdText.innerText = comment.text 

                const tdBtnDelete = document.createElement("td")
                tr.appendChild(tdBtnDelete)

                const button = document.createElement("button")
                button.innerText = "Usuń"
                tdBtnDelete.appendChild(button)

                button.addEventListener("click", (e) => {

                    fetch("http://localhost:3000/api/comments/" + comment.id, {
                        method:"DELETE"
                    })
                    .then(res=>{
                        if(res.ok)
                        {
                            alert("usunięty")
                            fetchStudentComments(id)
                        }
                        else
                        {
                            alert("error")
                        }    
                    })
                    
                })
            }
        }) 
}

function initAddCommentForm(id) {
    const inputAddTitle = document.getElementById("addTitle")
    const inputAddText = document.getElementById("addText")
    const btnAdd = document.getElementById("btnAdd")
    const formUwagi = document.getElementById("formUwagi")


    formUwagi.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = inputAddTitle.value;
        const text = inputAddText.value;
        const button = btnAdd.value;

        const data = {
            title,
            text,
            userId: id
        }

        fetch("http://localhost:3000/api/comments", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res=>{
            if(res.ok)
            {
                inputAddTitle.value = ""
                inputAddText.value = ""
                fetchStudentComments(id)
            }
            else
            {
                alert("Wystąpił błąd podczas dodawania uwagi")
            }
        })
    })

   


}