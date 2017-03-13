(function() {
	 signIn();
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
	 * Sign in with GitHub.
	 */
	function signIn (){
		$(".signin").on('click', function(){
			alert('Sorry, this function is under development!');
			/* $.get('https://github.com/login/oauth/authorize?client_id=6debf385832bd698f1d1',
				function(data){
				if (data.success) {
					console.log('all ok');
				} else {
					console.log('error');
				}
			}, "json");
			return false; */
		});	
	};
	
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