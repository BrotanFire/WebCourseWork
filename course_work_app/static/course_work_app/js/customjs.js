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
            '                              <div class="card-footer">\n' +
            '                                <div class="btn-group">\n' +
            '                                    <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="">View</button>\n' +
            '                                    <button type="button" class="btn btn-sm btn-outline-secondary" onclick="">Edit</button>\n' +
            '                                </div>\n' +
            '                                <small class="text-body-secondary">' + (new Date(TaskData[i].task.task_start_date).toLocaleString("ru", dateoptions)) + '</small>\n' +
            '                            </div>\n' +
            '                           </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>'
        TaskPanel.innerHTML += TaskBlock
    }
}


