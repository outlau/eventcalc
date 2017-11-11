/* global $ */
$( document ).ready(function() {
 
	$('.reset').click(function(e) {
	    document.getElementById('mlt1').value = "";
	    
	    document.getElementById('mlt2').value = "";
	    
	    document.getElementById('amt1').value = "";
	    
	    document.getElementById('amt2').value = "";
	    
	    document.getElementById('exchange').value = "";
	})
    
    $('.calc').click(function(e){
    	e.preventDefault();
		
		var perc_mlt_1 = parseInt(document.getElementById('mlt1').value);

        var perc_mlt_2 = parseInt(document.getElementById('mlt2').value);
        
        var quantity_of_1 = parseInt(document.getElementById('amt1').value);
        
        var quantity_of_2 = parseInt(document.getElementById('amt2').value);
        
        var cost_to_convert = parseInt(document.getElementById('exchange').value);
        
        var validated = true;
        
        if (perc_mlt_1.length == 0){
        	validated = false;
        }
        if (perc_mlt_2.length == 0){
        	validated = false;
        }
        if (quantity_of_1.length == 0){
        	validated = false;
        }
        if (quantity_of_2.length == 0){
        	validated = false;
        }
        if (cost_to_convert.length == 0){
        	validated = false;
        }
        
        if(!validated){
        	error();
        	return;
        }
        else{
			findRatio(perc_mlt_1,perc_mlt_2,quantity_of_1,quantity_of_2,cost_to_convert);
	
        }
	});
    
});



function error(){
	$('.alert-danger').fadeIn('slow', function(){
		setTimeout("$('.alert-danger').fadeOut('slow')", 3000);			
	});
}

function findRatio(perc_mlt_1,perc_mlt_2,quantity_of_1,quantity_of_2,cost_to_convert){
  
	var total_mlt = 0;
  
	var total_amt_1 = 0;
  
	var total_amt_2 = 0;
 
	var this_mlt = 0;

	var i = 0;
  
	while (this_mlt >= 0){
    
		var amt_1 = quantity_of_1 - i * cost_to_convert;
    
		var amt_2 = quantity_of_2 + i;
    
		var mlt_total_1 = amt_1 * perc_mlt_1/100.0 + 1;
    
		var mlt_total_2 = amt_2 * perc_mlt_2/100.0 + 1;
    
		this_mlt = mlt_total_1*mlt_total_2;
    
		if (this_mlt > total_mlt){
      
			total_mlt = this_mlt;
      
			total_amt_1 = amt_1;
      
			total_amt_2 = amt_2;
		}
    
		i++;
	}

	$("#totalmlt").text("total multiplier: "+Math.round(total_mlt * 100) / 100);
	
	$("#totalamt1").text("amount of first: "+total_amt_1);
	
	$("#totalamt2").text("amount of second: "+total_amt_2);
	
	$("#ratio").text("ratio: "+ Math.round(total_amt_1/total_amt_2 * 100) / 100);
	
	
  
	console.log("total_mlt ",total_mlt);
  
	console.log("total_amt_1 ",total_amt_1);
  
	console.log("total_amt_2 ",total_amt_2);
  
	console.log("ratio ",total_amt_1/total_amt_2);
  
    
}

