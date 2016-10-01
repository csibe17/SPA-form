$(function () {
	// Initialize datepicker and set change listener
	$('#birthdaypicker').datetimepicker({
		inline: true,
		viewMode: 'years',
		format: 'YYYY-MM-DD',
		minDate: '1900-01-01',
		maxDate: moment().format('YYYY-MM-DD'),
		defaultDate: '1990-01-01'
	}).on("dp.change", (e) => {
		$('#birthday').val(e.date.format("YYYY-MM-DD"));
	});

	// Initialize input field with the init value
	$('#birthday').val($('#birthdaypicker').data("DateTimePicker").date().format("YYYY-MM-DD"));
});


var autoComplete = (function(){
	// private number to keep the currently selected item by keyboard
	var selectedLi=-1;
	return (event, value) => {
		if(event.keyCode==38 || event.keyCode==40){
			switch (event.keyCode) {
				// down arrow
				case 40:
					selectedLi+=1;
					$('#occupationsList li.selected').removeClass('selected');
					$(`#occupationsList li:visible:eq(${selectedLi})`).addClass('selected');
					break;
				// up arrow
				case 38:
					selectedLi-=1;
					$('#occupationsList li.selected').removeClass('selected');
					$(`#occupationsList li:visible:eq(${selectedLi})`).addClass('selected');
					break;
			}
		}
		// if enter key is pressed
		else if(event.keyCode==13){
			selectedLi=-1;
			var currentSel=$('#occupationsList li.selected');
			if(currentSel.length){
				value=currentSel.removeClass('selected').text();
			}
			$('#occupationsList').parent().removeClass('open');
		}
		// every other key is pressed
		else{
			selectedLi=-1;
			$('#occupationsList li.selected').removeClass('selected');
			$('#occupationsList').parent().addClass('open');
			$('#occupationsList li').each(function(){
				if(!$(this).first().text().toLowerCase().includes(value.toLowerCase())){
					$(this).hide();
				}
				else{
					$(this).show();
				}
			});
		}		

		//returning value will be the new value of the input field
		return value;
	}
})();
