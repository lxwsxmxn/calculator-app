let caret_position = 0; // holds the position of the carets recent position

function captureButton(btn) {
	console.log(btn.value);
	if (btn.target.innerHTML == "=" || btn.key == "Enter" || btn.key == "=") {
		displayResult();
	}
	else {
		if (btn.type == "click") {
			displayCalculation(btn.target.innerHTML); 
		}
		//displayPendingResult(); 
	}
}

function displayCalculation(captured_value) {
	const select_cd = document.getElementById("calculation"); // cd=calculation display
	if (captured_value === "DEL" || captured_value === "CE") {
		return null;
	}
	else {
		if (caret_position === 0) {
			select_cd.value = select_cd.value + captured_value;
		}
		else {
			let temp_arr = [...select_cd.value];
			temp_arr.splice(caret_position, 0, captured_value);
			select_cd.value = temp_arr.join("");
			select_cd.selectionStart = caret_position + 1;
			caret_position = select_cd.selectionStart;
		}
	}
}
/*
function displayPendingResult() {
	const select_cd = document.getElementById("calculation");
	const select_prd = document.getElementById("pending_result"); // prd=pending result display
	const rgx = /\d$/;
	if (rgx.test(select_cd.value)) {
		if (select_cd.value === "") {
			select_prd.innerHTLM = "";
		}
		else {
			select_prd.innerHTML = `${eval(select_cd.value)}`;
		}
	}
}
*/
function displayResult() {
	const select_cd = document.getElementById("calculation");
	const select_rd = document.getElementById("result");
	if (select_cd.value.length > 0) {
		select_rd.innerHTML = `${eval(select_cd.value)}`;
		select_cd.value = eval(select_cd.value);
	}
	else {
		select_rd.innerHTML = "";
		return null;
	}
}
