/// This function adds new inputs for particular selects

function checkInputSelects(i, method){ //inp OR out OR log
	$('#' + method + 'str' + i + '-path_entry').attr('type', 'hidden');
	$('#' + method + 'str' + i + '-path_entry').parent().css({'visibility':'hidden', 'border':'none'});
	$('#' + method + 'str' + i + '-path_entry').parent().parent().css('display', 'block');
	$('#' + method + 'str' + i + '-format_entry').parent().parent().parent().css('display', 'block');
	$('div.additional' + method + i).remove();

	$('#' + method + 'str' + i + '-type_entry').parent().parent().parent().css('margin-top', '50px');
	$('#inpstr1-type_entry').parent().parent().parent().css('margin-top', '0px');

	if($('#outstr1-type_entry').val() == 'off'){
		$('#outstr2-type_entry').parent().parent().parent().css('display', 'none');
		$('#outstr2-format_entry').parent().parent().parent().css('display', 'none');
		$('#outstr2-path_entry').parent().parent().css('display', 'none');
		$('#outstr2-type_entry').val('off');
		$('#outstr2-path_entry').val('');
	}
	else
		$('#outstr2-type_entry').parent().parent().parent().css('display', 'block');

	switch ($('#' + method + 'str' + i + '-type_entry').val()){
		case "off":
			$('#' + method + 'str' + i + '-format_entry').parent().parent().parent().css('display', 'none');
			$('#' + method + 'str' + i + '-path_entry').parent().parent().css('display', 'none');
			break;
		case "serial":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="device' + method + i + '" data-clear-btn="true" placeholder="Device" class="config_form_field"><input type="text" id="baudrate' + method + i + '" data-clear-btn="true" placeholder="baudrate" class="config_form_field"></div>').trigger("create");
			break;
		case "file":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="path' + method + i + '" data-clear-btn="true" placeholder="Path" class="config_form_field"></div>').trigger("create");
			break;
		case "tcpcli":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="address' + method + i + '" data-clear-btn="true" placeholder="Address" class="config_form_field"><input type="text" id="port' +method + i + '" data-clear-btn="true" placeholder="Port" class="config_form_field"></div>').trigger("create");
			break;
		case "tcpsvr":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="port' + method + i + '" data-clear-btn="true" placeholder="Port" class="config_form_field"></div>').trigger("create");
			break;
		case "ntripcli":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="address' + method + i + '" data-clear-btn="true" placeholder="Address" class="config_form_field"><input type="text" id="port' + method + i + '" data-clear-btn="true" placeholder="Port" class="config_form_field"><input type="text" id="mount' + method + i + '" data-clear-btn="true" placeholder="Mount Point" class="config_form_field"><input type="text" id="username' + method + i + '" data-clear-btn="true" placeholder="Username" class="config_form_field"><input type="text" id="password' + method + i + '" data-clear-btn="true" placeholder="Password" class="config_form_field"></div>').trigger("create");
			break;
		case "ntripsvr":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="address' + method + i + '" data-clear-btn="true" placeholder="Address" class="config_form_field"><input type="text" id="port' + method + i + '" data-clear-btn="true" placeholder="Port" class="config_form_field"><input type="text" id="mount' + method + i + '" data-clear-btn="true" placeholder="Mount Point" class="config_form_field"><input type="text" id="username' + method + i + '" data-clear-btn="true" placeholder="Username" class="config_form_field"><input type="text" id="password' + method + i + '" data-clear-btn="true" placeholder="Password" class="config_form_field"></div>').trigger("create");
			break;
		case "ftp":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="address' + method + i + '" data-clear-btn="true" placeholder="Address" class="config_form_field"></div>').trigger("create");
			break;
		case "http":
			$('#' + method + 'str' + i + '-path_entry').parent().parent().append('<div class="additional' + method + i + ' additional_general"><input type="text" id="address' + method + i + '" data-clear-btn="true" placeholder="Address" class="config_form_field"></div>').trigger("create");
			break;
	}

	$('#inpstr-path_entry').parent().parent().append($('#inpstr-format_entry').parent().parent().parent());
	$('#outstr-path_entry').parent().parent().append($('#outstr-format_entry').parent().parent());
}

/// This function generates correct strings from inputs for upload

function formString(i, method){
	var mode = $("input[name=radio_base_rover]:checked").val();

	var begin = (mode == 'rover') ? '' : $('#' + method + 'str' + i + '-type_entry').val() + '://';
	var end = (mode == 'rover') ? '' : '#' + $('#' + method + 'str' + i + '-format_entry').val();

	switch ($('#' + method + 'str' + i + '-type_entry').val()){
		case "off":
			break;
		case "serial":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #device' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #baudrate' + method + i).val()) + ':8:n:1:off' + end);
			break;
		case "file":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #path' + method + i).val()) + end);
			break;
		case "tcpcli":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #address' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #port' + method + i).val()) + end);
			break;
		case "tcpsvr":
			$('#' + method + 'str' + i + '-path_entry').val( begin + ':' + $.trim($('.additional' + method + i + ' #port' + method + i).val()) + end);
			break;
		case "ntripcli":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #username' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #password' + method + i).val()) + '@' + $.trim($('.additional' + method + i + ' #address' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #port' + method + i).val()) + '/' + $.trim($('.additional' + method + i + ' #mount' + method + i).val()) + end);
			break;
		case "ntripsvr":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #username' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #password' + method + i).val()) + '@' + $.trim($('.additional' + method + i + ' #address' + method + i).val()) + ':' + $.trim($('.additional' + method + i + ' #port' + method + i).val()) + '/' + $.trim($('.additional' + method + i + ' #mount' + method + i).val()) + end);
			break;
		case "ftp":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #address' + method + i).val()) + end);
			break;
		case "http":
			$('#' + method + 'str' + i + '-path_entry').val(begin + $.trim($('.additional' + method + i + ' #address' + method + i).val()) + end);
			break;
	}
}

/// This function parses default string for particular inputs

function defaultStringToInputs(i, method){

	var mode = $("input[name=radio_base_rover]:checked").val();

	if(mode == 'base'){
		var correctVal = $('#' + method + 'str' + i + '-path_entry').val().split('://');
		correctVal = correctVal[1].split('#');
		correctVal = correctVal[0];
	}
	else
		correctVal = $('#' + method + 'str' + i + '-path_entry').val();

	var splitVal = correctVal.split(':');

	switch ($('#' + method + 'str' + i + '-type_entry').val()){
		case "off":
			break;
		case "serial":
			$('.additional' + method + i + ' #device' + method + i).val(splitVal['0']);
			$('.additional' + method + i + ' #baudrate' + method + i).val(splitVal['1']);
			break;
		case "file":
			$('.additional' + method + i + ' #path' + method + i).val($('#' + method + 'str' + i + '-path_entry').val());
			break;
		case "tcpcli":
			$('.additional' + method + i + ' #address' + method + i).val(splitVal['0']);
			$('.additional' + method + i + ' #port' + method + i).val(splitVal['1']);
			break;
		case "tcpsvr":
			$('.additional' + method + i + ' #port' + method + i).val(splitVal['1']);
			break;
		case "ntripcli": //user : pass @ address : port / mount
            splitVal[1] = splitVal[1] + ':' + splitVal[2];
            splitVal.splice(2);
            console.log("FIRST DEBUG HERE: " + splitVal);
			$('.additional' + method + i + ' #username' + method + i).val(splitVal['0']);
			var splitPass = splitVal['1'].split('@');
			$('.additional' + method + i + ' #password' + method + i).val(splitPass['0']);
			var splitAdress = splitPass['1'].split(':');
            console.log("HEY DEBUG HERE: " + splitPass);
			$('.additional' + method + i + ' #address' + method + i).val(splitAdress['0']); 
			var splitPort = splitAdress['1'].split('/');
			$('.additional' + method + i + ' #port' + method + i).val(splitPort['0']); 
			$('.additional' + method + i + ' #mount' + method + i).val(splitPort['1']);
			break;
		case "ntripsvr":
			$('.additional' + method + i + ' #username' + method + i).val(splitVal['0']);
			var splitPass = splitVal['1'].split('@');
			$('.additional' + method + i + ' #password' + method + i).val(splitPass['0']);
			var splitAdress = splitPass['1'].split(':');
			$('.additional' + method + i + ' #address' + method + i).val(splitAdress['0']); 
			var splitPort = splitAdress['1'].split('/');
			$('.additional' + method + i + ' #port' + method + i).val(splitPort['0']); 
			$('.additional' + method + i + ' #mount' + method + i).val(splitPort['1']);
			break;
		case "ftp":
			$('.additional' + method + i + ' #address' + method + i).val($('#' + method + 'str' + i + '-path_entry').val());
			break;
		case "http":
			$('.additional' + method + i + ' #address' + method + i).val($('#' + method + 'str' + i + '-path_entry').val());
			break;
	}
}

function showBase(msg){
	var to_append = "";
	var prefixArr = [ 'inp', 'out'];
	var typeArr = ['serial', 'file', 'tcpsvr', 'tcpcli', 'ntripcli', 'ntripsvr', 'ftp', 'http'];
    var formatArr = ['rtcm2', 'rtcm3', 'nov', 'oem3', 'ubx', 'ss2', 'hemis', 'stq', 'javad', 'nvs', 'binex'];
    var optionsArr = ['1002', '1005', '1006', '1007', '1008', '1010', '1019', '1020'];
    
    console.log("Received current base config:");

    // clean prev versions
    var form_div =$("#config_form_column_space");

    form_div.html("");

    $('.loader').css('display', 'none');
    $('#config_select-button').parent().parent().css('display', 'none');

    to_append += '<div class="ui-field-contain">';

    for (var k in msg) {
        console.log("base config item: " + k + " = " + msg[k]);
        to_append += '<div class="ui-field-contain>"';
        
        if((k == 'inpstr-path') || (k == 'outstr-path')){
        	var splitK = k.split('-');

        	if(k == 'inpstr-path')
        		typeArr.splice(5, 1);
        	else
        		typeArr.splice(4, 1);
        	
        	var checkedOption = msg[k].split('://');
        	var checkedFormat = msg[k].split('#');

        	to_append += '<label for="' + k + '_entry">' + k + '</label>';
        	to_append += '<input type="text" id="' + k + '_entry" value="' + msg[k] + '">';
        	to_append += '<select name="select-native-1" id="' + splitK[0] + '-type_entry" class="config_form_field top_input">';

        	$.each(typeArr, function(index, value){
        		if(checkedOption[0] == value)
        			to_append += '<option value="' + value + '" selected="selected">' + value + '</option>';
        		else
        			to_append += '<option value="' + value + '">' + value + '</option>';
        	});

        	to_append += '</select>';
        	
        	to_append += '<div>';
        	to_append += '<label for="' + splitK[0] + '-format_entry">format</label>';

        	if(k == 'inpstr-path'){
        		to_append += '<select name="select-native-1" id="' + splitK[0] + '-format_entry" class="config_form_field top_input">';
        		
        		$.each(formatArr, function(index, value){
            		if(checkedFormat[1] == value)
            			to_append += '<option value="' + value + '" selected="selected">' + value + '</option>';
            		else
            			to_append += '<option value="' + value + '">' + value + '</option>';
        		})

        		to_append += '</select>';
        	}
        	else{
        		to_append += '<input type="text" readonly value="rtcm3" id="' + splitK[0] + '-format_entry">';
        	}

        	to_append += '<div>';
        }
        else if(k == 'rtcm3_out_messages'){
        		var selectedOptionArr = msg[k].split(',');

        		to_append += '<label for="' + k + '_entry">' + k + '</label>';
        		to_append += '<input type="hidden" id="' + k + '_entry" value="' + msg[k] + '" data-clear-btn="true">';
        		to_append += '<fieldset>';
        		to_append += '<label for="select-choice-10"> </label>';
	            to_append += '<select name="select-choice-10" id="select-choice-10" multiple="multiple" data-native-menu="false">';
				to_append += '<option data-placeholder="true">Choose options</option>';

				$.each(optionsArr, function(index, value){
        			if(jQuery.inArray( value, selectedOptionArr ) >= 0)
                    	to_append += '<option value="' + value + '" selected>' + value + '</option>';
                    else
                    	to_append += '<option value="' + value + '">' + value + '</option>';
                })

				to_append += '</select>'
				to_append += '</fieldset>';
        }
        else{
        	to_append += '<label for="' + k + '_entry">' + k + '</label>';
            to_append += '<input type="text" id="' + k + '_entry" value="' + msg[k] + '" data-clear-btn="true">';
        }
        
        to_append += '</div>';
    }

    to_append += '</div>';

	to_append += '<div data-role="popup" id="popupDialog" data-overlay-theme="a" data-theme="a" data-dismissible="false" style="max-width:400px;">';
    to_append +='<div data-role="header" data-theme="a">';
        	to_append +='<h1>Change input?</h1>';
        to_append +='</div>';
        to_append +='<div role="main" class="ui-content">';
        	to_append +='<h3 class="ui-title">Are you sure you want to change this input?</h3>';
        	to_append +='<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a" data-rel="back" data-transition="flow" id="acceptChange">Yes</a>';
        	to_append +='<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a" data-rel="back" id="denyChange">No</a>';
        to_append +='</div>';
	to_append +='</div>';

    form_div.html(to_append).trigger("create");

    $(document).on("change", '.top_input', function() {
		var method = $(this).attr('id').substr(0, 3);

		if($(this).attr('id').substr(7, 6) != 'format'){
			$('#' + method + 'str-path_entry').val('');
			checkInputSelects('', method);
		}
		else{
			var hashSplit = $('#' + method + 'str-path_entry').val().split('#');
			$('#' + method + 'str-path_entry').val(hashSplit['0'] + '#' + $('#' + method + 'str-format_entry').val());
		}
	});

    $(document).on("change", '#select-choice-10', function() {
		$('#rtcm3_out_messages_entry').val($(this).val());
	});

    var popup = true;

	$('#inpstr-type_entry').click(function() {
		if(popup){
			// event.preventDefault();
			$( "#popupDialog" ).popup( "open");
			$('#acceptChange').click(function() {popup = false;});
			$('#denyChange').click(function() {popup = true;});
		}
	});



	$(document).on("change", '.additional_general input', function() {
		
		$(this).parent().parent().removeClass('additional_general');
		
		var method = $(this).parent().parent().attr('class').substr(10, 3);
		
		formString('', method);

		$(this).parent().parent().addClass('additional_general');
	});
	
	for (key in prefixArr) {
		checkInputSelects('', prefixArr[key]);
		defaultStringToInputs('', prefixArr[key]);
		formString('', prefixArr[key]);
	}
}

function showRover(msg, rover_config_order, rover_config_comments){
    var to_append = "";
    var config_key = "";
    var config_value = "";
    var config_comment = "";
    var splitArr = "";
    var innerSplit = "";
    var topClassArr = ['inpstr1-type', 'inpstr1-format' ,'inpstr2-type', 'inpstr2-format', 'inpstr3-type', 'inpstr3-format', 'outstr1-type', 'outstr1-format' , 'outstr2-type', 'outstr2-format', 'logstr1-type', 'logstr1-format', 'logstr2-type', 'logstr2-format', 'logstr3-type', 'logstr3-format'];
    var prefixArr = { log: '3', out: '2', inp: '3' };

    console.log("Received current rover config:");

    // clean previous versions
    var form_div = $("#config_form_column_space");

    form_div.html("");

    $('.loader').css('display', 'none');

    to_append += '<div class="ui-field-contain fields-field">';
    to_append += '<div class="general-settings"></div>';
    to_append += '<button class="ui-btn" id="adv-set-btn">Advanced settings</button>';
    to_append += '<div class="advanced-settings" style="display:none">';

    if (!$.isEmptyObject(rover_config_order)) {
        for (var k in rover_config_order) {

            config_key = rover_config_order[k];

            if (rover_config_order[k] in msg) {
                config_value = msg[rover_config_order[k]];
                config_comment = rover_config_comments[config_key] || "";

                if (config_comment)
                    config_comment = " # " + config_comment;

                console.log("config rover item: " + config_key + " = " + config_value);

                to_append += '<div class="ui-field-contain>"';
                to_append += '<label for="' + config_key + '_entry">' + config_key + '</label>';

                if( (config_comment) && (config_comment.indexOf(',') >= 0) ){
                    splitArr = config_comment.split(',');                    

                    if(jQuery.inArray(config_key, topClassArr) >= 0)
						to_append +=  '<select name="select-native-1" id="' + config_key + '_entry" class="config_form_field top_input">';
					else
						to_append +=  '<select name="select-native-1" id="' + config_key + '_entry" class="config_form_field">';
                    
                    $.each(splitArr, function(index, value){
                        value = value.replace(/[# (]+/g,'').replace(/[)]+/g,'');
                        innerSplit = value.split(':');

                        if(innerSplit['1'] == config_value)
                            to_append += '<option value="' + innerSplit['1'] + '" selected="selected">' + innerSplit['1'] + '</option>';
                        else
                        	to_append += '<option value="' + innerSplit['1'] + '">' + innerSplit['1'] + '</option>';
                    })

                    to_append += '</select>';
                }
                else
                    to_append += '<input type="text" data-clear-btn="true" id="' + config_key + '_entry" value="' + config_value + '" class="config_form_field" >';                    

                to_append += '</div>';
            }
        }

    }

    to_append += '</div>';
    to_append += '</div>';

    form_div.html(to_append).trigger("create");

	for (key in prefixArr) {
		for(var b = prefixArr[key]; b >=1; b--){
			if(key != 'inp' || b != 1){
				$(".ui-field-contain.fields-field .general-settings").prepend($('#' + key + 'str' + b + '-format_entry').parent().parent().parent());
			    $(".ui-field-contain.fields-field .general-settings").prepend($('#' + key + 'str' + b + '-path_entry').parent().parent());
    			$(".ui-field-contain.fields-field .general-settings").prepend($('#' + key + 'str' + b + '-type_entry').parent().parent().parent());
			}
			else{
				$(".ui-field-contain.fields-field .advanced-settings").prepend($('#' + key + 'str' + b + '-format_entry').parent().parent().parent());
			    $(".ui-field-contain.fields-field .advanced-settings").prepend($('#' + key + 'str' + b + '-path_entry').parent().parent());
    			$(".ui-field-contain.fields-field .advanced-settings").prepend($('#' + key + 'str' + b + '-type_entry').parent().parent().parent());
			}
		}
	}

	$(".ui-field-contain.fields-field .general-settings").prepend($('#pos1-posmode_entry').parent().parent().parent());

	$(document).on("change", '.top_input', function() {
		var method = $(this).attr('id').substr(0, 3);
		var numb = $(this).attr('id').substr(6, 1);

		if($(this).attr('id').substr(8, 6) != 'format'){
			$('#' + method + 'str' + numb + '-path_entry').val('');
			checkInputSelects(numb, method);
		}
	});

	$(document).on("change", '.additional_general input', function() {
		
		$(this).parent().parent().removeClass('additional_general');
		
		var method = $(this).parent().parent().attr('class').substr(10, 3);
		var numb = $(this).parent().parent().attr('class').substr(13, 1);
		
		formString(numb, method);

		$(this).parent().parent().addClass('additional_general');
	});

	$('#adv-set-btn').click( function(){
		$( ".advanced-settings" ).slideToggle('slow');
		return false;
	})
	
	for (key in prefixArr) {
		for(var b = 1; b <=prefixArr[key]; b++){
			checkInputSelects(b, key);
			defaultStringToInputs(b, key);
			formString(b, key);
		}
	}
}