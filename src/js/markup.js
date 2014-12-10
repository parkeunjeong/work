$(function() {
	var $select_stand = $('#ecg_ifmt');
	var $select_exc = $('#ecg_ifmt2');
	var $nation_select = $('.nt_slc');
	var $num_input = $('#num');

	var htCurrency  = {
		'KRW' : '원',
		'USD' : '달러',
		'EUR' : '유로',
		'JPY' : '엔',
		'CNY' : '위안',
		'CAD' : '달러',
		'AUD' : '달러',
		'NZD' : '달러'
	};

	var sum;
	var nation;

	// 단위 세팅
	function ex_unit() {
		$nation_select.each(function() {
			nation = $(this).find('option:selected').attr('data-unit');
			sum = $(this).parent().parent().find('.num input').val();
			$(this).parent().parent().find('.nb_txt').text(sum + ' ' + htCurrency[String(nation)]);
		});
	}
	ex_unit();

	// 국가 선택
	$nation_select.on('change', function() {
		nation = $(this).find('option:selected').attr('data-unit');

		var $flagEle = $(this).parent().find('.flag'); // 국기 엘리먼트
		var flagClass = $flagEle.attr('class').toString().split(' '); // 국기 class 변경

		$flagEle.removeClass(flagClass[1]).addClass(nation.toLowerCase()); // 소문자 변환

		$(this).parent().find('.nt_eng').empty().text(nation);

		var select_idx = $(this).index('.nt_slc');
		if (select_idx == 0) {
			sum = $num_input.val();
		}
		else if (select_idx == 1) {
			if ($num_input.val() == 0) {
				sum = 0;
			} else {
				sum = $(this).find('option:selected').attr('value');
			}
		}

		sum_exc();
		ex_unit();
	});

	// 환율 변환
	$num_input.on('change', function() {
		sum_exc();
		ex_unit();
	});

	function sum_exc() {
		sum = $num_input.val();
		var sum_stand = $select_stand.val();
		var sum_exc = $select_exc.val();
		sum_stand = parseFloat(sum_stand.replace(/,/g, '')); // 콤마 삭제
		var sum_exc = $select_exc.val();
		sum_exc = parseFloat(sum_exc.replace(/,/g, '')); // 콤마 삭제

		var total = (sum * sum_stand * sum_exc) / 1000;
		$('#num2').val(total);
	}
});