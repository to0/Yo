var host = 'http://115.29.166.167/api';
var clock;
$(document).ready(function(){
  var tbody = $('#ranking-list').children('tbody');
  var currentDate = new Date();

				// Set some date in the future. In this case, it's always Jan 1
	var futureDate  = new Date(2014, 7, 30);

	// Calculate the difference in seconds between the future and current date
	var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	// Instantiate a coutdown FlipClock
	clock = $('.counter').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: true
	});

  $('#getInvolved').submit(function(e){
    e.preventDefault();
    var btn = $('#submit');
    var msg = $('#submission-message');
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
    $.ajax({//login
			url: host + '/auth.action',
			type: 'POST',
			data: authData,
		})
		.done(function(data) {
			console.log("success");
			if(data.errno===0){//login success
				rewardData.token = data.result;
        getRankingList(tbody, rewardData.token);

			  $.ajax({//coupon
          url: host + '/SetReward.action',
          type: 'POST',
          data: rewardData,
        })
        .done(function(data) {
          console.log("success");
          switch (data.result) {
          case 1:
            btn.text('提交成功');
            btn.attr('disabled','disabled');
            msg.addClass('hidden');
            break;
          case -1:
            msg.removeClass('hidden');
            msg.children('strong').text('无此用户');
            btn.text('重新提交');
            break;
          case -2:
            msg.removeClass('hidden');
            msg.children('strong').text('已经报名过');
            btn.text('重新提交');
            break;
          default:
          }
        })
        .fail(function() {
          console.log("set reward error");
          msg.removeClass('hidden');
          msg.children('strong').text('提交失败');
          btn.text('重新提交');
        });
			}
      else{//login fail
        msg.removeClass('hidden');
        msg.children('strong').text('登录失败');
        btn.text('重新提交');
      }
		})
		.fail(function() {
			console.log("auth error");
			msg.removeClass('hidden');
      msg.children('strong').text('登录失败');
      btn.text('重新提交');
		});
  });
});

var getRankingList = function(tbody, token){
  $.ajax({
    url: host + '/GetReward.action',
    data: {
      token: token
    },
    type: 'POST'
  })
  .done(function(data) {
    console.log('get ranking list done');
    console.log(data);
    if(data.errno ===0 && data.result!=null){
      var row;
      for(var i=0; i<data.result.length; i++){
        // console.log();
        row = '';
        row += '<tr><td>' + data.result[i].username + '</td>';
        row += '<td>' + data.result[i].realname + '</td>';
        row += '<td>' + data.result[i].numOfMission + '</td>';
        row += '<td>' + data.result[i].numOfSuggestion + '</td></tr>';

        tbody.append(row);
      }
    }
    else {

    }
  })
  .fail(function(data){

  });
};
