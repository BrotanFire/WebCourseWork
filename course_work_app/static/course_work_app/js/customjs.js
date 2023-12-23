const adressserver = 'http:///127.0.0.1:8000'

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


async function ShowMoreAboutTask(TaskId, UsersTaskId) {
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
    for (let i in SubTaskData) {
        if (SubTaskData[i].subtask_completing_date == null) {
            let TaskBlock = '<li class="list-group-item"><h5>' + SubTaskData[i].subtask_name + '</h5> ' + SubTaskData[i].subtask_description + '</li>'
            SubTaskPanel.innerHTML += TaskBlock
        } else {
            let TaskBlock = '<li class="list-group-item"><h5>' + SubTaskData[i].subtask_name + '</h5> ' + SubTaskData[i].subtask_description + '   <small class="text-body-secondary">   ' + (new Date(SubTaskData[i].subtask_completing_date).toLocaleString("ru", dateoptions)) + '</small></li>'
            SubTaskPanel.innerHTML += TaskBlock
        }

    }
    let SubTaskAddBtn = '<button class="bi-plus btn btn-outline-secondary" id="AddSubTaskBtn" type="button" onclick="AddSubTask(' + String(TaskId) + ',' + String(UsersTaskId) + ')"></button>'
    SubTaskPanel.innerHTML += SubTaskAddBtn
    let footer = document.getElementById('footermodal')
    footer.innerHTML = ''
    footer.innerHTML = '<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="LeaveTask(' + String(UsersTaskId) + ')">Покинуть задачу</button>' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>'
}

async function LeaveTask(TaskId) {
    if (confirm("Вы хотите покинуть задачу?")) {
        let Response = await fetch(adressserver + '/api/leavetask/' + TaskId, {
            method: 'delete',
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Content-Type": "application/json",
                'cookie': document.cookie
            },
            mode: 'same-origin'
        })
        ShowTasks()
    } else {

    }
}

async function AddSubTask(TaskId, UsersTaskId) {
    let btn = document.getElementById('AddSubTaskBtn')
    btn.remove()
    let SubTaskPanel = document.getElementById('subtasks')
    let addpanel = '<li class="list-group-item"> \n' +
        '<form action="" method="POST" enctype="multipart/form-data" onsubmit="return false" class="form-horizontal">\n' +
        '    <fieldset>\n' +
        '        <input type="hidden" name="csrfmiddlewaretoken"\n' +
        '               value="' + getCookie("csrftoken") + '">\n' +
        '        <div class="form-group ">\n' +
        '            <label class="col-sm-6 control-label ">\n' +
        '                Имя подзадачи\n' +
        '            </label>\n' +
        '            <div class="col-sm-12">\n' +
        '                <input name="subtask_name" id="subtask_name" class="form-control" type="text" value="" required>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group ">\n' +
        '            <label class="col-sm-6 control-label ">\n' +
        '                Описание\n' +
        '            </label>\n' +
        '            <div class="col-sm-12">\n' +
        '                <input name="subtask_description" id="subtask_description" class="form-control" type="text" value="" required>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group ">\n' +
        '            <label class="col-sm-6 control-label ">\n' +
        '                Дата выполнения\n' +
        '            </label>\n' +
        '            <div class="col-sm-12">\n' +
        '                <input name="subtask_completing_date" id="subtask_completing_date" class="form-control" type="datetime-local" value="" required>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <label class="col-sm-6 control-label ">\n' +
        '                \n' +
        '            </label>\n' +
        '            <div class="col-sm-12">\n' +
        '                <input type="hidden" class="form-control"  value="' + String(TaskId) + '" name="task">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '      <hr>  \n' +
        '        <div class="form-actions">\n' +
        '            <button class="btn btn-primary js-tooltip" onclick="SendSubTask(' + TaskId + ', ' + UsersTaskId + ')" title=""\n' +
        '                    data-original-title="Make a POST request on the Create Sub Tasks resource">Добавить\n' +
        '            </button>\n' +
        '        </div>\n' +
        '    </fieldset>\n' +
        '</form>\n' +
        '</li>'
    SubTaskPanel.innerHTML += addpanel
}

async function SendSubTask(TaskId, UsersTaskId) {
    let Response = await fetch(adressserver + '/api/createsubtask/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'cookie': document.cookie,
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: JSON.stringify(
            {
                "sign_readiness": null,
                "subtask_name": document.getElementById('subtask_name').value,
                "subtask_description": document.getElementById('subtask_description').value,
                "subtask_completing_date": document.getElementById('subtask_completing_date').value,
                "task": TaskId
            }
        ),
        mode: 'same-origin'
    })
    let ResponseData = await Response.json()
     await ShowMoreAboutTask(TaskId, UsersTaskId)
}