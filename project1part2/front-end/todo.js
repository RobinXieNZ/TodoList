$(document).ready(function(e) {
    var needToPuff;
    var taskName;
    var server = 'http://localhost:8080';  
    var taskList;

    var redraw = function(){
        for(var task in taskList){
            console.log(task);
            var json = $.parseJSON(taskList[task]);
            if(json.done === false){
                addUndoTask(json.contents);
            }else{
                addDoneTask(json.contents);
            }
        }
    }

    var addUndoTask = function(taskName){
        var taskHTML = '<li><span class="done">%</span>';
        taskHTML += '<span class="delete">x</span>';
        taskHTML += '<span class="task"></span></li>';

        var $newTask = $(taskHTML); 
        $newTask.find('.task').text(taskName);
        $newTask.hide();
        $('#todo-list').prepend($newTask);
        $newTask.show('clip',250).effect('highlight',1000);
    }

    var addDoneTask = function(taskName){
        var taskHTML = '<li><span class="done">%</span>';
        taskHTML += '<span class="delete">x</span>';
        taskHTML += '<span class="task"></span></li>';

        var $newTask = $(taskHTML); 
        $newTask.find('.task').text(taskName);
        $newTask.hide();
        $('#completed-list').prepend($newTask);
        $newTask.show('clip',250).effect('highlight',1000);
    }

    var taskDone(task){
        
    }

    $.get(server+'/', function(data) {
        taskList = JSON.parse(data);
    }).then(redraw);

    $('#add-todo').button({
        icons: { primary: "ui-icon-circle-plus" }}).click(
        function() { $('#new-todo').dialog('open');
    });

    $('#new-todo').dialog({
        modal : true, autoOpen : false, buttons : {
            "Add task" : function () {
                var taskName = $('#task').val();
                if (taskName === '') { return false; }
                var taskHTML = '<li><span class="done">%</span>';
                taskHTML += '<span class="delete">x</span>';
                taskHTML += '<span class="task"></span></li>';

                var $newTask = $(taskHTML); 
                $newTask.find('.task').text(taskName);
                $newTask.hide();
                $('#todo-list').prepend($newTask);
                $newTask.show('clip',250).effect('highlight',1000);
                $('#task').val('');
                $(this).dialog('close');
            },
            "Cancel" : function () {
                $(this).dialog('close');
            }
        }
    });

    $('#confirm-delete').dialog({
        modal : true, autoOpen : false, buttons : {
            "Yes" : function () {
                needToPuff.effect('puff',function(){
                    needToPuff.remove();
                });
                $(this).dialog('close');
            },

            "No" : function () {
                $(this).dialog('close');
            } }

    });

    $('#todo-list').on('click', '.done', function() {
        var $taskItem = $(this).parent('li'); $taskItem.slideUp(250, function() {
        var $this = $(this);
        $this.detach();
        $('#completed-list').prepend($this);
        $this.slideDown();
        });
    });

    $('.sortlist').sortable({
        connectWith : '.sortlist',
        cursor : 'pointer',
        placeholder : 'ui-state-highlight',
        cancel : '.delete.done'
    });

    $('.sortlist').on('click','.delete',function() {
        $('#confirm-delete').dialog('open');
        needToPuff = $(this).parent('li');
    });
}); // end ready