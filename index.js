let userData = localStorage.getItem('userData') == undefined?{}: JSON.parse(localStorage.getItem('userData'));

let contentMainMenu;
let leftPanel;
let mode = 'train';
let switchMode;
let checkboxPanelButton;
let checkboxMode;
let header;
let categoryOpen;
let categoryContentOpen;
let main;
let playButton;
let isGameStart = false;
let errorsCount = 0;
let selectedCategory = 'mainMenu-nav';
let wordsInGame = [];
let wordInGameNow;
let resultsDom;

let wordsArray = [
	{name: 'numbers', values:[
            {eng:'one',ru:'один'},
            {eng:'two',ru:'два'},
            {eng:'three',ru:'три'},
            {eng:'four',ru:'четыре'},
            {eng:'five',ru:'пять'},
            {eng:'six',ru:'шесть'},
            {eng:'seven',ru:'семь'},
            {eng:'eight',ru:'восемь'},
            {eng:'nine',ru:'девять'},
            {eng:'ten',ru:'десять'}]},
	{name: 'colors', values:[
            {eng:'black',ru:'чёрный'},
            {eng:'blue',ru:'синий'},
            {eng:'brown',ru:'коричневый'},
            {eng:'green',ru:'зелёный'},
            {eng:'orange',ru:'оранжевый'},
            {eng:'purple',ru:'фиолетовый'},
            {eng:'red',ru:'красный'},
            {eng:'yellow',ru:'жёлтый'}]},
	{name: 'body', values:[
            {eng:'arm',ru:'рука'},
            {eng:'ear',ru:'ухо'},
            {eng:'eye',ru:'глаза'},
            {eng:'finger',ru:'палец'},
            {eng:'foot',ru:'нога'},
            {eng:'head',ru:'голова'},
            {eng:'mouth',ru:'рот'},
            {eng:'nose',ru:'нос'}]},
	{name: 'animals', values:[
            {eng:'cat',ru:'кот'},
            {eng:'cow',ru:'корова'},
            {eng:'dog',ru:'пёс'},
            {eng:'elephant',ru:'слон'},
            {eng:'fish',ru:'рыба'},
            {eng:'horse',ru:'лошадь'},
            {eng:'monkey',ru:'обезьяна'},
            {eng:'pig',ru:'свинья'}]},
    {name: 'adverbs', values:[
            {eng:'badly',ru:'плохо'},
            {eng:'cold',ru:'холодно'},
            {eng:'fast',ru:'быстро'},
            {eng:'good',ru:'хорошо'},
            {eng:'hot',ru:'жарко'},
            {eng:'loud',ru:'громко'},
            {eng:'quite',ru:'тихо'},
            {eng:'slow',ru:'медленно'}]},
    {name: 'adjective', values:[
            {eng:'angry',ru:'сердитый'},
            {eng:'bright',ru:'яркий'},
            {eng:'clever',ru:'умный'},
            {eng:'happy',ru:'счастливый'},
            {eng:'hungry',ru:'голодный'},
            {eng:'low',ru:'низкий'},
            {eng:'tall',ru:'высокий'},
            {eng:'tired',ru:'уставший'}]},
    {name: 'noun', values:[
            {eng:'bicycle',ru:'велосипед'},
            {eng:'car',ru:'автомобиль'},
            {eng:'fire',ru:'огонь'},
            {eng:'house',ru:'дом'},
            {eng:'pen',ru:'ручка'},
            {eng:'pencil',ru:'карандаш'},
            {eng:'tree',ru:'дерево'},
            {eng:'water',ru:'вода'}]},
    {name: 'verbs', values:[
            {eng:'build',ru:'строить'},
            {eng:'give',ru:'давать'},
            {eng:'laugh',ru:'смеяться'},
            {eng:'paint',ru:'рисовать'},
            {eng:'run',ru:'бегать'},
            {eng:'sit',ru:'сидеть'},
            {eng:'sleep',ru:'спать'},
            {eng:'take',ru:'брать'}]},
	];

createDocument();

function  createDocument() {
	header = document.createElement("header");
	header.id = 'header';

    header.innerHTML = `
    <div class="panelButton">
        <input type='checkbox' class='checkbox' id='checkboxPanelButton'>
        <div class='panelButton__linesContainer'>
            <div class="panelButton__line" id="leftPanel__line_1"></div>
            <div class="panelButton__line" id="leftPanel__line_2"></div>
            <div class="panelButton__line" id="leftPanel__line_3"></div>
        </div>
    </div>
    <div class='switchMode' id='switchMode'>
        <input type='checkbox' class='checkbox' id='checkboxMode'>
        <div class='knobs'></div>
     </div>
    `;


	main = document.createElement("main");
    contentMainMenu = document.createElement("div");
    contentMainMenu.id = 'contentMainMenu';
    contentMainMenu.className = 'contentMainMenu';

    categoryOpen = document.createElement('div');
    categoryOpen.className = 'categoryOpen';
    categoryOpen.innerHTML = `
        <div class="resultsStars"></div>
        <div class="categoryContentOpen"></div>
        <div class="play-button" id="play-button">Start game</div>
    `;

    resultsDom = document.createElement("div");
    resultsDom.className = 'resultsDom';

    main.appendChild(categoryOpen);
    main.appendChild(contentMainMenu);
    main.appendChild(resultsDom);



	leftPanel = document.createElement("nav");
	leftPanel.className = 'leftPanel';
	leftPanel.id = 'leftPanel';
    let mainMenuLink = document.createElement("div");
    mainMenuLink.id = 'mainMenu-nav';
    mainMenuLink.className = 'leftPanel__line selectedCategory';
    mainMenuLink.innerText = 'menu';
    let statisticLink = document.createElement("div");
    statisticLink.id = 'statistic-nav';
    statisticLink.className = 'leftPanel__line';
    statisticLink.innerText = 'statistic';
    leftPanel.appendChild(mainMenuLink);
    leftPanel.appendChild(statisticLink);

    wordsArray.forEach(function (el) {
        let link = document.createElement("div");
        link.className = 'leftPanel__line';
        link.id = el.name + '-nav';
        link.innerText = el.name;
        leftPanel.appendChild(link);

        let contentCategory = document.createElement("div");
        contentCategory.className = 'content__categories content__categoriesTrainMode';
        contentCategory.id = el.name;
        contentCategory.innerHTML = `
        <img src="src/categories/${el.name}/categoryImage.jpg">
        ${el.name}`
        ;
        contentMainMenu.appendChild(contentCategory);
    });

    let body = document.getElementById('body');
    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(leftPanel);

    categoryContentOpen = document.querySelector('.categoryContentOpen');
    playButton = document.getElementById('play-button');
    checkboxMode =  document.getElementById('checkboxMode');
    checkboxPanelButton =  document.getElementById('checkboxPanelButton');

    checkboxPanelButton.addEventListener("change", function () {
        if (checkboxPanelButton.checked) {
            leftPanel.classList.add('leftPanelOpen');
        }
        else{
            leftPanel.classList.remove('leftPanelOpen');
        }
    });

    checkboxMode.addEventListener("change", function () {
       endGame();

       let categoryContentOpen = document.querySelector('categoryContentOpen');

        if (checkboxMode.checked) {
            mode = 'play';
            leftPanel.classList.add('leftPanelGameMode');
            contentMainMenu.childNodes.forEach(function (child) {
                child.classList.add('content__categoriesGameMode');
                child.classList.remove('content__categoriesTrainMode');
                document.querySelectorAll('.word-container__card_header').forEach(function (el) {
                    el.classList.add('card-header-invisible');
                });
                document.querySelectorAll('.rotate').forEach(function (el) {
                    el.classList.add('rotate-invisible');
                });
                playButton.classList.remove('playButton-invisible');

            });
        } else {
            mode = 'train';
            leftPanel.classList.remove('leftPanelGameMode');
            contentMainMenu.childNodes.forEach(function (child) {
                child.classList.add('content__categoriesTrainMode');
                child.classList.remove('content__categoriesGameMode');

                document.querySelectorAll('.word-container__card_header').forEach(function (el) {
                    el.classList.remove('card-header-invisible');
                });
                document.querySelectorAll('.rotate').forEach(function (el) {
                    el.classList.remove('rotate-invisible');
                });
                playButton.classList.add('playButton-invisible');
            });
        }
    });

    contentMainMenu.addEventListener("click", function (event) {
        let target = event.target;
        if(target.id != 'contentMainMenu'){
            target = target.parentNode.id == 'contentMainMenu'? target:target.parentNode;
            openCategory(target.id);
        }
    });

    leftPanel.addEventListener("click", function (event) {
        let target = event.target;
        if(target.id != 'leftPanel'){
            endGame();
            if(target.id == 'mainMenu-nav'){
                categoryOpen.style.display = 'none';
                resultsDom.style.display = 'none';
                contentMainMenu.style.display = 'flex';
                checkboxPanelButton.checked = 0;
                leftPanel.classList.remove('leftPanelOpen');
                document.getElementById(selectedCategory).classList.remove('selectedCategory');
                selectedCategory = target.id;
                target.classList.add('selectedCategory');
            }
            else if(target.id == 'statistic-nav'){

                document.getElementById(selectedCategory).classList.remove('selectedCategory');
                selectedCategory = target.id;
                target.classList.add('selectedCategory');
                checkboxPanelButton.checked = 0;
                leftPanel.classList.remove('leftPanelOpen');

                categoryOpen.style.display = 'none';
                contentMainMenu.style.display = 'none';
                resultsDom.style.display = 'flex';
                let table = document.createElement('div');
                table.className = 'table';
                resultsDom.innerHTML = '';
                resultsDom.appendChild(table);

                table.innerHTML = `
                <div class="table__string">
                    <div>Слово</div>
                    <div>Изучал</div>
                    <div>Ошибки</div>
                    <div>Успехи</div>
                </div>`;
                for(let element in userData){
                    table.innerHTML +=`
                    <div class="table__string">
                        <div>${userData[element].name}</div>
                        <div>${userData[element].learnCount}</div>                
                        <div>${userData[element].errorsCount}</div>
                        <div>${userData[element].successCount}</div>
                    </div>`;
                }

            }
            else{
                resultsDom.style.display = 'none';
                let str = target.id.replace(/....$/,'');
                openCategory(str);
            }
        }
    });



}

function openCategory(name) {
    endGame();
    document.getElementById(selectedCategory).classList.remove('selectedCategory');
    selectedCategory = name + '-nav';
    document.getElementById(selectedCategory).classList.add('selectedCategory');

    playButton.classList.remove('play-button-in-game');
    checkboxPanelButton.checked = 0;
    leftPanel.classList.remove('leftPanelOpen');
    document.querySelector('.resultsStars').innerHTML = '';
    document.querySelector('.categoryContentOpen').innerHTML = '';
    if(mode == 'train'){
        playButton.classList.add('playButton-invisible');
    }

    wordsArray.forEach(function (el) {
        if(el.name == name){
            for(let i = 0; i < el.values.length; i++){
                let word = el.values[i];
                let wordElement = document.createElement("div");
                wordElement.className = 'word-container';
                wordElement.id = word.eng;
                wordElement.innerHTML = `
                        <div class='word-container__card'>
                            <div class="front" 
                            style='background-image: url("src/categories/${el.name}/${word.eng + '.jpg'}");'>
                                <div class='word-container__card_header ${mode == 'play'?'card-header-invisible':''}'>${word.eng}</div>
                            </div>
                             <div class="back" 
                            style='background-image: url("src/categories/${el.name}/${word.eng + '.jpg'}");'>
                                <div class='word-container__card_header'>${word.ru}</div>
                            </div>
                           
                        </div>                    
                        `;
                let rotateButton = document.createElement("div");
                rotateButton.className = mode == 'play'?'rotate rotate-invisible' : 'rotate';
                wordElement.children[0].appendChild(rotateButton);
                rotateButton.addEventListener("click", function () {
                    setData(word.eng, 'learn');
                    wordElement.children[0].classList.add('card-rotate');
                    wordElement.children[0].onmouseleave = function () {
                        wordElement.children[0].classList.remove('card-rotate');
                    };
                });
                wordElement.addEventListener("click", function (event) {
                    if(event.target.className != 'rotate' && mode == 'train') {
                        audio(`src/categories/${el.name}/${word.eng}.mp3`);
                    }
                    if(isGameStart){
                        checkAnswer(word.eng);
                    }
                });
                categoryContentOpen.appendChild(wordElement);
            }
        }
    });
    categoryOpen.style.display = 'block';
    contentMainMenu.style.display = 'none';
}

playButton.onmousedown = function(){
    playButton.style.boxShadow = '0px 4px 2px 0px rgba(50, 50, 50, 0.72)';
    playButton.onmouseup = function(){
        playButton.style.boxShadow = '0px 4px 12px 0px rgba(50, 50, 50, 0.72)';
    }
}

playButton.addEventListener("click", function () {
    document.querySelector('.resultsStars').innerHTML = '';
    if(!isGameStart){
        isGameStart = true;
        playButton.classList.add('play-button-in-game');
    }
    errorsCount = 0;
    let subArray = [];
    wordsInGame = [];
    let cotegoryName = selectedCategory.replace(/....$/,'');
    wordsArray.forEach(function (el) {
        if(el.name == cotegoryName){
            wordsInGame = wordsInGame.concat(el.values) ;
            while(wordsInGame.length > 0){
                let rand =  Math.floor(Math.random() * (wordsInGame.length));
                subArray.push(wordsInGame[rand]);
                wordsInGame.splice(rand,1);
            }
            wordsInGame = wordsInGame.concat(subArray) ;
        }
    });



    nextWord();
});

function nextWord() {
    if(wordsInGame.length > 0){
        audio(`src/categories/${selectedCategory.replace(/....$/,'')}/${wordsInGame[wordsInGame.length - 1].eng}.mp3`);
        wordInGameNow = wordsInGame[wordsInGame.length - 1].eng;
    }
}

function checkAnswer(answer) {
    let star = document.createElement('div');
    if(answer == wordInGameNow){
        setData(answer, 'success');
        star.className = 'starSuccess';
        wordsInGame.splice(wordsInGame.length-1,1);
        if(wordsInGame.length > 0){
            audio(`src/success.mp3`);
            wordInGameNow = wordsInGame[wordsInGame.length - 1].eng;
            document.getElementById(answer).classList.add('word-container__used');
            setTimeout(nextWord, 1000);
            document.querySelector('.resultsStars').appendChild(star);
        }
        else{
            resultsDom.innerHTML = `
        <div class="resultsDom__text">${errorsCount>0?'Колличество ошибок: ' + errorsCount + '.':'Вы не допустили ни одной ошибки!'}</div>
        <div class="resultsDom__img"><img src="src/${errorsCount>3?'lose':'victory'}.jpg"></div>
        `;
            resultsDom.style.display = 'flex';
            audio(`src/${errorsCount>3?'lose':'win'}.mp3`);
            categoryOpen.style.display = 'none';
            setTimeout(function () {
                categoryOpen.style.display = 'flex';
                endGame();
                resultsDom.style.display = 'none';
            }, 5000);
        }
    }
    else{
        setData(answer, 'error');
        audio(`src/error.mp3`);
        setTimeout(audio(`src/categories/${selectedCategory.replace(/....$/,'')}/${wordsInGame[wordsInGame.length - 1].eng}.mp3`), 1000);
        star.className = 'starLose';
        errorsCount ++;
        document.querySelector('.resultsStars').appendChild(star);
    }

}

function endGame() {
    categoryContentOpen.childNodes.forEach(function (el) {
        el.classList.remove('word-container__used');
    });
    document.querySelector('.resultsStars').innerHTML = '';
    isGameStart = false;
    document.querySelector('.resultsStars').innerHTML = '';
    isGameStart = false;
}

function audio(src) {
    let audio = new Audio();
    audio.src = src;
    audio.autoplay = true;
}

function setData(word, result) {
    if(userData[word] == undefined){
        userData[word] = {name: word, learnCount: 0, successCount: 0, errorsCount: 0};
    }
    if(result == 'success'){
        userData[word].successCount ++;
    }
    else if(result == 'error'){
        userData[word].errorsCount ++;
    }
    else{
        userData[word].learnCount ++;
    }
    localStorage.setItem('userData', JSON.stringify(userData) );
}