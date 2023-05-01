let caret_position; // holds the position of the carets
const ope_rgx = /[+*-\/]/; // operator regex

function captureButton(btn) {
	console.log(btn.value);
	if (btn.target.innerHTML == "=" || btn.key == "Enter" || btn.key == "=") {
		displayResult();
	}
	else {
		if (btn.type == "click") {
			displayCalculation(btn.target.innerHTML); 
		}
	}
}

function displayCalculation(captured_value) {
	const select_cd = document.getElementById("calculation");
	let temp_arr = [...select_cd.value];
	if (captured_value === "DEL" || captured_value === "CE") {
		if (captured_value === "DEL") {
			if (caret_position === 0) {
				return null;
			}
			else {
				temp_arr.splice(caret_position-1, 1);
				select_cd.value = temp_arr.join("");
				select_cd.selectionStart = caret_position - 1;
				caret_position = select_cd.selectionStart;
			}
		}
		else {
			select_cd.value = "";
		}
	}
	else {
		if (select_cd.value.length === 0 || caret_position === select_cd.value.length-1) {
			const append = function() {
				select_cd.value = select_cd.value + captured_value;
				caret_position = select_cd.value.length-1;
			}
			if (ope_rgx.test(captured_value) && ope_rgx.test(temp_arr[caret_position])) {
				if (captured_value === "-" && temp_arr[caret_position] != "-") {
					append();
					console.log("negative int with on-screen buttons: success");
				}
				return null;
			}
			else {
				append();
			}
		}
		else {
			if (ope_rgx.test(captured_value) && (ope_rgx.test(temp_arr[caret_position]) || ope_rgx.test(temp_arr[caret_position-1]))) {
				if (captured_value === "-" && temp_arr[caret_position-1] != "-" && ope_rgx.test(temp_arr[caret_position]) != true) {
					console.log("negative int with on-screen buttons: success");
				}
				return null;
			}
			else {
				temp_arr.splice(caret_position, 0, captured_value);
				select_cd.value = temp_arr.join("");
				select_cd.selectionStart = caret_position + 1;
				caret_position = select_cd.selectionStart;
			}
		}
	}
}

function displayResult() {
	const select_cd = document.getElementById("calculation");
	const select_rd = document.getElementById("result");
	if (select_cd.value.length > 0 && ope_rgx.test(select_cd.value[select_cd.value.length-1]) === false) {
		try {
			select_rd.innerHTML = `${eval(select_cd.value)}`;
			select_cd.value = eval(select_cd.value);
		}
		catch (error) {
			select_rd.innerHTML = "ERROR!"
		}
	}
	else {
		select_rd.innerHTML = "";
		return null;
	}
}
