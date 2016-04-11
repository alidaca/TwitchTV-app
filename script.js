$(document).ready(function(){
//list of streams displayed(provided by fcc)
	var streams = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","medrybw"].sort();

	for (var i = 0; i < streams.length; i++) {
		var user = streams[i];
		var userUrl = 'https://api.twitch.tv/kraken/users/' + user +'?callback=?';
		var streamUrl = 'https://api.twitch.tv/kraken/streams/';
		var logo,displayName,profiles,streamStatus, channelLink, userName;
		var icon = "";
		var details="";

		//get user info
		$.getJSON(userUrl,function(userData){
			userName = userData.name;
			//get stream info
			$.getJSON(streamUrl + userName +'?callback=?', function(streamData){
				// console.log(userData);
				// console.log(streamData);
				userName = userData.name;
				logo = userData.logo;
				displayName = userData.display_name;
				details = '';
				streamStatus = streamData.stream;
				channelLink='http://www.twitch.tv/'+ userName;
				status='';

				//set icon depending on streaming status
				if (streamStatus === null){
					icon = 'fa fa-exclamation-circle';
					status = 'offline';
				}else{
					icon = 'fa fa-check-circle';
					details = streamData.stream.channel.status;
					status = 'online';
				}

			//append markup
			appendMarkup(logo,displayName,icon,details,channelLink,status);
			});
		});

	}; //for loop

}); //document.ready

//NAVIGATION

$('#showAll').on('click',function(){
	$('.list-item').removeClass('hidden');
	$('.navigation li').removeClass('active');
	$(this).addClass('active')
});

$('#showOnline').on('click', function(){
	$('.list-item.offline').addClass('hidden');
	$('.list-item.online').removeClass('hidden');
	$('.navigation li').removeClass('active');
	$(this).addClass('active')
});

$('#showOffline').on('click',function(){
	$('.list-item.online').addClass('hidden');
	$('.list-item.offline').removeClass('hidden');
	$('.navigation li').removeClass('active');
	$(this).addClass('active')
});



//SEARCH FIELD
$('#search').keyup(function(event) {
	var filter = $(this).val();
	$('#list li h3').each(function() {

		if ($(this).text().search(new RegExp(filter,"i")) < 0){
			$(this).parents(".list-item").addClass('hidden');
		}else{
			$(this).parents(".list-item").removeClass('hidden');
		}

	});
});

//ADD MARKUP
function appendMarkup(logo,displayName,icon,details,channelLink,status){
	var det = details;
	var nm = displayName;
	var lg = logo;
	var ic = icon;
	var ch = channelLink;
	var det_class = "hidden";
	var st = status

	//fallback for missing logo
	if (lg === null){
		lg = "http://www.placehold.it/70x70";
	}

	//only desplay details when present
	if (det != ""){
		det_class = "details";
		if (det.length > 35){
			det= det.slice(0,34) + '...';
		}
	}


	var markup ='<li class="list-item '+ st +'">'+
								'<a href='+ ch +'>'+
									'<div class="stream">'+
										'<div class="box">'+
											'<img src="'+ lg +'">'+
										'</div>'+
										'<h3 class="userName">'+ nm +'</h3>'+
										'<div id="icon"><i class="'+ ic +'"></i></div>'+
									'</div>'+
								'</a>'+
								'<p class="'+ det_class +'">'+ det + '</p>' +
							'</li>';

	$('#list').append(markup);
}
