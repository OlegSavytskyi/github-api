(function() {
	 $(".hide").hide();
	 $(".getjson").on('click', function(){
		delOldRepos();
		var link = "https://api.github.com/users/";
		var userName = $(".getcod").val();
		$.getJSON(link + userName + '/repos', function(data, status, xhr){
			$(".hide").show();
			data.forEach (
				function (val){
					$(".getrepos").append("<li class='listRepos' data-toggle='tooltip' data-title='open issues:"+val.open_issues+"'>"+val.name+"</li>");
				}
			 );
			handleTooltip();
			handleIssueClick(userName);
		});
	});	
	
	/**
	 * Close block Issue.
	 */
	function signIn (){
		$(".signin").on('click', function(){
			console.log('test SignIn');
			$.get('https://github.com/login/oauth/authorize?client_id=6debf385832bd698f1d1',
				function(data){
				if (data.success) {
                $('#result').html(data.success.msg);
				} else {
                $('#result').html(data.error.msg);
				}
			}, "json");
			return false;
		});	
	};
	signIn();
	
	/**
	 * Show issues of the chosen project(repository).
	 * @param {string} userName.
	 */
	function handleIssueClick (userName){
		$(".getrepos").on('click', 'li', userName, function(e){
			$(".blockIssue").remove();
			var $this = $(this);
			var $elementRepos=$this.text();
			$(".nojs").prepend("<div class='blockIssue'><p>" + userName + " > " + $elementRepos + " > issue: " + "</p><div title='close' class='blockIssueClose'>X</div><ul class='issue'></ul></div>")
			var linkIssue = "https://api.github.com/repos/";
			$.getJSON(linkIssue + userName + '/' + $elementRepos +'/issues', function(data, status, xhr){
				data.forEach (
					function (val1){
						$(".issue").append("<li>"+val1.title+"</li>");
					}
				)
			});
			blockIssueClose();
		});
	}

	/**
	 * Show tooltip on the mouse over event for the chosen repository.
	 */
	function handleTooltip (){
		$(".getrepos").on('mouseover', 'li' , (function(){
			$('[data-toggle="tooltip"]').tooltip();
		}));
	}

	/**
	 * Delete old repos of the chosen project(repository).
	 */
	function delOldRepos (){
		var $oldRepos = $(".getrepos>li");
		if ($oldRepos.length !== 0){
			$oldRepos.remove();
		}
	}

	/**
	 * Close block Issue.
	 */
	function blockIssueClose (){
		$(".blockIssueClose").on('click', function(){
			$(".blockIssue").remove();
		});	
	};
})();

	
/* 
	
var auth = btoa('OlegSavytskyi:Test123');
jQuery.ajax({
	type        : 'GET', 
	url         : 'https://api.github.com/authorizations', 
	headers: { 
		"Authorization": "Basic " + auth 
	},
	success : function(data) {
		console.log(data);
		alert("Done!");
	}
	
});

	
var auth = btoa('OlegSavytskyi:Test123');
jQuery.ajax({
	type: 'POST', 
	url: 'https://api.github.com/repos/OlegSavytskyi/github-api/issues/1/comments', 
	data: 	'{"body": "Hello!"}',
	headers: { 
		"Authorization": "Basic " + auth 
	},
	success : function(data) {
		console.log(data);
		alert("Done!");
	}
	
});






	
jQuery.ajax ({ 
	url: "https://api.github.com/authorizations", 
	data: {"body": "Me too"},
	beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa('OlegSavytskyi:Gjknfdf23')) },
	succes: function(val){ alert(val)}
});

	
	var auth = btoa('test:test');
$.ajax({
    type: 'GET',
    url: 'http://example.com',
    headers: {
        "Authorization": "Basic " + auth
    },
    success : function(data) {
    },
	

});
	
	 */