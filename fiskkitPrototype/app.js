	var app = angular.module( "testApp",[]);

	app.controller("appController", function( $scope, urlContent){
		$scope.urlContent = urlContent;
	});

	app.service( "urlContent", function(){
	/* ajax function to call php function and get data*/
		this.url = "";
		this.status = "false";
		var last = "";
		this.result = function(){
			if( last!= this.url ){
				$.ajax({
					url: "getContent.php",
					data:'url='+this.url+'/',
					type: "POST",
					success: function(responseData){
						if( responseData){
							var iframe = document.getElementById('ifid');
							iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
							iframe.document.open();
							iframe.document.write(responseData);
							iframe.document.close();
							//$('#web').html( responseData );
							last = this.url;
						}
					}
				});
				if( this.status){
					this.status = "false";
				}
				else{
					this.status = "true";
				}
			}
		};
	});