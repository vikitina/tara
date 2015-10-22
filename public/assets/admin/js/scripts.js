
$(document).ready(function(){$(".alert").addClass("in").fadeOut(4500);

/* swap open/close side menu icons */
$('[data-toggle=collapse]').click(function(){
  	// toggle icon
  	$(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
});

$.each($('.pages_list dl'), function(index, value) {
    $(value).attr('data-num', index).attr('id', "div_" + index);
    $(value).css('top', index * 60);
});

$('.pages_list').css('height', 60 * $('.pages_list dl').length);

$('.up').on('click', function(ev) {
    var div = $(ev.target.parentElement);
    var cur_index = parseInt(div.attr('data-num'))
    if (cur_index == 0 || div.hasClass('main_page'))
        return;

    var prev_index = cur_index - 1;
    
    var prev_div = $("#div_" + prev_index);

    var cur_position = div.position().top;
    var prev_position = prev_div.position().top;

    div.animate({top: prev_position}, 1000, function () {
	    div.attr('data-num', prev_index).attr('id', "div_" + prev_index)
    });

    prev_div.animate({top: cur_position}, 1000, function () {
	    prev_div.attr('data-num', cur_index).attr('id', "div_" + cur_index)
    });


    var cur_id = {'id' : parseInt(div.attr('data-id'))};
    $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://' + location.hostname + '/admin/ajax/up', // the url where we want to POST
            data        :  cur_id, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
                                 
        })
            // using the done promise callback
           .done(function(data) {
                
                // log data to the console so we can see
                console.log(data.res); 

                // here we will handle errors and validation messages
            });


});

$('.down').on('click', function(ev) {
    var div = $(ev.target.parentElement);
    var cur_index = parseInt(div.attr('data-num'))
    if (cur_index == $('.pages_list dl').length-1 || div.hasClass('main_page'))
        return;

    var prev_index = cur_index + 1;
    
	var prev_div = $("#div_" + prev_index);

    var cur_position = div.position().top;
    var prev_position = prev_div.position().top;

    div.animate({top: prev_position}, 1000, function () {
	    div.attr('data-num', prev_index).attr('id', "div_" + prev_index)
    });

    prev_div.animate({top: cur_position}, 1000, function () {
	    prev_div.attr('data-num', cur_index).attr('id', "div_" + cur_index)
    });


    var cur_id = {'id' : parseInt(div.attr('data-id'))};
    $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://' + location.hostname + '/admin/ajax/down', // the url where we want to POST
            data        :  cur_id, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
                                 
        })
            // using the done promise callback
           .done(function(data) {
                
                // log data to the console so we can see
                console.log(data.res); 
                 
                // here we will handle errors and validation messages
            });

});


$('.del').on('click', function(ev) {
    var div = $(ev.target.parentElement);
    var cur_index = parseInt(div.attr('data-num'))

bootbox.confirm("Are you sure?", function(result) {
  
switch (result){
  case true: 
           var cur_id = {'id' : parseInt(div.attr('data-id'))};
           $('#calculating').addClass('process');
           $.ajax({
                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url         : 'http://' + location.hostname + '/admin/ajax/del', // the url where we want to POST
                    data        :  cur_id, // our data object
                    dataType    : 'json', // what type of data do we expect back from the server
                    encode      : true
                                 
            })
            // using the done promise callback
           .done(function(data) {
                $(div).remove();
                $('#calculating').removeClass('process');
                // log data to the console so we can see
                console.log(data.res); 
                 
                // here we will handle errors and validation messages
            });
default: return;

}

}); //bootbox
});





$('.check_msg > input').on('click', function(ev) {
    
    var cur_index = parseInt($(this).attr('data-id'));
     
    if ($(this)[0].checked){

        already_read = 1;
    }else{

        already_read = 0;
    }

    data = {'id' : cur_index, 'already_read' : already_read};

$.ajax({
                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url         : 'http://' + location.hostname + '/admin/ajax/msgread', // the url where we want to POST
                    data        :  data, // our data object
                    dataType    : 'json', // what type of data do we expect back from the server
                    encode      : true
                                 
            })
            // using the done promise callback
           .done(function(data) {
                
               $('#uread_msgs').text(data.new_count_unread_msgs);
       
            });

});



$('.system_list').on('click',function(event){
       $('#system_modal').modal('show');
       $('#system_name').text($(this).text());
       $('#system_new_value').val($(this).attr('data-content'));
       $(this).addClass('blockig_for_processing');
       $('#system_new_value').attr('data-id', $(this).attr('data-id'));


 event.preventDefault();
});


$('#system_save_new_value').on('click',function(event){

    var data={
        'id'   : parseInt($('#system_new_value').attr('data-id')),
        'data' : $('#system_new_value').val()

    }
       $.ajax({
                    type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url         : 'http://' + location.hostname + '/admin/ajax/updatesystem', // the url where we want to POST
                    data        :  data, // our data object
                    dataType    : 'json', // what type of data do we expect back from the server
                    encode      : true
                                 
            })
            // using the done promise callback
           .done(function(data) {
                
               /*
                                                   <div class="alert alert-info">
                                                           <button type="button" class="close" data-dismiss="alert">×</button>
                                                         This message will checked as read
                                                   </div>

               */
               edited_elem = $('.blockig_for_processing');
               edited_elem.attr('data-content',$('#system_new_value').val()).removeClass('blockig_for_processing');

               $('#system_modal').modal('hide');

       
            });


event.preventDefault();

});
$('#system_modal').on('hide', function(){

               edited_elem = $('.blockig_for_processing');
               edited_elem.attr('data-content',$('#system_new_value').val()).removeClass('blockig_for_processing');

});


$('#system_save_new_value').on('click',function(event){

    
});

});