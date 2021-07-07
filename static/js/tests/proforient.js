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
       var score=0, priroda=0, tehnica=0, chelovek=0, znak=0, hudoz=0;
       for(var i = 0; i < this.ochki.length; ++i)
       {
            if(this.ochki[i]==5)
            {
                if(i==0){ priroda+=1; }
                if(i==1){ chelovek+=1; }
                if(i==2){ hudoz+=1; }
                if(i==3){ tehnica+=1; }
                if(i==4){ znak+=1; }
                if(i==5){ priroda+=1; }
                if(i==6){ hudoz+=1; }
                if(i==7){ chelovek+=1; }
                if(i==8){ tehnica+=1; }
                if(i==9){ priroda+=1; }
                if(i==10){ priroda+=1; }
                if(i==11){ chelovek+=1; }
                if(i==12){ hudoz+=1; }
                if(i==13){ tehnica+=1; }
                if(i==14){ znak+=1; }
                if(i==15){ priroda+=1; }
                if(i==16){ hudoz+=1; }
                if(i==17){ chelovek+=1; }
                if(i==18){ tehnica+=1; }
                if(i==19){ priroda+=1; }
            }
            if(this.ochki[i]==10)
            {
                if(i==0){ tehnica+=1; }
                if(i==1){ znak+=1; }
                if(i==2){ priroda+=1; }
                if(i==3){ chelovek+=1; }
                if(i==4){ hudoz+=1; }
                if(i==5){ chelovek+=1; }
                if(i==6){ tehnica+=1; }
                if(i==7){ hudoz+=1; }
                if(i==8){ znak+=1; }
                if(i==9){ znak+=1; }
                if(i==10){ tehnica+=1; }
                if(i==11){ znak+=1; }
                if(i==12){ priroda+=1; }
                if(i==13){ chelovek+=1; }
                if(i==14){ hudoz+=1; }
                if(i==15){ chelovek+=1; }
                if(i==16){ tehnica+=1; }
                if(i==17){ hudoz+=1; }
                if(i==18){ znak+=1; }
                if(i==19){ znak+=1; }
            }
        }

        score = Math.max(priroda, tehnica, chelovek, znak, hudoz);
        if(score == priroda)
        {
            answerText="    Человек — природа. Сюда входят профессии, в которых человек имеет дело с различными явлениями неживой и\nживой природы, например биолог, географ, геолог, математик, физик, химик и другие профессии, относящиеся к разряду\nестественных наук.";
            ddocument.getElementById('result').value = answerText;
         }
        else if(score == tehnica)
        {
            answerText="    Человек — техника. В эту группу профессий включены различные виды трудовой деятельности, в которых человек\nимеет дело с техникой, её использованием или конструированием, например профессия инженера, оператора, машиниста,\nмеханизатора, сварщика и т.п";
            document.getElementById('result').value = answerText;
         }
        else if(score == chelovek)
        {
            answerText="    Человек — человек. Сюда включены все виды профессий, предполагающих взаимодействие людей, например политика,\nрелигия, педагогика, психология, медицина, торговля, право. ";
            document.getElementById('result').value = answerText;
        }
        else if(score == znak)
        {
            answerText="    Человек — знаковая система. В эту группу включены профессии, касающиеся создания, изучения и использования\nразличных знаковых систем, например лингвистика, языки математического программирования, способы графического\nпредставления результатов наблюдений и т.п. ";
            document.getElementById('result').value = answerText;

         }
        else if(score == hudoz)
        {
            answerText="    Человек — художественный образ. Эта группа профессий представляет собой различные виды художественно-творческого\nтруда, например литература, музыка, театр, изобразительное искусство.";
            document.getElementById('result').value = answerText;
        }
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
    22
]
//Массив с вопросами
const questions =
[
	new Question("Мне нравится",
    [
        new Answer("Ухаживать за животными", 5),
        new Answer("Обслуживать машины, приборы (следить, регулировать)", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Помогать больным людям, лечить их", 5),
        new Answer("Составлять таблицы, схемы, программы вычислительных машин", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Следить за качеством книжных иллюстраций, плакатов, художественных открыток, грампластинок", 5),
        new Answer("Следить за состоянием, развитием растений", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Обрабатывать материалы (дерево, ткань, пластмассу и т.д.)", 5),
        new Answer("Доводить товары до потребителя (рекламировать, продавать)", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Обсуждать научно-популярные книги, статьи", 5),
        new Answer("Обсуждать художественные книг", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Выращивать молодняк животных какой-либо породы", 5),
        new Answer("Тренировать сверстников (или младших) в выполнении каких-либо действий (трудовых, учебных, спортивных", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Копировать рисунки, изображения, настраивать музыкальные инструменты", 5),
        new Answer("Управлять каким-либо грузовым, подъёмным, транс портным средством (подъёмным краном, машиной и т.п.)", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Сообщать, разъяснять людям нужные для них сведения в справочном бюро, во время экскурсии и т.д.", 5),
        new Answer("Художественно оформлять выставки, витрины, участвовать в подготовке концертов, пьес и т.п.", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Ремонтировать изделия, вещи (одежду, технику), жилище", 5),
        new Answer("Искать и исправлять ошибки в текстах, таблицах, рисунках", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Лечить животных", 5),
        new Answer("Выполнять расчёты, вычисления", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Выводить новые сорта растений", 5),
        new Answer("Конструировать новые виды промышленных изделий (машины, одежду, дома и т.д.)", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Разбирать споры, ссоры между людьми, поощрять, наказывать", 5),
        new Answer("Разбираться в чертежах, схемах, таблицах, (проверять, уточнять, приводить в порядок)", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Наблюдать, изучать работу кружков художественной самодеятельности", 5),
        new Answer("Наблюдать, изучать жизнь микробов", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Обслуживать, налаживать медицинские приборы и аппараты", 5),
        new Answer("Оказывать людям медицинскую помощь при ранениях, ушибах, ожогах и т.п.", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Составлять точные описания, отчёты о наблюдаемых явлениях, событиях, измеряемых объектах и др.", 5),
        new Answer("Художественно описывать, изображать события наблюдаемые или представляемые", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Делать лабораторные анализы в больнице", 5),
        new Answer("Принимать, осматривать больных, беседовать с ними, назначать лечение", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Красить или расписывать стены помещений, поверхность изделий", 5),
        new Answer("Осуществлять монтаж здания или сборку машин, приборов", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Организовывать культ походы людей в театры, музеи, на экскурсии, в туристические путешествия и т.п.", 5),
        new Answer("Играть на сцене, принимать участие в концертах", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Изготовлять по чертежам детали, изделия (машины, одежду), строить здания", 5),
        new Answer("Заниматься черчением, копировать карты, чертежи", 10),

    ]),
    new Question("Мне нравится",
    [
        new Answer("Вести борьбу с болезнями растений, с вредителями леса, сада", 5),
        new Answer("Работать на машинах (пишущая машина, компьютер, телетайп, телефакс)", 10),

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
