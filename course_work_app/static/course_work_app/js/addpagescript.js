const adressserver = 'http:///127.0.0.1:8000'

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function SetTime() {
    let start = document.getElementById('task_start_date').value
    let end = document.getElementById('task_end_date').value
    let today = new Date()
    let nextdate = today.getDate() + 5
    start.value = today
    end.value = nextdate

}

async function SendFormTask() {
    let Response = await fetch(adressserver + '/api/createtask/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'cookie': document.cookie,
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify(
            {
                "task_name": document.getElementById('task_name').value,
                "task_description": document.getElementById('task_description').value,
                "task_start_date": document.getElementById('task_start_date').value,
                "task_end_date": document.getElementById('task_end_date').value,
                "task_completing_date": null
            }
        ),
        mode: 'same-origin'
    })
    let ResponseData = await Response.json()
    console.log(ResponseData)
    let Response2 = await fetch('http://127.0.0.1:8000/api/users/')
    let Users = await Response2.json()
    console.log(Users)
    let UsersList = document.getElementById('UserList')
    UsersList.innerHTML = ''
    for (let i in Users) {
        let CheckUser = '<div class="form-check">\n' +
            '            <input type="checkbox" class="form-check-input" id="' + Users[i].id + '">\n' +
            '            <label class="form-check-label" for="save-info">' + Users[i].username + '</label>\n' +
            '          </div>'
        UsersList.innerHTML += CheckUser
    }
    let Modal = new bootstrap.Modal(document.getElementById('exampleModal'))
    Modal.show()
    let btn = document.getElementById('SaveUsers')
    btn.addEventListener("click", function (event) {
        AppointTask( Users, ResponseData)
    })

}

const form1 = document.getElementById("form1");

function handleForm(event) {
    event.preventDefault();
}

form1.addEventListener('submit', handleForm);


async function AppointTask(Users, ResponseData) {
    for (let i in Users)
    {
        let checkpoint = document.getElementById(String(Users[i].id))
        if (checkpoint.checked == true) {
            let Response = await fetch(adressserver + '/api/appoint-task/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'cookie': document.cookie,
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: JSON.stringify(
                    {
                        "user_id": Users[i].id,
                        "task": ResponseData.task_id
                    }
                ),
                mode: 'same-origin'
            })
            console.log(Users[i].username)
        }

    }


}