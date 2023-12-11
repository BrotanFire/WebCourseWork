const adressserver = 'http://127.0.0.1:8000'
const dateoptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

async function ShowTasks() {
    let TaskPanel = document.getElementById('TaskPanelStart')
    TaskPanel.innerHTML = ''
    let Response = await fetch(adressserver + '/api/usertasks/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'cookie': document.cookie
        },
        mode: 'same-origin'
    })
    let TaskData = await Response.json()
    console.log(TaskData)
    for (let i in TaskData) {
        let TaskBlock = '<div class="col">\n' +
            '                    <div class="card shadow-sm h-100">\n' +
            '                        <div class="card-body">\n' +
            '                            <p class="card-title">№ ' + String(TaskData[i].task.task_id) + ' ' + String(TaskData[i].task.task_name) + '</p>\n' +
            '                            <p class="card-text">' + String(TaskData[i].task.task_description) + '</p>\n' +
            '                            <div class="d-flex justify-content-between align-items-center">\n' +
            '                            </div>\n' +
            '                            </div>\n' +
            '                              <div class="card-footer h">\n' +
            '                              <div class="">\n' +
            '                                <div class="btn-group">\n' +
            '                                    <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="ShowMoreAboutTask(' + String(TaskData[i].task.task_id) + ',' + String(TaskData[i].users_tasks_id) + ')">View</button>\n' +
            '                                </div>\n' +
            '                                <small class="text-body-secondary">' + (new Date(TaskData[i].task.task_start_date).toLocaleString("ru", dateoptions)) + '</small>\n' +
            '                           </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>'
        TaskPanel.innerHTML += TaskBlock
    }
}


async function ShowMoreAboutTask(TaskId, UserTaskId) {
    let SubTaskPanel = document.getElementById('subtasks')
    let Response = await fetch(adressserver + '/api/usersubtasks/' + TaskId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'cookie': document.cookie
        },
        mode: 'same-origin'
    })

    SubTaskPanel.innerHTML = ''
    let SubTaskData = await Response.json()
    console.log(SubTaskData)
    for (let i in SubTaskData) {
        if (SubTaskData[i].subtask_completing_date == null) {
            let TaskBlock = '<li class="list-group-item"><h5>' + SubTaskData[i].subtask_name + '</h5> ' + SubTaskData[i].subtask_description + '</li>'
            SubTaskPanel.innerHTML += TaskBlock
        } else {
            let TaskBlock = '<li class="list-group-item"><h5>' + SubTaskData[i].subtask_name + '</h5> ' + SubTaskData[i].subtask_description + '   <small class="text-body-secondary">   ' + (new Date(SubTaskData[i].subtask_completing_date).toLocaleString("ru", dateoptions)) + '</small></li>'
            SubTaskPanel.innerHTML += TaskBlock
        }

    }
    let SubTaskAddBtn = '<button class="bi-plus btn btn-outline-secondary"  type="button" onclick=""></button>'
    SubTaskPanel.innerHTML += SubTaskAddBtn
    let footer = document.getElementById('footermodal')
    footer.innerHTML = ''
    footer.innerHTML = '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="LeaveTask(' + String(UserTaskId) + ')">Покинуть задачу</button>' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>'
}

async function LeaveTask(TaskId) {
    if (confirm("Вы хотите покинуть задачу?")) {
        let Response = await fetch(adressserver + '/api/leavetask/' + TaskId, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                'cookie': document.cookie
            },
            mode: 'same-origin'
        })
        ShowTasks()
    } else {

    }
}
