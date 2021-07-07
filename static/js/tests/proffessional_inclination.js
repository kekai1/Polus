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
       var rabota_ludi=0, issledovanya=0, prakt_deyat=0, estetik=0, ekstrim=0, plan=0;
       for(var i = 0; i < this.ochki.length; ++i)
       {
            if(this.ochki[i]==5)
            {
                if(i==0 || i==2 || i==4 || i==5 || i==7 || i==10 || i==12 || i==14 || i==15 || i==17 || i==19 || i==23){ rabota_ludi+=1; }
                if(i==1 || i==6 || i==8 || i==13 || i==20 || i==21 || i==22){ issledovanya+=1; }
                if(i==3 || i==11 || i==18 ){ prakt_deyat+=1; }
                if(i==9 || i==16 ){ estetik+=1; }
            }

            if(this.ochki[i]==10)
            {
                if(i==2 || i==4 || i==5 || i==10 || i==17 ){ issledovanya+=1; }
                if(i==6 || i==14 || i==15 || i==19 || i==20 || i==21){ prakt_deyat+=1; }
                if(i==0 || i==1 || i==8 || i==11 || i==13 ){ estetik+=1; }
                if(i==3 || i==7 || i==9 || i==12 || i==16 || i==18 || i==23 ){ ekstrim+=1; }
            }

            if(this.ochki[i]==15)
            {
                if(i==4 || i==10 || i==17){ prakt_deyat+=1; }
                if(i==2 || i==6 || i==20 || i==21){ estetik+=1; }
                if(i==1 || i==8 || i==11 || i==13 || i==14 ){ ekstrim+=1; }
                if(i==0 || i==3 || i==5 || i==7 || i==9 || i==12 || i==15 || i==16 || i==18 || i==19 || i==22 || i == 23){ plan+=1; }
            }
        }

        var ans_rabota_ludi="", ans_issledovanya=" ", ans_prakt_deyat=" ", ans_estetik=" ", ans_ekstrim=" ", ans_plan=" ", ans_all;
         ans_rabota_ludi="    Склонность К РАБОТЕ С ЛЮДЬМИ: Профессии, связанные с управлением, обучением, воспитанием, обслуживанием\n(бытовым, медицинским, справочно-информационным). Людей, успешных в профессиях этой группы, отличает общительность,\nспособность находить общий язык с разными людьми, понимать их настроение, намерения.\n";
        ans_issledovanya="    Склонность к ИССЛЕДОВАТЕЛЬСКОЙ (ИНТЕЛЛЕКТУАЛЬНОЙ) РАБОТЕ. Профессии, связанные с научной деятельностью. Кроме\nспециальных знаний такие люди обычно отличаются рациональностью, независимостью суждений, аналитическим складом ума.\n";
         ans_prakt_deyat="    Склонность к ПРАКТИЧЕСКОЙ ДЕЯТЕЛЬНОСТИ. Круг этих профессий очень широк: производство и обработка металла;\nсборка, монтаж приборов и механизмов; ремонт, наладка, обслуживание электронного и механического оборудования;\nмонтаж, ремонт зданий, конструкций; управление транспортом; изготовление изделий.\n";
             ans_estetik="    Склонность к ЭСТЕТИЧЕСКИМ ВИДАМ ДЕЯТЕЛЬНОСТИ. Профессии творческого характера, связанные с изобразительной,\nмузыкальной, литературно-художественной, актерско-сценической деятельностью. Людей творческих профессий кроме\nспециальных способностей (музыкальных, литературных, актерских) отличает оригинальность и независимость.\n";
             ans_ekstrim="    Склонность к ЭКСТРЕМАЛЬНЫМ ВИДАМ ДЕЯТЕЛЬНОСТИ. Профессии, связанные с занятиями спортом, путешествиями,\nэкспедиционной работой, охранной и оперативно-розыскной деятельности, службой в армии. Все они предъявляют особые\nтребования к физической подготовке, здоровью, волевым качествам.\n";
                ans_plan="    Склонность к ПЛАНОВО-ЭКОНОМИЧЕСКИМ ВИДАМ ДЕЯТЕЛЬНОСТИ. Профессии, связанные с расчетами и планированием\n(бухгалтер, экономист); делопроизводством, анализом текстов и их преобразованием (редактор, переводчик, лингвист);\nсхематическим изображением объектов (чертежник, топограф). Эти профессии требуют от человека собранности\nи аккуратности.\n";




        if(plan < 4)
        {
             ans_plan+= "Профессиональная склонность не выражена.\n\n";
        }
        else if(plan>3 || plan<7)
        {
             ans_plan+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(plan>6 || plan<10)
        {
             ans_plan+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_plan+="Ярко выраженная профессиональная склонность.\n\n";
        }



        if(ekstrim < 4)
        {
             ans_ekstrim+="Профессиональная склонность не выражена.\n\n";
        }
        else if(ekstrim > 3 || ekstrim < 7)
        {
             ans_ekstrim+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(ekstrim > 6 || ekstrim<10)
        {
             ans_ekstrim+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_ekstrim+="Ярко выраженная профессиональная склонность.\n\n";
        }



        if(estetik < 4)
        {
             ans_estetik+="Профессиональная склонность не выражена.\n\n";
        }
        else if(estetik> 3 || estetik<7)
        {
             ans_estetik+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(estetik > 6 || estetik<10)
        {
             ans_estetik+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_estetik+="Ярко выраженная профессиональная склонность.\n\n";
        }




        if(prakt_deyat < 4)
        {
             ans_prakt_deyat+="Профессиональная склонность не выражена.\n\n";
        }
        else if(prakt_deyat>3 || prakt_deyat<7)
        {
             ans_prakt_deyat+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(prakt_deyat>6 || prakt_deyat<10)
        {
             ans_prakt_deyat+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_prakt_deyat+="Ярко выраженная профессиональная склонность.\n\n";
        }


        if(issledovanya < 4)
        {
             ans_issledovanya+="Профессиональная склонность не выражена.\n\n";
        }
        else if(issledovanya>3 || issledovanya<7)
        {
             ans_issledovanya+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(issledovanya>6 || issledovanya<10)
        {
             ans_issledovanya+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_issledovanya+="Ярко выраженная профессиональная склонность.\n\n";
        }


        if(rabota_ludi < 4)
        {
             ans_rabota_ludi+="Профессиональная склонность не выражена.\n\n";
        }
        else if(ans_rabota_ludi> 3 || rabota_ludi<7)
        {
             ans_rabota_ludi+="Слабо выраженная профессиональная склонность.\n\n";
        }
        else if(ans_rabota_ludi>6 || rabota_ludi<10)
        {
             ans_rabota_ludi+="Присутствует склонность к этому виду деятельности.\n\n";
        }
        else
        {
             ans_rabota_ludi+="Ярко выраженная профессиональная склонность.\n\n";
        }


        ans_all = ans_rabota_ludi + ans_issledovanya + ans_prakt_deyat + ans_estetik + ans_ekstrim + ans_plan;
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
]
//Массив с вопросами
const questions =
[
	new Question("Мне хотелось бы в своей профессиональной деятельности",
    [
        new Answer("общаться с самыми разными людьми", 5),
        new Answer("снимать фильмы, писать книги, рисовать, выступать на сцене и т.д.", 10),
        new Answer("заниматься расчетами; вести документацию", 15),
    ]),

	new Question("В книге или кинофильме меня больше всего привлекает",
    [
        new Answer("возможность следить за ходом мыслей автора", 5),
        new Answer("художественная форма, мастерство писателя или режиссера", 10),
        new Answer("сюжет, действия героев", 15),
    ]),

	new Question("Меня больше обрадует Нобелевская премия",
    [
        new Answer("за общественную деятельност", 5),
        new Answer("в области науки", 10),
        new Answer("в области искусства", 15),
    ]),


	new Question("Я скорее соглашусь стать",
    [
        new Answer("главным механиком", 5),
        new Answer("начальником экспедиции", 10),
        new Answer("главным бухгалтером", 15),
    ]),


	new Question("Будущее людей определяют",
    [
        new Answer("взаимопонимание между людьми", 5),
        new Answer("научные открытия", 10),
        new Answer("развитие производства", 15),
    ]),


	new Question("Если я стану руководителем, то в первую очередь займусь",
    [
        new Answer("созданием дружного, сплоченного коллектива", 5),
        new Answer("разработкой новых технологий обучения", 10),
        new Answer("работой с документами", 15),
    ]),


	new Question("На технической выставке меня больше привлечет",
    [
        new Answer("внутреннее устройство экспонатов", 5),
        new Answer("их практическое применение", 10),
        new Answer("внешний вид экспонатов (цвет, форма)", 15),
    ]),


	new Question("В людях я ценю, прежде всего",
    [
        new Answer("дружелюбие и отзывчивость", 5),
        new Answer("смелость и выносливость", 10),
        new Answer("обязательность и аккуратность", 15),
    ]),


	new Question("В свободное время мне хотелось бы",
    [
        new Answer("ставить различные опыты, эксперименты", 5),
        new Answer("писать стихи, сочинять музыку или рисовать", 10),
        new Answer("тренироваться", 15),
    ]),


	new Question("В заграничных поездках меня скорее заинтересует",
    [
        new Answer("возможность знакомства с историей и культурой другой страны", 5),
        new Answer("экстремальный туризм (альпинизм, виндсерфинг, горные лыжи)", 10),
        new Answer("деловое общение", 15),
    ]),


	new Question("Мне интереснее беседовать о",
    [
        new Answer("человеческих взаимоотношениях", 5),
        new Answer("новой научной гипотезе", 10),
        new Answer("технических характеристиках новой модели машины, компьютера", 15),
    ]),


	new Question("Если бы в моей школе было всего три кружка, я бы выбрал (а)",
    [
        new Answer("технический", 5),
        new Answer("музыкальный", 10),
        new Answer("спортивный", 15),
    ]),


	new Question("В школе следует обратить особое внимание на",
    [
        new Answer("улучшение взаимопонимания между учителями и учениками", 5),
        new Answer("поддержание здоровья учащихся, занятия спортом", 10),
        new Answer("укрепление дисциплины", 15),
    ]),


	new Question("Я с большим удовольствием смотрю",
    [
        new Answer("научно-популярные фильмы", 5),
        new Answer("программы о культуре и искусстве", 10),
        new Answer("спортивные программы", 15),
    ]),


	new Question("Мне хотелось бы работать",
    [
        new Answer("с детьми или сверстниками", 5),
        new Answer("с машинами, механизмами", 10),
        new Answer("с объектами природы", 15),
    ]),


	new Question("Школа в первую очередь должна",
    [
        new Answer("учить общению с другими людьми", 5),
        new Answer("давать знания", 10),
        new Answer("обучать навыкам работы", 15),
    ]),


	new Question("Главное в жизни",
    [
        new Answer("иметь возможность заниматься творчеством", 5),
        new Answer("вести здоровый образ жизни", 10),
        new Answer("тщательно планировать свои дела", 15),
    ]),


	new Question("Государство должно в первую очередь заботиться о",
    [
        new Answer("защите интересов и прав граждан", 5),
        new Answer("достижениях в области науки и техники", 10),
        new Answer("материальном благополучии граждан", 15),
    ]),


	new Question("Мне больше всего нравятся уроки",
    [
        new Answer("труда", 5),
        new Answer("физкультуры", 10),
        new Answer("математики", 15),
    ]),


	new Question("Мне интереснее было бы",
    [
        new Answer("заниматься сбытом товаров", 5),
        new Answer("изготавливать изделия", 10),
        new Answer("планировать производство товаров", 15),
    ]),


	new Question("Я предпочитаю читать статьи о",
    [
        new Answer("выдающихся ученых и их открытиях", 5),
        new Answer("интересных изобретениях", 10),
        new Answer("жизни и творчестве писателей, художников, музыкантов", 15),
    ]),


	new Question("В свободное время я люблю",
    [
        new Answer("читать, думать, рассуждать", 5),
        new Answer("что-нибудь мастерить, шить, ухаживать за животными, растениями", 10),
        new Answer("ходить на выставки, концерты, в музеи", 15),
    ]),


	new Question("Больший интерес у меня вызовет сообщение о",
    [
        new Answer("научном открытии", 5),
        new Answer("художественной выставке", 10),
        new Answer("экономической ситуации", 15),
    ]),


	new Question("Я предпочту работать",
    [
        new Answer("в помещении, где много людей", 5),
        new Answer("в необычных условиях", 10),
        new Answer("в обычном кабинете", 15),
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
