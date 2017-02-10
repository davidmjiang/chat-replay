/* jshint strict: false, asi: true, esversion:6 */
var mainModule = function(messages){
	var transcript = messages; // will store the JSON chat transcript
	var delta = 0; // keeps track of time

	// regular expressions for formatting text
	var underscores = /\b_([\w\s]+?)_\b/g;
	var asterisks = /(^|\W)\*([\w\s]+?)\*/g;
	var atSign = /(^|\W)(@\w+)/g;

	// chooses function based on type of payload and then calls that function at the time specified by delta property
	var tick = function(idx){
	 if(idx < transcript.length){
	 	var data = transcript[idx];
	 	var cb;
	  switch(data.payload.type){
	    case "message":
	    cb = addMessage;
	    break;
	    case "connect":
	    cb = addConnection;
	    break;
	    case "update":
	    cb = update;
	    break;
	    case "delete":
	    cb = deleteMessage;
	    break;
	    case "disconnect":
	    cb = disconnect;
	    break;
	    default:
	    console.log('unknown paylaod type');
	    break;
	  }
	  setTimeout(function(){
	  	cb(data.payload);
	  	delta = data.delta;
	  	// call tick on the next line in the transcript
	  	tick(idx + 1);
	  }, (data.delta - delta));
	 }
	 else if(idx === transcript.length){
	 	setTimeout(function(){
	 		$('.link-container').show();
	 	}, 1000);
	 }
	};

	var addMessage = function(data){
		var text = formatText(data.message.text);
	  var message = 
	  `<div class="message-block" data-id=${data.message.id}>
	  	<div class="user" data-id=${data.user.id}>${data.user.display_name}</div>
	  	<span class="message" data-id=${data.message.id}>${text}</span>
	  </div>`;
	  $('.chat-box').append(message);
	  scrollToBottom();
	};

	var addConnection = function(data){
		var connection = `<div class="connection"><span class="user">${data.user.display_name}</span><span> has connected</span></div>`;
		$('.chat-box').append(connection);
		scrollToBottom();
	};

	var update = function(data){
		// user update
	  if(data.user){
	    $(`.user[data-id=${data.user.id}]`).text(data.user.display_name);
	  }
	  //message update
	  else if(data.message){
	  	var text = formatText(data.message.text);
	    $(`.message[data-id=${data.message.id}]`).empty().append(text);
	  }
	};

	var deleteMessage = function(data){
	  $(`.message-block[data-id=${data.message.id}]`).remove();
	};

	var disconnect = function(data){
		var disconnection = `<div class="disconnection"><span class="user">${data.user.display_name}</span><span> has disconnected</span></div>`;
		$('.chat-box').append(disconnection);
		scrollToBottom();
	};

	// this automatically scrolls down the chat window so that the latest (bottom) message is in view
	var scrollToBottom = function(){
		var chatBox = $('.chat-box').get(0);
		chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
	};

	var formatText = function(text){
	  var formattedText = text.replace(underscores, " <em>$1</em>")
	  .replace(asterisks, " <em>$2</em>")
	  .replace(atSign, ` <span class="mention">$&</span>`);
	  return formattedText;
	};

	tick(0);
}

$(document).ready(function(){
	var data;
	axios.get('https://floating-basin-79702.herokuapp.com/api/replays').then(function(response){
		data = response.data;
		for(var key in data){
			var clientTime = new Date(data[key].startTime);
			$('.links').append(`<li data-id=${key} class="link">${clientTime}</li>`);
		}
		$('.links').on('click', 'li', function(e){
			$('.chat-box').empty();
			$('.link-container').hide();
			var transcript = data[$(e.target).attr('data-id')].messages;
			mainModule(transcript);
		});
	});
});