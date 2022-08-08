$(document).ready(function(){
    $('#task-result').hide();
    listTasks();
    let edit = false;
    //Buscar 
    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {search},
                success: function(response){

                    let task = JSON.parse(response);
                    let template = '';
                    task.forEach(element => {

                        template += `<li>
                        ${element.name}
                        </li>`;
                    });

                    $('#container').html(template);
                    $('#task-result').show();
                }
            });
        }
        
    });


    //Agregar una tarea
    $('#task-form').submit(function(e) {
        const postData = {
            name: $('#nombre').val(),
            description: $('#descripcion').val(),
            id: $('#taskId').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';
        $.post(url, postData, function(response){
            console.log(response);
            listTasks();
            $('#task-form').trigger('reset');
        });

        e.preventDefault(); // Sirve para cancelar el comportamiento por defecto (que no se refresque la pagina)
        
    
    });


    function listTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task =>{
                    template += `<tr taskId="${task.id}">
                        <td>${task.id}</td>
                        <td><a href="#" class="task-item">${task.name}</a></td>
                        <td>${task.description}</td>
                        <td><button class="task-delete btn btn-danger btn-sm">Delete</button></td>
                    </tr>`;
                });
    
                $('#tasks').html(template);
            } 
        });
    }
    //DELETE
    $(document).on('click', '.task-delete', function(){
        if(confirm('Are you sure you want to delete it?')){
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId');
            $.post('task-delete.php', {id}, function(response){
                listTasks();
            });
        }
    });


    //EDIT
    $(document).on('click', '.task-item', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php', {id}, function(response){
            const task = JSON.parse(response);
            $('#nombre').val(task.name);
            $('#descripcion').val(task.description);
            $('#taskId').val(task.id);
            edit = true;
        });
    });
});