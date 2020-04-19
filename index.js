let userData = localStorage.getItem('userData') == undefined?null: JSON.parse(localStorage.getItem('userData'));

let content;
let leftPanel;
let mode = 'training';
let switchMode;
let checkboxPanelButton;
let checkboxMode;

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
            {eng:'elephant',ru:'слдон'},
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

let stats = [
	{name: 'one', numUse: 0, numErrors:0},
];



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


	content = document.createElement("main");
	content.id = 'content';
	
	leftPanel = document.createElement("nav");
	leftPanel.className = 'leftPanel';
	leftPanel.id = 'leftPanel';
    let mainMenuLink = document.createElement("div");
    mainMenuLink.id = 'mainMenu';
    mainMenuLink.className = 'leftPanel__line';
    mainMenuLink.innerText = 'menu';
    leftPanel.appendChild(mainMenuLink);

    wordsArray.forEach(function (el) {
        let link = document.createElement("div");
        link.className = 'leftPanel__line';
        link.id = el.name;
        link.innerText = el.name;
        leftPanel.appendChild(link);

        let contentCategory = document.createElement("div");
        contentCategory.className = 'content__categories';
        contentCategory.id = el.name;
        contentCategory.innerHTML = `
        <img src="src/categories/${el.name}/categoryImage.jpg">
        ${el.name}`
        ;
        content.appendChild(contentCategory);
    });

    body.appendChild(header);
    body.appendChild(content);
    body.appendChild(leftPanel);



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

        if (checkboxMode.checked) {
            leftPanel.classList.add('leftPanelGameMode');

        }
        else{
            leftPanel.classList.remove('leftPanelGameMode');

        }
    });
}