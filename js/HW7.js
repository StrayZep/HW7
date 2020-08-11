/*Assignment: Using the jQuery UI Slider and Tab Widgets
 Name:      Zepeng Wang
 E-mail:    Zepeng_Wang@student.uml.edu
 Data:      8/10/2020
 Description: This web is creating an interactive dynamic multiplication table that accept userinput
 and calculate from -50 to 50 multiplication
 write a fuction calulation() in js to calculate number in html and put result into table.
 https://stackoverflow.com/questions/39269353/multiplication-table-in-html-javascript
 how to print table
 https://stackoverflow.com/questions/49402954/how-to-print-multiplication-table-by-using-html-tables-code-is-in-javascript
 another studying resource youtube video how to create multiplication table using HTML,CSS, and JavaScript
 https://www.youtube.com/watch?v=5Oq6Eqy7Y_A
 91.61 GUI Programming 1 at UMASS Lowell
*/

/*
the introduction for validate() :https://jqueryvalidation.org/validate/
how to use rules() and messages(): https://stackoverflow.com/questions/14179417/jquery-validation-rules-and-messages

I used rules()first to define what the expected input should be, then use messages() to display the error to users 
starightly when they enter invalid input.
*/
$(document).ready(function() {
    /* initializations */
    $("#h_start").val(0);
    $("#h_end").val(0);
    $("#v_start").val(0);
    $("#v_end").val(0);

    $("form").validate({
        rules: {
            h_start: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            h_end: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            v_start: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
            v_end: {
                number: true,
                required: true,
                min: -50,
                max: 50
            },
        },
        /*
           number: means the input has to be a number, 
           required: means the input box has to be filled 
            min and max mean the minimum and maximum value of valid numbers.
           validator will check if input is not satisfied with those conditions, it will show the error messages next to the input box.
         */

        messages: {
            h_start: {
                number: "&nbsp; Invalid input : not a number",
                required: "&nbsp; Invalid input : please enter a number",
                min: "&nbsp; Invalid input : number must be > -50",
                max: "&nbsp; Invalid input : number must be < 50"
            },
            h_end: {
                number: "&nbsp; Invalid input : not a number",
                required: "&nbsp; Invalid input : please enter a number",
                min: "&nbsp; Invalid input : number must be > -50",
                max: "&nbsp; Invalid input : number must be < 50"
            },
            v_start: {
                number: "&nbsp; Invalid input : not a number",
                required: "&nbsp; Invalid input : please enter a number",
                min: "&nbsp; Invalid input : number must be > -50",
                max: "&nbsp; Invalid input : number must be < 50"
            },
            v_end: {
                number: "&nbsp; Invalid input : not a number",
                required: "&nbsp; Invalid input : please enter a number",
                min: "&nbsp; Invalid input : number must be > -50",
                max: "&nbsp; Invalid input : number must be < 50"
            },
        },

        /*
        https://jqueryvalidation.org/validate/
        submitHandler (default: native form submit) Callback for handling the actual submit when the form is valid. 
        Gets the form and the submit event as the only arguments. Replaces the default submit. The right place to submit a 
        form via Ajax after it is validated.
        invalidHandler Callback for custom code when an invalid form is submitted. Called with an event object as the first 
        argument, and the validator as the second. 
        empty() is used for next form if there is more valid input then clean the last form data.
        */
        submitHandler: function() {
            calculation();
            return false;
        },
        invalidHandler: function() {
            $("#mult_table").empty();
        },
        onkeyup: function() {
            $("form").submit();
        }
    });

    /* show the initial table */
    calculation();

    /* config for slider, initialize it and set range to -50 -50 */
    /* How TO - Range Sliders https://www.w3schools.com/howto/howto_js_rangeslider.asp*/
    $("#h_start_slider").slider({
        value: 0,
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#h_start").val(ui.value);
            $("form").submit();
        }
    });
    $("#h_start").on("keyup", function() {
        $("#h_start_slider").slider("value", this.value);
        $("form").submit();
    });

    $("#h_end_slider").slider({
        value: 0,
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#h_end").val(ui.value);
            $("form").submit();
        }
    });
    $("#h_end").on("keyup", function() {
        $("#h_end_slider").slider("value", this.value);
        $("form").submit();
    });

    $("#v_start_slider").slider({
        value: 0,
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#v_start").val(ui.value);
            $("form").submit();
        }
    });
    $("#v_start").on("keyup", function() {
        $("#v_start_slider").slider("value", this.value);
        $("form").submit();
    });

    $("#v_end_slider").slider({
        value: 0,
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#v_end").val(ui.value);
            $("form").submit();
        }
    });
    $("#v_end").on("keyup", function() {
        $("#v_end_slider").slider("value", this.value);
        $("form").submit();
    });
  /* add a tab bar */
    $("div.tabs").tabs();
});

 /*initialize tab_count start at 0 */
var tab_count = 0;

/*study source:http://www.tutorialspark.com/jqueryUI/jQuery_UI_Tabs_Methods_Adding_Removing_Tabs.php
  when click save tab, this fuction will add a tab and save content of mult_table*/
function save_tab() {
    tab_count++;
    var tab = "<li class='tab'><a href='#tab-" + tab_count + "'>" + tab_count + "</a>" +
        "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

    $("div.tabs ul").append(tab);
    $("div.tabs").append('<div id="tab-' + tab_count + '">' + $("#mult_table").html() + '</div>');

    $(".tabs").tabs().on("click", "span.ui-icon-close", function() {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        $(".tabs").tabs("refresh");
    });

    $(".tabs").tabs("refresh");
    $(".tabs").tabs("option", "active", -1);
}

/*function for remove tabs, use for loop to remove all tabs, refresh table content*/
function remove_all_tabs() {
    $(".tabs li").remove();
    for (let i = tab_count; i > 0; i--) {
        $("#tab-" + i).remove();
    }
    $(".tabs").tabs("refresh");
    tab_count = 0;
}

/*
 the following code is totally same as my HW5
 */
function calculation() {
    //like what we did for inclass exercise, us get ElementById TO GET THE value for varibles
    var h_start = Number(document.getElementById('h_start').value);
    var h_end = Number(document.getElementById('h_end').value);
    var v_start = Number(document.getElementById('v_start').value);
    var v_end = Number(document.getElementById('v_end').value);

    // alert user input number range when they input something bigger or smaller.
    if (!$("form").valid()) {
        return;
    }
    // this part is to make sure start number is small than end number, if not, swap them.
    if (h_start > h_end) {
        var temp = h_start;
        h_start = h_end;
        h_end = temp;
    }
    if (v_start > v_end) {
        var temp = v_start;
        v_start = v_end;
        v_end = temp;
    }

    // matrix structure is good for fill the table data and make sure the number are absulute because
    //rows and colunms can not be negative
    // and then initialize the number to new 2 vars for calulating.
    var matrix = {};
    var rows = Math.abs(h_end - h_start);
    var columns = Math.abs(v_end - v_start);
    var hor_number = h_start;
    var ver_number = v_start;

    // use an array to calculate each value in rows and columns and put result into object arr

    for (var x = 0; x <= columns; x++) {
        var arr = [];
        for (var y = 0; y <= rows; y++) {
            var calc = hor_number * ver_number;
            arr[y] = calc;
            hor_number++;
        }
        matrix["row" + x] = arr

        //reset hor_number to start.
        hor_number = h_start;
        ver_number++;
    }

    // call fill fuction to put result into each box
    fill(matrix);
    return false;
}


function fill(matrix) {

    //those part are working as same as calculation fuctions.
    var h_start = Number(document.getElementById('h_start').value);
    var h_end = Number(document.getElementById('h_end').value);
    var v_start = Number(document.getElementById('v_start').value);
    var v_end = Number(document.getElementById('v_end').value);
    if (h_start > h_end) {
        var temp = h_start;
        h_start = h_end;
        h_end = temp;
    }
    if (v_start > v_end) {
        var temp = v_start;
        v_start = v_end;
        v_end = temp;
    }
    var rows = Math.abs(h_end - h_start);
    var columns = Math.abs(v_end - v_start);


    var fill_number = "";

    // style the table and make sure table can aotumatically change its size for better readability
    fill_number += "<table style='width:" + (rows + 1) * 40 + "px'>";
    fill_number += "<tr><td></td>"; //create a empty space at top-left


    //use for loop to fill first row
    for (var r = h_start; r <= h_end; r++) {
        fill_number += "<td>" + r + "</td>";
    }
    fill_number += "</tr>"; // end the fill for first row
    var ver_number = v_start; // fill the left columns

    // use for loop fill all the rest rows.
    for (var x = 0; x <= columns; x++) {
        fill_number += "<tr><td>" + ver_number + "</td>";
        for (var y = 0; y <= rows; y++) {
            fill_number += "<td>" + matrix["row" + x][y] + "</td>";
            // calculation happened here and fill into each rows
        }
        ver_number++;
    }

    $("#mult_table").html(fill_number); // let html load the multiplication_table 

}