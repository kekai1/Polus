const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results, ochki)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Массив с возможными результатами
		this.ochki = ochki;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

        for(var i = 0; i < this.questions.length; ++i)
        {
            if(this.ochki[i]==22)
            {
                this.ochki[i] = value;
                break;
            }
        }

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{

					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


    Check_result(ochki)
    {
       var answerText = "";
       var fizika_math=0, himiya_biolog=0, radiotech_electr=0, mechanica_konstr=0, geograpf_geolog=0;
       var history_politics=0, pedagogica_medicina=0, predprinim_domovodstvo=0, sport_voenniy=0, litra_isskustvo=0;
       for(var i = 0; i < this.ochki.length; ++i)
       {
            if(this.ochki[i]==5)
            {
                if(i==0 || i==10 || i==20 || i==30 || i==40){ fizika_math+=1; }
                if(i==1 || i==11 || i==21 || i==31 || i==41){ himiya_biolog+=1; }
                if(i==2 || i==12 || i==22 || i==32 || i==42){ radiotech_electr+=1; }
                if(i==3 || i==13 || i==23 || i==33 || i==43){ mechanica_konstr+=1; }
                if(i==4 || i==14 || i==24 || i==34 || i==44){ geograpf_geolog+=1; }
                if(i==5 || i==15 || i==25 || i==35 || i==45){ litra_isskustvo+=1; }
                if(i==6 || i==16 || i==26 || i==36 || i==46){ history_politics+=1; }
                if(i==7 || i==17 || i==27 || i==37 || i==47){ pedagogica_medicina+=1; }
                if(i==8 || i==18 || i==28 || i==38 || i==48){ predprinim_domovodstvo+=1; }
                if(i==9 || i==19 || i==29 || i==39 || i==49){ sport_voenniy+=1; }
            }



        }
         var ans_fizika_math='', ans_himiya_biolog='', ans_radiotech_electr='', ans_mechanica_konstr='', ans_geograpf_geolog='';
         var ans_history_politics='', ans_pedagogica_medicina='', ans_predprinim_domovodstvo='', ans_sport_voenniy='', ans_litra_isskustvo='', ans_all;
         ans_fizika_math+="    Склонность к физике и математике: " + fizika_math + "/10";
         ans_himiya_biolog+="\n    Склонность к химии и биологии: " + himiya_biolog + "/10";
         ans_radiotech_electr+="\n    Склонность к радиотехнике и электронике: " + radiotech_electr + "/10";
         ans_mechanica_konstr+="\n    Склонность к механике и конструированию: " + mechanica_konstr + "/10";
         ans_geograpf_geolog+="\n    Склонность к географии и геологии: " + geograpf_geolog + "/10";
         ans_history_politics+="\n    Склонность к истории и политике: " + history_politics + "/10";
         ans_pedagogica_medicina+="\n    Склонность к педагогике и медицине: " + pedagogica_medicina + "/10";
         ans_predprinim_domovodstvo+="\n    Склонность к предпринимательству и домоводству: " + predprinim_domovodstvo + "/10";
         ans_sport_voenniy+="\n    Склонность к спорту и военному делу: " + sport_voenniy + "/10";
         ans_litra_isskustvo+="\n    Склонность к литературе и искусству: " + litra_isskustvo + "/10";



        ans_all = ans_fizika_math + ans_himiya_biolog + ans_radiotech_electr + ans_mechanica_konstr + ans_geograpf_geolog + ans_history_politics + ans_pedagogica_medicina + ans_predprinim_domovodstvo + ans_sport_voenniy + ans_litra_isskustvo;
        document.getElementById('result').value = ans_all;

    }
	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		if(this.current >= this.questions.length)
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
}

//Класс, представляющий вопрос
class Question
{
	constructor(text, answers)
	{
		this.text = text;
		this.answers = answers;
	}

	Click(index)
	{
		return this.answers[index].value;
	}
}

//Класс, представляющий ответ
class Answer
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}
}

//Класс, представляющий результат
class Result
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

//Массив с результатами
const results =
[
	new Result("", 0),
	new Result("", 50),
	new Result("", 100)
];


//Массив для заполнения
const ochki  =
[
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,

]
//Массив с вопросами
const questions =
[
	new Question("Узнавать об открытиях в области физики и математики.",
    [
        new Answer("мне нравится", 5),
        new Answer("не нравится", 0),
    ]),

	new Question("Смотреть передачи о жизни растений и животных.",
   [
       new Answer("мне нравится ", 5),
       new Answer("не нравится", 0),
   ]),

    new Question("Выяснять устройство электроприборов.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Читать научно-популярные технические журналы.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Смотреть передачи о жизни людей в разных странах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Бывать на выставках, концертах, спектаклях.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Обсуждать и анализировать события в стране и за рубежом.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Наблюдать за работой медсестры, врача.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Создавать уют и порядок в доме, классе, школе.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Читать книги и смотреть фильмы о войнах и сражениях. ",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Заниматься математическими расчетами и вычислениями.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Узнавать об открытиях в области химии и биологии.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Ремонтировать бытовые электроприборы.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Посещать технические выставки, знакомиться с достижениями науки и техники.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Ходить в походы, бывать в новых неизведанных местах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Читать отзывы и статьи о книгах, фильмах, концертах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в общественной жизни школы, города.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Объяснять одноклассникам учебный материал.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Самостоятельно выполнять работу по хозяйству.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Соблюдать режим, вести здоровый образ жизни.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Проводить опыты по физике.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Ухаживать за животными растениями.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Читать статьи об электронике и радиотехнике.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Собирать и ремонтировать часы, замки, велосипеды. ",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Коллекционировать камни, минералы.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Вести дневник, сочинять стихи и рассказы.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Читать биографии известных политиков, книги по истории.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Играть с детьми, помогать делать уроки младшим.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Закупать продукты для дома, вести учет расходов.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в военных играх, походах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Заниматься физикой и математикой сверх школьной программы.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Замечать и объяснять природные явления.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Собирать и ремонтировать компьютеры.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Строить чертежи, схемы, графики, в том числе на компьютере.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в географических, геологических экспедициях.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Рассказывать друзьям о прочитанных книгах, увиденных фильмах и спектаклях.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Следить за политической жизнью в стране и за рубежом",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Ухаживать за маленькими детьми или близкими, если они заболели.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Искать и находить способы зарабатывания денег.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Заниматься физической культурой и спортом.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в физико-математических олимпиадах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Выполнять лабораторные опыты по химии и биологии.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Разбираться в принципах работы электроприборов.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Разбираться в принципах работы различных механизмов.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("«Читать» географические и геологические карты.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в спектаклях, концертах.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Изучать политику и экономику других стран.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Изучать причины поведения людей, строение человеческого организма.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Вкладывать заработанные деньги в домашний бюджет.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

    new Question("Участвовать в спортивных соревнованиях.",
       [
           new Answer("мне нравится ", 5),
           new Answer("не нравится", 0),
       ]),

];

//Сам тест
const quiz = new Quiz(2, questions, results, ochki);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length)
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		headElem.innerHTML = '';
		buttonsElem.innerHTML = '';
        pagesElem.innerHTML = '';
		const form = document.getElementById( "submit" );
        form.setAttribute('type', 'Submit');

        quiz.Check_result();
	}
}



function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index)
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct)
		{
			btns[index].className = "button button_wrong";
		}
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
