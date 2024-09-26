document.addEventListener("DOMContentLoaded", () => {
    // 1. Pobrać form o id = formCourses do zmiennej
    // 2. Dodać event listener submit do formCourses
    // 3. Wykonać zapytanie przy pomocy fetch, które utworzy nowy kurs w bazie danych

    const formCourses = document.getElementById("formCourses")
    const inputName = document.getElementById("inputName")

    formCourses.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = {
            name: inputName.value
        }

        fetch("http://localhost:3000/api/courses",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => {
            if(res.ok)
            {
                fetchCourses()
                alert("Dodano nowy przedmiot!")
            }
            else
            {
                alert("Wystąpił błąd!")
            }
        })
    })


    // 1. Pobrać listę przedmiotów z serwera przy pomocy fetch
    // 2. Pobrać do zmiennej tbody o id = tbodyCourses
    // 3. Na podstawie listy kursów pobranej z serwera wygenerować tabelę z id i Name
    // Na ten moment bez przycisków
    fetchCourses()
})

function fetchCourses() {
    const tbodyCourses = document.getElementById("tbodyCourses")
    tbodyCourses.innerHTML = ""

    fetch("http://localhost:3000/api/courses/all")
        .then(res => {
            if(res.ok)
            {
                return res.json()
            }
            else
            {
                alert("Błąd")
            }
        })
        .then(data => {
            if(!data){
                return
            }
            console.log(data)

            for(let courses of data.courses)
            {
                const tr = document.createElement("tr")
                tbodyCourses.appendChild(tr)

                const tdId = document.createElement("td")
                tr.appendChild(tdId)
                tdId.innerText = courses.id

                const tdName = document.createElement("td")
                tr.appendChild(tdName)

                const spanName = document.createElement("span")
                spanName.innerText = courses.name
                tdName.appendChild(spanName)

                const inputName = document.createElement("input")
                tdName.appendChild(inputName)

                inputName.type = "text"
                inputName.value = courses.name
                inputName.style.display = "none"

                const tdButtonEdit = document.createElement("td")
                tr.appendChild(tdButtonEdit)

                const buttonEdit = document.createElement("button")
                buttonEdit.innerText = "Edytuj"
                buttonEdit.className = "btn-main"
                tdButtonEdit.appendChild(buttonEdit)

                // 1. Utworzyć w tym miejscu button z tekstem "Zapisz"
                // 2. Dodać ten button do tdButtonEdit
                // 3. Ustawić dla tego button style.display = "none"
                // 4. Dodać temu buttonowi click, który na ten moment będzie pusty

                const btnSave = document.createElement("button")
                btnSave.innerText = "Zapisz"
                btnSave.className = "btn-main"
                btnSave.style.display="none"
                tdButtonEdit.appendChild(btnSave)

                btnSave.addEventListener("click", (e) => {
                    // 1. Pobrać wartość z inputa inputName
                    // 2. Przy pomocy fetch wykonać zapytanie do serwera
                    // które zaktualizuje dane
                    // 3. Ukryć pola odpowiedzialne za edycję i przypisać do
                    // span nową wartość z inputa inputName

                    const id = courses.id
                    const name = inputName.value
                    const data = {
                        name
                    }

                    fetch("http://localhost:3000/api/courses/" + courses.id, {
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

                            
                            spanName.style.display = ""
                            buttonEdit.style.display = ""
                            btnDelete.style.display = ""
                            inputName.style.display = "none"
                            btnSave.style.display = "none"
                            btnCancel.style.display = "none"

                            spanName.innerText = name;
                        }
                    })
                })

                const tdBtnDelete = document.createElement("td")
                tr.appendChild(tdBtnDelete)

                const btnDelete = document.createElement("button")
                btnDelete.innerText = "Usuń"
                btnDelete.className = "btn-main"
                tdBtnDelete.appendChild(btnDelete)

                // 1. Utworzyć w tym miejscu button "Anuluj"
                // 2. Dodać ten button do tdBtnDelete
                // ...

                const btnCancel = document.createElement("button")
                btnCancel.innerText="Anuluj"
                btnCancel.className = "btn-main"
                btnCancel.style.display="none"
                tdBtnDelete.appendChild(btnCancel)

                btnCancel.addEventListener("click", (e) => {
                    spanName.style.display = ""
                    buttonEdit.style.display = ""
                    btnDelete.style.display = ""
                    inputName.style.display = "none"
                    btnSave.style.display = "none"
                    btnCancel.style.display = "none"
                })
                
                btnDelete.addEventListener("click", (e) => {
                    fetch("http://localhost:3000/api/courses/" + courses.id, {
                        method:"DELETE"
                    })
                    .then(res => {
                        if(res.ok)
                        {
                            fetchCourses()
                            alert("Usunięto")
                        }
                        else
                        {
                            alert("Błąd")
                        }
                    })
                })
                
                tdButtonEdit.addEventListener("click", (e) => {
                    spanName.style.display = "none"
                    buttonEdit.style.display = "none"
                    btnDelete.style.display = "none"
                    inputName.style.display = ""
                    btnSave.style.display = ""
                    btnCancel.style.display = ""
                })
            }
        })
}