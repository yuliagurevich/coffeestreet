/* eslint-disable */

let articleNames = [];
let articles = [];
let goodsTransactions = [];
let currentArticle = 0;

const remainderParagraph = document.querySelector("#remainder");
const inputParagraph = document.querySelector("#input");
const outputParagraph = document.querySelector("#output");
const typeInput = document.querySelector("#type");
const brandInput = document.querySelector("#brand");
const miscInput = document.querySelector("#misc");
const sizeInput = document.querySelector("#size");
const unitInput = document.querySelector("#unit");
const submitButton = document.querySelector("#submit");
const inputs = document.querySelector("#inputs");

let articleType = "";
let articleBrand = "";
let articleMisc = "";
let articleUnit = unitInput.value;
let articleSize = 0;

submitButton.addEventListener("click", submitGoods);

typeInput.addEventListener("input", outputParagraphUpdate);
brandInput.addEventListener("input", outputParagraphUpdate);
miscInput.addEventListener("input", outputParagraphUpdate);
sizeInput.addEventListener("input", outputParagraphUpdate);
unitInput.addEventListener("input", outputParagraphUpdate);

function getArray(error, result) {
  fetch("outlay.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(array) {
      readGoodsNamesFromArray(array);
      printRemainderParagraph();
      printInputParagraph();
    });
}

getArray();

function readGoodsNamesFromArray(array) {
  array.forEach(element => {
    let articleName = element["наименование товара"];
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
    remainderParagraph.textContent = "Спасибо, мы закончили";
  } else {
    remainderParagraph.textContent =
      "Кажется, я где-то забыла обнулить счетчик и мы ушли в минус";
  }
}

function printInputParagraph() {
  if (currentArticle < articleNames.length) {
    inputParagraph.textContent = articleNames[currentArticle];
  } else if (currentArticle === articleNames.length) {
    inputParagraph.textContent = "Товаров больше нет";
  } else {
    inputParagraph.textContent =
      "Кажется, я где-то забыла обнулить счётчик и мы вышли за пределы массива";
  }
}

function submitGoods() {
  currentArticle += 1;

  articleType = capitalizeFirstLetter(typeInput.value.trim());
  articleBrand = capitalizeFirstLetter(brandInput.value.trim());
  articleMisc = miscInput.value.trim();
  articleSize = sizeInput.value.trim();
  articleUnit = unitInput.value;

  typeInput.value = "";
  brandInput.value = "";
  miscInput.value = "";
  unitInput.value = "мл";
  sizeInput.value = 0;

  var article = {
    article_type: articleType,
    article_brand: articleBrand,
    article_misc: articleMisc,
    article_size: articleSize,
    article_unit: articleUnit
  };

  articles.push(article);

  //readTransactionsFromJson(array);

  printRemainderParagraph();
  printInputParagraph();

  if (currentArticle === articleNames.length) {
    finishInput();
  }
}

function readTransactionsFromJson(array, goodsName) {
  // Read all the transactions for each goods name
}

function finishInput() {
  inputs.style.display = "none";
}

function outputParagraphUpdate(event) {
  if (event.target === typeInput) {
    articleType = capitalizeFirstLetter(event.target.value.trim());
  } else if (event.target === brandInput) {
    articleBrand = capitalizeFirstLetter(event.target.value.trim());
  } else if (event.target === miscInput) {
    articleMisc = event.target.value.trim();
  } else if (event.target === unitInput) {
    articleUnit = event.target.value;
  } else if (event.target === sizeInput) {
    articleSize = event.target.value.trim();
  } else {
    console.log("Что-то пошло не так");
  }

  var quatedArticleBrand = '';

  if (articleBrand != "") {
    quatedArticleBrand = quoteWord(articleBrand);
    //articleBrand = unquoteWord(articleBrand);
  }

  outputParagraph.textContent = `${articleType} ${quatedArticleBrand} ${articleMisc} ${articleSize == 0 ? '' : articleSize} ${articleSize == 0 ? '' : articleUnit}`;
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
