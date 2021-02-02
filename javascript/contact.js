var currentInput;

$('html, body').css({"left":"100%","opacity":"0"});

$(document).ready(function() {
	$('html, body').animate({ //fading animation used as a transition when opening the page
		left: '0%',
		opacity: 1
	}, 600); 
});

$("body").on("focus", "input, textarea", function() { //function that show the clear button when we focus an input or textarea if not empty
	if($(this).val() !==""){
		if($(this).prop("tagName") === "INPUT"){displayCloseButton($(this).offset().top, $(this).offset().left + $(this).width() - 3.5*$('#close').width());}
		else{displayCloseButton($(this).offset().top + $(this).height() - 2*$('#close').height(), $(this).offset().left + $(this).width() - 3.5*$('#close').width());}
		}
});

$("body").on("change paste keyup", "input, textarea", function() { //function which listen to the typing change in all the inputs and textarea elements, in order to display the clear button
	if($(this).val() !==""){
		if($(this).prop("tagName") === "INPUT"){displayCloseButton($(this).offset().top, $(this).offset().left + $(this).width() - 3.5*$('#close').width());}
		else{displayCloseButton($(this).offset().top + $(this).height() - 2*$('#close').height(), $(this).offset().left + $(this).width() - 3.5*$('#close').width());}
	}else{
		document.getElementById("close").style.display = "none";
	}
	if($(this).css("border-radius") === "2px"){
		$(this).css({"border":"1px solid #F5F5F5","color":"#FF5733","border-radius":"0", "background-color":"#F5F5F5"});
	}
});

$('#close').mousedown(function(){ // function that clear the current focused element (input or textarea) when the button is clicked
		document.activeElement.value = "";
    });   

$("body").on("blur", "input, textarea", function() { //function that hide the clear button when the element loses its focus
	document.getElementById("close").style.display = "none"
});

$("#submit").on("click", function() { // function called when the submit button is clicked, which check the adequacy of the form
	var error=0;
	$("input, textarea").each(function(){    
		if(!this.value || ($(this).attr('type') === "email" && !validateEmail($(this).val()))){
			$(this).css({"border":"1px solid #F04343","color":"#F04343","border-radius":"2px","background-color":"#FDC5C5"});
			this.animate([{ transform: 'translateX(0px)' }, { transform: 'translateX(10px)' }], { 
			duration: 100,
			iterations: 4
			});
			error++;
		}
	});
	if(error == 0){
		document.getElementById("form").submit();
	}
});

function back(hash){ //Function that open the link with a fading animation on the left
	 $('html, body').animate({
			left: '100%',
			opacity: 0
		}, 800, function(){
			window.open("index.html"+hash,"_self");
		});	 
}

function displayCloseButton(valY, valX){ //function to display the clear button relative to the input
		$('#close').css({
		top: valY,
		left: valX,
		display: 'block',
		});
}

function validateEmail(email) { // check the validity of the email entered
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

	

