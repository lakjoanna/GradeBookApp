document.addEventListener("DOMContentLoaded", () =>{

    fetchDataAndCreateTable()
})

function fetchDataAndCreateTable(){
    const studentsBody = document.getElementById("studentsBody")
    studentsBody.innerHTML = ""
    
    fetch("http://localhost:3000/api/users/students")
        .then(res => {
            if(res.ok) {
                return res.json()
            }
            else
            {
                alert("Wystąpił błąd podczas pobierania danych uczniów!")
            }
        })
        .then(data => {
            if(!data) {
                return
            }

            console.log(data)
            
            for(let user of data.users)
            {
                const tr = document.createElement("tr")
                studentsBody.appendChild(tr)

                const tdId = document.createElement("td")
                tr.appendChild(tdId)
                tdId.innerText = user.id

                const tdLogin = document.createElement("td")
                tr.appendChild(tdLogin)
                tdLogin.innerText = user.login

                const tdName = document.createElement("td")
                tr.appendChild(tdName)
                tdName.innerText = user.name

                const tdSurname = document.createElement("td")
                tr.appendChild(tdSurname)
                tdSurname.innerText = user.surname

                // Dodajemy w dodatkowym td przycisk do usuwania
                // Po kliknięciu przycisku dany uczeń ma zostać usunięty w bazie danych
                // oraz ma zniknąć od razu z tabelki

                const tdButton = document.createElement("td")
                tr.appendChild(tdButton)

                const btn = document.createElement("button")
                btn.innerText = "Usuń"
                btn.className = "btn-main"
                tdButton.appendChild(btn)

                btn.addEventListener("click", (e) => {
                    fetch("http://localhost:3000/api/users/" + user.id, {
                        method:"DELETE"
                    })
                    .then(res=>{
                        if(res.ok)
                        {
                            alert("usunięto")
                            fetchDataAndCreateTable()
                        }
                        else
                        {
                            alert("Error")
                        }    
                    })
                })

                const tdBtnDetails = document.createElement("td")
                tr.appendChild(tdBtnDetails)

                const btnDetails = document.createElement("button")
                btnDetails.innerText = "Szczegóły"
                btnDetails.className = "btn-main"
                tdBtnDetails.appendChild(btnDetails)

                btnDetails.addEventListener("click", (e) => {
                    window.location = "/teacher/students/details?id=" + user.id
                })
            }
        })
}