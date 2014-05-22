$(document).ready(function(){
  $('#getInvolved').submit(function(e){
    e.preventDefault();
    var btn = $('#submit');
    var authData = {
      username: $('input[name="id"]').val(),
      password: $('input[name="password"]').val()
    };
    var rewardData = {
      phone: $('input[name="phone"]').val(),
      usrID: $('input[name="id"]').val(),
      name: $('input[name="name"]').val()
    };

    btn.text('努力提交中。。');
    $.ajax({
			url: '/auth.action',
			type: 'POST',
			data: authData,
		})
		.done(function(data) {
			console.log("success");
			if(data.errno===true){
				rewardData.token = data.result;
			  $.ajax({
          url: '/SetReward.action',
          type: 'POST',
          data: rewardData,
        })
        .done(function(data) {
          console.log("success");
          if(data.result===true){
            btn.text('提交成功');
          }
        })
        .fail(function() {
          console.log("set reward error");
        })
        .always(function() {
          console.log("complete");
        });
			}
		})
		.fail(function() {
			console.log("auth error");
			btn.text('auth fail');
		})
		.always(function() {
			console.log("complete");
		});

  });
});
