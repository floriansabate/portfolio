$('html, body').css({"left":"-100%","opacity":"0"});

$(document).ready(function() {
	$('html, body').animate({ //fading animation used as a transition when opening the page
		left: '0%',
		opacity: 1
	}, 800); 
	positionElement();
	onsetEffect();	
});

$('.carousel').carousel({interval: 20000}); //setting up the interval between each sliding effect of the carousels

$('#chevron').on('click', function() { // Scroll the page to the about section by clicking on the element with ID 'chevron'
  $('html, body').animate({
    scrollTop: $("#about").offset().top
  }, 400); 
})


var time;
document.getElementById('chevron').addEventListener('mouseover', function(e){ // capture the mouseover event on the chevron, in order to stop its CSS animation
	time = new Date().getTime();
	this.style.webkitAnimationPlayState = "paused";
	$('h4').css({
		top: $('#chevron').offset().top,
		left: $('#chevron').offset().left,
		opacity: 0
		});
	$('h4').animate({
		left: $('#chevron').offset().left*2,
		opacity: 0.8
	}, 500); 
})
document.getElementById('chevron').addEventListener('mouseout', function(e){ // capture the mouseout event on the chevron to resume the animation
	if((new Date().getTime()) - time > 200){
		this.style.webkitAnimationPlayState = "running";
		$('h4').animate({
			left: $('#chevron').offset().left*1.5,
			opacity: 0
		}, 500);
	}
})


$('#backtotop').on('click', function() { // listen to the button click event, then scroll the page to the top
  $('html, body').animate({
    scrollTop: 0
  }, 400); 
})

$('a').on('click', function(event) { // listen to the click event of all <a> elements, and if the href contains an '#' carries out a scroll to the element with this ID
	var hash = this.hash;
	if (hash !== "") {
      event.preventDefault();
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 500, function(){
			window.location.hash = hash;
		});	  
    }
})

$(window).scroll(function () { //listen to the scrolling event of the page, and performs a progressive evolution of the element's opacity
    var scrollTop = $(window).scrollTop(), height = $(window).height();
    $('#header').css({
        'opacity': ((height - scrollTop) / height)
    }); 
	$('#myCarousel2').css({
        'opacity': (($('#myCarousel2').offset().top +height  - scrollTop) / height)
    }); 
	$('#about').css({
        'opacity': (($('#about').offset().top + height - scrollTop) / height)
    }); 
	$('#skills').css({
        'opacity': (($('#skills').offset().top + height +100 - scrollTop) / height)
    }); 	
});

function search(){ // Function that show the search bar 
	var searchBar = document.getElementById("searchbar"); 
	if (searchBar.style.display == 'none' || searchBar.style.display == '') { 
		searchBar.style.display = "block";
		searchBar.focus();
	} else{
		if(searchBar.value === ""){
			searchBar.style.display = "none";
		}else{
			jumpToText(searchBar.value, true);
		}
	}
}

function jumpToText(searchBarValue, buttonClick){ // function that analyzes the value entered by the user in the search bar and tries to find out if there are any occurrences in the document, if so a scrolling effect is realized to the first occurence, and the function highLightText() is launched
	$('body').find("span").each(function(index) {
		if($(this).hasClass( "highlight" ) ) {
			$(this).replaceWith($(this).text());
		}
	});
	if(event.key === 'Enter' || buttonClick) {
		var regex = new RegExp("\\b(?<=^([^<]|<[^>]*>)*)"+searchBarValue+"\\b", 'gi');
		if (searchBarValue != "" && $('body').text().search(regex) > -1) {
			highlightText(regex);
			$('html, body').animate({
				scrollTop: $(`.highlight`).offset().top
			}, 400); 
		}else{
			document.getElementById("searchbar").animate([{ transform: 'translateX(0px)' }, { transform: 'translateX(10px)' }], { 
			duration: 100,
			iterations: 4
			});
			searchBar.focus();
		}
	}
}

function highlightText(regex){ // function that highlights the corresponding text in the search bar, by adding a specific CSS class to the occurrence
	var content = $('body').html();
	content = content.replace(regex, "<span class='highlight'>$&</span>");
	$('body').html(content);
}


function openContact(){ // function that open the contact page with a fading animation
	$('html, body').animate({
			left: '-100%',
			opacity: 0
		}, 800, function(){
			window.open("contact.html","_self");
		});	 
}

function onsetEffect(){ // function to create a fade effect on the subtitle (h2) and chevron when the page is opened
	$('h2').animate({
		left: '0%',
		opacity: 1
	}, 1200);
	$('#chevron').animate({
		left: '2%',
		opacity: 0.8
	}, 1200);
	setTimeout(function() {document.getElementById('chevron').style.webkitAnimationPlayState = "running";},1500);
}

function positionElement(){ // function to adjust the CSS value of the subtitle and chevron before starting the animation
	document.getElementById('chevron').style.webkitAnimationPlayState = "paused";
	$('h2').css({
		left: '-25%',
		opacity: 0
		});
	$('#chevron').css({
		left: '-23%',
		opacity: 0
		});
}



