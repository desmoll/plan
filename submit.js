let log = '';


function test() {
    //  const tableEl = $("#plan_table");
    //  const tableElem = $("#WC_table");
    let plan, wc;

    let tableEl;
    let tableElem;
    let data;
    let log;
    let d;


    //sort = $('#sort').val();
    // console.log(sort)

    if ($('#v').is(':checked')) {
        $('div.hidden').removeClass('hidden').addClass('nothidden')
    }
    let scriptname = $("#module").val();
    scriptname = 'http://localhost:5000/' + scriptname;
    $.getScript(scriptname)
        .done(function(script, textStatus) {
            d = Date()
            log = log + d + '\nФункция планирования загружена успешно\n' + '\n'
            document.getElementById('log').value = log

        })
        .fail(function(jqxhr, settings, exception) {
            d = Date()
            log = log + d + '\nНе удалось загрузить функцию планирования\n' + '\n'
            document.getElementById('log').value = log
        })


    let plan_name = $('#plan').val();
    plan_name = 'http://localhost:5000/' + plan_name;
    axios
        .get(plan_name)
        .then(({ data: dataFromServer }) => {
            data = dataFromServer.param;
            tableEl = $('#plan_table')
            createTable_1(data, tableEl);
            //console.log(data)
            d = Date()
            log = log + d + '\nКонтрольный пример объемного плана загружен\n' + '\n'
            document.getElementById('log').value = log;
            plan = data
        })
        .catch(error => {
            d = Date()
            log = log + d + '\nНе удалось загрузить контрольный пример объемного плана\n' + '\n'
            document.getElementById('log').value = log
        })

    let wc_name = $('#wc_list').val();
    wc_name = 'http://localhost:5000/' + wc_name;
    console.log(wc_name)
    axios
        .get(wc_name)
        .then(({ data: dataFromServer }) => {
            data = dataFromServer.otvet;
            // console.log(data);
            //console.log(JSON.stringify(wc_list_l.responseJSON.otvet))
            d = Date()
            log = log + d + '\nКонтрольный пример ответа от РЦ загружен\n' + '\n';
            document.getElementById('log').value = log;
            tableElem = $('#WC_table')
            createTable_2(data, tableElem)
            wc = data

        })
        .catch(error => {
            d = Date()
            log = log + d + '\nНе удалось загрузить контрольный пример ответа от РЦ\n' + '\n'
            document.getElementById('log').value = log
        })
    let smp = $('#smp').val();
    smp = 'http://localhost:5000/' + smp;
    axios
        .get(smp)
        .then(({ data: dataFromServer }) => {
            data = dataFromServer.body;
            tableElem = $('#SMP_table')
            createTable_2(data, tableElem);
            //console.log(data)
            d = Date()
            log = log + d + '\nКонтрольный пример составленного расписания загружен\n' + '\n'
            document.getElementById('log').value = log;
            test_t(log)


        })
        .catch(error => {
            d = Date()
            log = log + d + '\nНе удалось загрузить контрольный пример составленного расписания\n' + '\n'
            document.getElementById('log').value = log
        })

    // document.getElementById('log').value = log + d + '\nФункция планирования прошла тест, спланированное расписание соотвествует контрольному примеру\n' + '\n';


}

function test_t(temp) {
    sort = $('#sort').val();
    if (sort === 'q') {
        d = Date()
            // log = log + d + '\nФункция планирования прошла тест, спланированное расписание соотвествует контрольному примеру\n' + '\n';
        document.getElementById('log').value = temp + d + '\nФункция планирования прошла тест, спланированное расписание соотвествует контрольному примеру\n' + '\n';
    } else if (sort === "c") {
        d = Date()
        log = log + d + '\nФункция планирования не прошла тест, спланированное расписание не соотвествует контрольному примеру\n' + '\n';
        document.getElementById('log').value = temp + d + '\nФункция планирования не прошла тест, спланированное расписание не соотвествует контрольному примеру\n' + '\n';
    } else if (sort === 't') {
        d = Date()
        log = log + d + '\nФункция планирования не прошла тест, расписание не спланировано\n' + '\n';
        document.getElementById('log').value = temp + d + '\nФункция планирования не прошла тест, расписание не было спланировано\n' + '\n';
    }
}

function createTable_1(data, tableEl) {
    tableEl.empty();
    data.forEach(
        ({
            DT,
            Q,
            T,
            D,
            P
        }) => {
            tableEl.append(`
                      <tr class="${status ? 'status-true' : ''}">
                          <td>${DT}</td>
                          <td>${Q}</td>
                          <td>${T}</td>
                          <td>${D}</td>
                          <td>${P}</td>
                      </tr>
                    `);
        })
}

function createTable_2(data, tableElem) {
    tableElem.empty();
    data.forEach(
        ({
            id,
            WC,
            PL,
            DT,
            OP,
            Q,
            T,
            D,
            P
        }) => {
            tableElem.append(`
                      <tr class="${status ? 'status-true' : ''}">
                          <td>${id}</td>
                          <td>${WC}</td>
                          <td>${PL}</td>
                          <td>${DT}</td>
                          <td>${OP}</td>
                          <td>${Q}</td>
                          <td>${T}</td>
                          <td>${D}</td>
                          <td>${P}</td>
                      </tr>
                    `);
        })
}