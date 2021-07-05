const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

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
	new Result("По своей натуре вы более склонны принимать роль исполнителя и подчиненного. Вас тяготит личная ответственность, и вы скорее предпочтете следовать директивам. А может быть, вы способны на большее? Чтобы добиться успеха, почаще вспоминайте мудрый афоризм: «Два сорта людей никогда ничего не добьются: те, кто не умеет выполнять указания, и те, кто умеет только выполнять указания».", 0),
	new Result("Вы обладаете исключительно ценным качеством – умением принимать роль ведущего или ведомого в зависимости от обстоятельств. Уважение к авторитету не мешает вам иметь собственную точку зрения. Для вас найдется место в любом коллективе. Остается только выбрать такое место, которое бы вас устраивало", 50),
	new Result("Вам не занимать инициативы и уверенности в себе. Похоже, сама природа уготовила вам роль вожака, снабдив для этого необходимыми качествами – смелостью, целеустремленностью, твердой волей. Однако у этих достоинств бывает и оборотная сторона – завышенная самооценка, бесцеремонность, неумение считаться с чужими интересами. Вы сумеете добиться немалых успехов, если будете помнить: люди охотно идут за лидерами, но недолюбливают диктаторов. ", 100)
];

//Массив с вопросами
const questions =
[
	new Question("Если некое авторитетное лицо публично высказывает мнение, которое я считаю неверным, я постараюсь, чтобы присутствующие выслушали и мою точку зрения",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)

	]),

	new Question("В детстве меня частенько называли непослушным ребенком",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Убежден(а), что окружающий мир может быть улучшен",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Не люблю, когда друзья и родные пытаются меня опекать, досаждают советами",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("В ситуациях, требующих серьезного решения, я не склонен(а) к долгим колебаниям",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("По-моему, большинство общественно-политических проблем возникает из-за недостаточной твердости ответственных руководителей",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)

	]),

	new Question("Я не смущаюсь, если мне приходится кого-то упрекать",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Если с каким-то делом невозможно справиться одному, то для его выполнения мне нужны помощники, а не советчики",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("В спорах всегда стараюсь оставить за собой последнее слово",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Считаю, что никакой прогресс немыслим без стремления людей к превосходству над другими",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Часто мне приходится брать на себя ответственность, потому что другие недостаточно решительны",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)

	]),

	new Question("Не верю в абсолютное равноправие в супружеских отношениях, в семье предпочел(а) бы быть главой",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Когда в гостях никто не решается взять с блюда последний кусок торта, я спокойно могу это сделать",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("Люблю быть в центре внимания",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	]),

	new Question("В своей карьере готов смириться с ролью подчиненного только как с временной",
	[
		new Answer("да", 10),
		new Answer("нет", 0),
		new Answer("не знаю или не уверен", 5)
	])
];

//Сам тест
const quiz = new Quiz(2, questions, results);

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
        document.getElementById("result").value = quiz.results[quiz.result].text;
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