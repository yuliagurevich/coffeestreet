/* eslint-disable */

const SEND_DATA_TO_SERVER_URI = '';

var request = new XMLHttpRequest();

let articleNames = [];
let articles = [];
let articlesTransactions = [];
let currentArticle = 0;

const remainderParagraph = document.querySelector('#remainder');
const inputParagraph = document.querySelector('#input');
const outputParagraph = document.querySelector('#output');
const typeInput = document.querySelector('#type');
const brandInput = document.querySelector('#brand');
const detailsInput = document.querySelector('#details');
const sizeInput = document.querySelector('#size');
const unitInput = document.querySelector('#unit');
const submitButton = document.querySelector('#submit');
const inputs = document.querySelector('#inputs');

let articleType = '';
let articleBrand = '';
let articleDetails = '';
let articleUnit = unitInput.value;
let articleSize = 0;

submitButton.addEventListener('click', submitGoods);

typeInput.addEventListener('input', outputParagraphUpdate);
brandInput.addEventListener('input', outputParagraphUpdate);
detailsInput.addEventListener('input', outputParagraphUpdate);
sizeInput.addEventListener('input', outputParagraphUpdate);
unitInput.addEventListener('input', outputParagraphUpdate);


function readGoodsNamesFromArray(array) {
  array.forEach(element => {
    let articleName = element['наименование товара'];
    if (articleName != 0) {
      articleNames.push(articleName);
    }
  });
}

function printRemainderParagraph() {
  const articleNums = articleNames.length;
  var count = articleNums - currentArticle;
  if (count > 0) {
    remainderParagraph.textContent = `Осталось товаров: ${count}`;
  } else if (count == 0) {
    remainderParagraph.textContent = 'Спасибо, мы закончили';
  } else {
    remainderParagraph.textContent =
      'Кажется, я где-то забыла обнулить счетчик и мы ушли в минус';
  }
}

function readArticleTransactions(articleName) {
  
  articlesTransactions.forEach(function(article) {

  });
}

function printInputParagraph() {
  if (currentArticle < articleNames.length) {
    let articleName = articleNames[currentArticle];
    inputParagraph.textContent = articleName;
    readArticleTransactions(articleName);
  } else if (currentArticle === articleNames.length) {
    inputParagraph.textContent = 'Товаров больше нет';
  } else {
    inputParagraph.textContent =
      'Кажется, я где-то забыла обнулить счётчик и мы вышли за пределы массива';
  }
}

function getArticlesArray(error, result) {
  fetch('http://coffeestreet.ru/outlay.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(array) {
      readGoodsNamesFromArray(array);
      printRemainderParagraph();
      printInputParagraph();
    });
}

getArticlesArray();

function readTransactionsFromArray(array, goodsName) {
  // Read all the transactions for each goods name
}

function getTransactionsArray(error, result) {
  // Incom array
  fetch('http://coffeestreet.ru/income.json')
    .then(function(response){
      return response.json();
    })
    .then(function(array) {
      readTransactionsFromArray();
    })

  // Outlay array
  fetch('outlay.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(array) {
    readTransactionsFromArray();
  })
}

getTransactionsArray();

function finishInput() {
  inputs.style.display = 'none';
}

function submitArticleSent() {
  if (request.readyState === request.DONE && request.status === 200) {
    console.log(request.responseText);
    currentArticle += 1;

    if (currentArticle === articleNames.length) {
      finishInput();
    } else {
      typeInput.value = '';
      brandInput.value = '';
      detailsInput.value = '';
      unitInput.value = 'мл';
      sizeInput.value = 0;

      articles.push(article);

      printRemainderParagraph();
      printInputParagraph();
    }
  } else {
    console.log('There was a problem sending the article.');
  }
}

function sendArticle(article) {
  request.addEventListener('load', submitArticleSent);
  request.open('POST', SEND_DATA_TO_SERVER_URI);
  // Define the content type
  request.setRequestHeader('Content_Type', 'text/plain');
  request.send(article);
}

function submitArticle() {
  articleType = capitalizeFirstLetter(typeInput.value.trim());
  articleBrand = capitalizeFirstLetter(brandInput.value.trim());
  articleDetails = detailsInput.value.trim();
  articleSize = sizeInput.value.trim();
  articleUnit = unitInput.value;

  var article = {
    article_type: articleType,
    article_brand: articleBrand,
    article_details: articleDetails,
    article_size: articleSize,
    article_unit: articleUnit
  };

  sendArticle(article);
  //readTransactionsFromJson(array);
  //sendTransactions()
}

function outputParagraphUpdate(event) {
  if (event.target === typeInput) {
    articleType = capitalizeFirstLetter(event.target.value.trim());
  } else if (event.target === brandInput) {
    articleBrand = capitalizeFirstLetter(event.target.value.trim());
  } else if (event.target === detailsInput) {
    articleDetails = event.target.value.trim();
  } else if (event.target === unitInput) {
    articleUnit = event.target.value;
  } else if (event.target === sizeInput) {
    articleSize = event.target.value.trim();
  } else {
    console.log('Что-то пошло не так');
  }

  var quatedArticleBrand = '';

  if (articleBrand != '') {
    quatedArticleBrand = quoteWord(articleBrand);
    //articleBrand = unquoteWord(articleBrand);
  }

  outputParagraph.textContent = `${articleType} ${quatedArticleBrand} ${articleDetails} ${
    articleSize == 0 ? '' : articleSize
  } ${articleSize == 0 ? '' : articleUnit}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function quoteWord(string) {
  var quatedString = '';
  if (string[0] != '"') {
    quatedString = `"${string}`;
  }
  if (string[quatedString.length - 1] != '"') {
    quatedString = `${quatedString}"`;
  }
  return quatedString;
}

function unquoteWord(string) {
  var unquatedString = '';
  // Remove all quotes
  return unquatedString;
}
