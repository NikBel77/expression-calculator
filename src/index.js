function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

	//удаляем пробелы
	expr = expr.split(" ").join("")
	let nums = [];
	let nums1 = [];
    let len = 0;
    let openTag = 0;
    let closeTag = 0;

	expr = expr.replace(/\+/g, " + ");
	expr = expr.replace(/\-/g, " - ");
	expr = expr.replace(/\*/g, " * ");
	expr = expr.replace(/\//g, " / ");
	expr = expr.replace(/\(/g, " ( ");
	expr = expr.replace(/\)/g, " ) ");

	nums = expr.split(" ");
	for (let i = 0; i < nums.length; i++) {

		if (nums[i] === "") {

			nums.splice(i, 1);
		}
	}
    //проверка ковычек
    for (let i = 0; i < nums.length; i++) {

        if (nums[i] === "(") {

            openTag += 1;
        }
        else if (nums[i] === ")") {

            closeTag += 1;
        }
    }
    if (openTag !== closeTag) {

        throw("ExpressionError: Brackets must be paired");
    }

	//вычисляем выражение в кавычках
	for (let i = 0; i < nums.length; i++) {
		
		//если найдена закр. ковычка
		if (nums[i] === ")") {
			
			//находим откр. ковычку
			for (j = i; j >= 0; j--) {
				
				//если найдена
				if (nums[j] === "(") {

					nums1 = nums.slice(j, i + 1);
					len = nums1.length;
					
					//вычисляем
					for(let k = 0; k < nums1.length; k++) {

						if (nums1[k] === "*") {

							nums1.splice(k - 1, 3, Number(nums1[k - 1]) * Number(nums1[k + 1]));
							k = 0;
						}
						else if (nums1[k] === "/") {

                            if (nums1[k + 1] === "0") {
                                throw("TypeError: Division by zero.");
                            }
							nums1.splice(k - 1, 3, Number(nums1[k - 1]) / Number(nums1[k + 1]));
							k = 0;
						}
					}
					for(let k = 0; k < nums1.length; k++) {

						if (nums1[k] === "+") {

							nums1.splice(k - 1, 3, Number(nums1[k - 1]) + Number(nums1[k + 1]));
							k = 0;
						}
						else if (nums1[k] === "-") {

							nums1.splice(k - 1, 3, Number(nums1[k - 1]) - Number(nums1[k + 1]));
							k = 0;
						}
					}
					
					//обновляем nums
					nums.splice(j, len, nums1[1]);

					//выходим из цикла, обнуляем i
					i = -1;
					break;

				}
			}
		}
	}
	
	
	//вычисляем без скобок
	for(let i = 0; i < nums.length; i++) {

		if (nums[i] === "*") {

			nums.splice(i - 1, 3, Number(nums[i - 1]) * Number(nums[i + 1]));
			i = 0;
		}
		else if (nums[i] === "/") {

            if (nums[i + 1] === "0") {
                throw("TypeError: Division by zero.");
            }
			nums.splice(i - 1, 3, Number(nums[i - 1]) / Number(nums[i + 1]));
			i = 0;
		}
	}

	for(let i = 0; i < nums.length; i++) {

		if (nums[i] === "+") {

			nums.splice(i - 1, 3, Number(nums[i - 1]) + Number(nums[i + 1]));
			i = 0;
		}
		else if (nums[i] === "-") {

			nums.splice(i - 1, 3, Number(nums[i - 1]) - Number(nums[i + 1]));
			i = 0;
		}
	}


	//возвразаем значение
	return (nums[0])
}

module.exports = {
    expressionCalculator
}