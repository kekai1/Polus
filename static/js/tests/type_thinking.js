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
       var P_D=0, A_C=0, C_L=0, N_O=0, K=0;
       for(var i = 0; i < this.ochki.length; ++i)
       {
            if(this.ochki[i]==5)
            {
                if(i==0 || i==5 || i==10 || i==15 || i==20 || i==25 || i==30 || i==35){ P_D+=1; }
                if(i==1 || i==6 || i==11 || i==16 || i==21 || i==26 || i==31 || i==36){ A_C+=1; }
                if(i==2 || i==7 || i==12 || i==17 || i==22 || i==27 || i==32 || i==37){ C_L+=1; }
                if(i==3 || i==8 || i==13 || i==18 || i==23 || i==28 || i==33 || i==38){ N_O+=1; }
                if(i==4 || i==9 || i==14 || i==19 || i==24 || i==29 || i==34 || i==39){ K+=1; }
            }



        }
        var ans_P_D =" ",ans_A_C=" ", ans_C_L=" ", ans_N_O=" ", ans_K=" ", ans_all;
        if(P_D < 3)
        {
             ans_P_D+="    Низкий уровень ПРЕДМЕТНО ДЕЙСТВЕННОГО мышления: \n";
        }
        else if(P_D<6)
        {
             ans_P_D+="    Средний уровень ПРЕДМЕТНО ДЕЙСТВЕННОГО мышления: \n";
        }
        else
        {
             ans_P_D+="    Высокий уровень ПРЕДМЕТНО ДЕЙСТВЕННОГО мышления: \n";
        }


        if(A_C < 3)
        {
             ans_A_C+="\n    Низкий уровень АБСТРАКТНО СИМВОЛИЧЕСКОГО мышления: \n";
        }
        else if(A_C<6)
        {
             ans_A_C+="\n    Средний уровень АБСТРАКТНО СИМВОЛИЧЕСКОГО мышления: \n";
        }
        else
        {
             ans_A_C+="\n    Высокий уровень АБСТРАКТНО СИМВОЛИЧЕСКОГО мышления: \n";
        }



        if(C_L < 3)
        {
             ans_C_L+="\n    Низкий уровень СЛОВЕСНО-ЛОГИЧЕСКОГО мышления: \n";
        }
        else if(C_L<6)
        {
             ans_C_L+="\n    Средний уровень СЛОВЕСНО-ЛОГИЧЕСКОГО мышления: \n";
        }
        else
        {
             ans_C_L+="\n    Высокий уровень СЛОВЕСНО-ЛОГИЧЕСКОГО мышления: \n";
        }




        if(N_O < 3)
        {
             ans_N_O+="\n    Низкий уровень НАГЛЯДНО-ОБРАЗНОГО мышления: \n";
        }
        else if(N_O<6)
        {
             ans_N_O+="\n    Средний уровень НАГЛЯДНО-ОБРАЗНОГО мышления: \n";
        }
        else
        {
             ans_N_O+="\n    Высокий уровень НАГЛЯДНО-ОБРАЗНОГО мышления: \n";
        }



        if(K < 3)
        {
             ans_K+="\n    Низкий уровень КРЕАТИВНОСТИ: \n";
        }
        else if(K<6)
        {
             ans_K+="\n    Средний уровень КРЕАТИВНОСТИ: \n";
        }
        else
        {
             ans_K+="\n    Высокий уровень КРЕАТИВНОСТИ: \n";
        }

                                            ans_P_D +='свойственно людям дела. Они усваивают информацию через движения. Обычно они обладают хорошей координацией движений.\nИх руками создан весь окружающий нас предметный мир. Они водят машины, стоят у станков, собирают компьютеры.\nБез них невозможно реализовать самую блестящую идею. Этим мышление важно для спортсменов, танцоров, артистов.';
                                            ans_A_C +='обладают многие ученые – физики-теоретики, математики, экономисты, программисты, аналитики. Они могут усваивать\nинформацию с помощью математических кодов, формул и операций, которые нельзя ни потрогать, ни представить. Благодаря\nособенностям такого мышления на основе гипотез сделаны многие открытия во всех областях науки.';
                                            ans_C_L +='отличает людей с ярко выраженным вербальным интеллектом. Благодаря развитому словесно-логическому мышлению ученый,\nпреподаватель, переводчик, писатель, филолог, журналист могут сформулировать свои мысли и донести их до людей. Это\nумение необходимо руководителям, политикам и общественным деятелям.';
                                            ans_N_O +='обладают люди с художественным складом ума, которые могут представить и то, что было, и то, что будет, и то, чего\nникогда не было и не будет – художники, поэты, писатели, режиссеры. Архитектор, конструктор, дизайнер, художник,\nрежиссер должны обладать развитым наглядно-образным мышлением.';
                                              ans_K +='это способность мыслить творчески, находить нестандартные решения задачи. Это редкое и ничем не заменимое качество,\nотличающее людей, талантливых в любой сфере деятельности.';


        ans_all = ans_P_D + ans_A_C + ans_C_L + ans_N_O + ans_K;
                                            ans_all += '\n\n    В чистом виде эти типы мышления встречаются редко. Для многих профессий необходимо сочетание разных типов мышления,\nнапример, для психолога. Такое мышление называют синтетическим. Соотнесите свой ведущий тип мышления с выбранным\nвидом деятельности или профилем обучения. Ярко выраженный тип мышления дает некоторые преимущества в освоении\nсоответствующих видов деятельности. Но важнее всего ваши способности и интерес к будущей профессии. Насколько удачен\nваш выбор? Если ваши профессиональные планы не вполне соответствуют типу мышления, подумайте, что легче изменить\n– планы или тип мышления?';
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

]
//Массив с вопросами
const questions =
[
	new Question("Мне легче что-либо сделать самому, чем объяснить другому.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне интересно составлять компьютерные программы.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я люблю читать книги.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне нравится живопись, скульптура, архитектура.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Даже в отлаженном деле я стараюсь что-то улучшить",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я лучше понимаю, если мне объясняют на предметах или рисунках.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я люблю играть в шахматы.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я легко излагаю свои мысли как в устной, так и в письменной форме.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Когда я читаю книгу, я четко вижу ее героев и описываемые события.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я предпочитаю самостоятельно планировать свою работу.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

	new Question("Мне нравится все делать своими руками.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("В детстве я создавал (а) свой шифр для переписки с друзьями.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я придаю большое значение сказанному слову.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Знакомые мелодии вызывают у меня в голове определенные картины.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Разнообразные увлечения делают жизнь человека богаче и ярче.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("При решении задачи мне легче идти методом проб и ошибок.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне интересно разбираться в природе физических явлений.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне интересна работа ведущего теле-радиопрограмм, журналиста.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне легко представить предмет или животное, которых нет в природе.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне больше нравится процесс деятельности, чем сам результат.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

	new Question("Мне нравилось в детстве собирать конструктор из деталей, лего.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я предпочитаю точные науки (математику, физику).",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Меня восхищает точность и глубина некоторых стихов.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Знакомый запах   вызывает в моей памяти прошлые события.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я не хотел (а) бы подчинять свою жизнь определенной системе.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Когда я слышу музыку, мне хочется танцевать.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я понимаю красоту математических формул.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне легко говорить перед любой аудиторией.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я люблю посещать выставки, спектакли, концерты.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я сомневаюсь даже в том, что для других очевидно.	",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

	new Question("Я люблю заниматься рукоделием, что-то мастерить.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Мне интересно было бы расшифровать древние тексты.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я легко усваиваю грамматические конструкции языка.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Красота для меня важнее, чем польза.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Не люблю ходить одним и тем же путем.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Истинно только то, что можно потрогать руками.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я легко запоминаю формулы, символы, условные обозначения.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Друзья любят слушать, когда я им что-то рассказываю.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я легко могу представить в образах содержание рассказа или фильма.",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
    ]),

    new Question("Я не могу успокоиться, пока не доведу свою работу до совершенства. ",
    [
        new Answer("да", 5),
        new Answer("нет", 10),
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
