document.addEventListener("DOMContentLoaded", () => {
    const querySplited = document.location.search.slice(1).split("=")
    let indexKeyId = querySplited.findIndex(key => key == "id")

    let id = 0
    if(indexKeyId >= 0)
    {
        id = parseInt(querySplited[indexKeyId + 1])
    }

    // Formularz do dodawania nowych ocen
    // 1. Tworzymy w html formularz zawierający 2 inputy
    // - przemiot (<select>)
    // - ocena (<input/> typu number)
    // 2. Dodajemy przycisk "Dodaj"
    // 3. Po kliknięciu przycisku ocena ma zostać dodana


    if(id > 0)
    {
        fetchStudentData(id)
        fetchStudentGrades(id)
        fetchStudentComments(id)
        initAddCommentForm(id)
        initAddGradeForm(id)
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
    const divOceny = document.getElementById("divOceny")
    divOceny.innerHTML = ""

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

        // console.log(data)
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
                // console.log(dataGrades)

                if(dataGrades.grades.length == 0) {
                    const tr = document.createElement("tr")
                    tbody.appendChild(tr)

                    const tdOpis = document.createElement("td")
                    tdOpis.colSpan = 3
                    tr.appendChild(tdOpis)
                    tdOpis.innerText = "Brak ocen"
                }
                else
                {

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
                        btn.className = "btn-main"
                        tdBtnDelete.appendChild(btn)
    
                        btn.addEventListener("click", (e) => {
    
                            fetch("http://localhost:3000/api/grades/" + grade.id, {
                                method:"DELETE"
                            })
                            .then(res=>{
                                if(res.ok)
                                {
                                    alert("usunięty")
                                    fetchStudentGrades(id)
                                    
                                }
                                else
                                {
                                    alert("error")
                                }    
                            })
                            
                        })

                        const tdEdit = document.createElement("td")
                        tr.appendChild(tdEdit)
                        
                        const edit = document.createElement("button")
                        edit.innerText = "Edytuj"
                        edit.className = "btn-main"
                        tdEdit.appendChild(edit)

                        edit.addEventListener("click", (e) => {
                            edit.style.display = "none"

                            // Edycja ocen
                            tdOcena.innerHTML = ""
                            const selectOcena = document.createElement("select")
                            tdOcena.appendChild(selectOcena)

                            const oceny = [1, 2, 2.5, 3, 3.5, 4, 4.5, 5]
                            for(let i = 0; i < oceny.length; i++)
                            {
                                const ocena = oceny[i]

                                const optionOcena = document.createElement("option")
                                optionOcena.value = ocena
                                optionOcena.innerText = ocena
                                selectOcena.appendChild(optionOcena)
                            }

                            selectOcena.value = grade.value

                            // Edycja opisu
                            tdOpis.innerHTML = ""

                            const textareaOpis = document.createElement("textarea")
                            textareaOpis.value = grade.description
                            tdOpis.appendChild(textareaOpis)


                            
                            // Pokazanie przycisków zapisz i anuluj
                            const btnZapisz = document.createElement("button")
                            btnZapisz.innerText = "Zapisz"
                            btnZapisz.className = "btn-main"
                            tdEdit.appendChild(btnZapisz)

                            btnZapisz.addEventListener("click", () => {

                                const value = selectOcena.value
                                const description = textareaOpis.value

                                const data = {
                                    value,
                                    description
                                }

                                // 1. Pobrać wartości z selectOcena i textareaOpis
                                // 2. fetch aktualizujący dane na serwerze
                                // 3. Ustawić dla odpowiednich td nowe wartości co spowoduje, że zniknie select i textarea a pojawią się konkretne wartości

                                fetch("http://localhost:3000/api/grades/" + grade.id, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                })
                                .then(res=>{
                                    if(res.ok)
                                    {
                                        alert("Zapisano")

                                        tdOcena.innerHTML = value
                                        tdOpis.innerText = description

                                        grade.value = value
                                        grade.description = description

                                        edit.style.display = ""
                                        btnZapisz.remove()
                                        btnAnuluj.remove()
                                    }
                                    else
                                    {
                                        alert("Błąd")
                                    }
                                })

                            })

                            const btnAnuluj = document.createElement("button")
                            btnAnuluj.innerText = "Anuluj"
                            btnAnuluj.className = "btn-main"
                            tdEdit.appendChild(btnAnuluj)

                            btnAnuluj.addEventListener("click", () => {
                                tdOpis.innerText = grade.description
                                tdOcena.innerHTML = grade.value

                                edit.style.display = ""
                                btnZapisz.remove()
                                btnAnuluj.remove()
                            })
                        })

                    }
                }
            }
        }    
    })
}

function initAddGradeForm(id) {

        // Tworzenie opcji dla select
        // 1. Poberamy z serwera przedmioty
        // 2. W pętli tworzym <option>
        // - ustawiamy innerText na nazwę przedmiout
        // - ustawiamy value na id przedmiotu
        // 3. dodajmy utworzone <option> do <select>

        const selectSubject = document.getElementById("selectSubject")

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
        .then(data => {
            if(!data)
            {
                return
            }

            console.log(data.courses)

            for(let course of data.courses)
            {
                const option = document.createElement("option")
                selectSubject.appendChild(option)
                option.innerText= course.name
                option.value = course.id
            }
        })

    const formGrade = document.getElementById("formGrade")
    const inputGrade = document.getElementById("inputGrade")
    const buttonDodaj = document.getElementById("buttonDodaj")
    const text = document.getElementById("text")

    formGrade.addEventListener("submit", (e) => {
        e.preventDefault();

        const courseId = selectSubject.value;
        const value = inputGrade.value;
        const description = text.value;

        const data = {
            courseId,
            value,
            description,
            userId: id
        }

        fetch("http://localhost:3000/api/grades", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }, 
            body: JSON.stringify(data)
        })
        .then(res=>{
            if(res.ok)
            {
                selectSubject.value=""
                inputGrade.value=""
                text.value=""
                fetchStudentGrades(id)
            }
            else
            {
                alert("Error")
            }
        })

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
                button.className = "btn-main"
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

                const tdEdit = document.createElement("td")
                tr.appendChild(tdEdit)

                const edit = document.createElement("button")
                edit.innerText = "Edytuj"
                edit.className = "btn-main"
                tdEdit.appendChild(edit)

                edit.addEventListener("click", (e) => {
                    edit.style.display = "none"

                    // Edycja tytułu
                    tdTitle.innerHTML = ""

                    const inputTitle = document.createElement("input")
                    inputTitle.value = comment.title
                    tdTitle.appendChild(inputTitle)

                    // Edycja treści
                    tdText.innerHTML = ""
                    const textarea = document.createElement("textarea")
                    textarea.value = comment.text
                    tdText.appendChild(textarea)

                    // 1. Dodać przycisk Zapisz i Anuluj
                    // 2. Zaprogramować click dla "Zapisz"
                    // 3. Zaprogramować click dla "Anuluj"
                    // 4. Po zapisaniu zaktualizować dane w tabeli
                    // tak samo jak zrobiliśmy przy aktualizacji ocen

                    const btnZapisz = document.createElement("button")
                    btnZapisz.innerText = "Zapisz"
                    btnZapisz.className = "btn-main"
                    tdEdit.appendChild(btnZapisz)

                    btnZapisz.addEventListener("click", () => {

                        const title = inputTitle.value
                        const text = textarea.value

                        const data = {
                            title,
                            text
                        }

                        fetch("http://localhost:3000/api/comments/" + comment.id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })
                        .then(res=>{
                            if(res.ok)
                            {
                                alert("Zapisano")

                                tdTitle.innerText = title
                                tdText.innerText = text

                                comment.title = title
                                comment.text = text

                                edit.style.display = ""
                                btnZapisz.remove()
                                btnAnuluj.remove()
                            }
                            else
                            {
                                alert("Błąd")
                            }
                        })

                    })

                    const btnAnuluj = document.createElement("button")
                    btnAnuluj.innerText = "Anuluj"
                    btnAnuluj.className = "btn-main"
                    tdEdit.appendChild(btnAnuluj)

                    btnAnuluj.addEventListener("click", () => {
                        tdTitle.innerText = comment.title
                        tdText.innerText = comment.text

                        edit.style.display = ""
                        btnZapisz.remove()
                        btnAnuluj.remove()
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