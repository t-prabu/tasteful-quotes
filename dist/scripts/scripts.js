// funs

/* init */

"use strict";

var randColors = {
    a: null,
    b: null
};
(function () {
    getUpdateColors(false, setTextFieldColor);
})();
document.querySelector(".js-textarea-input").addEventListener("keyup", function (event) {
    if (this.value.length >= 260) {
        this.value = this.value.slice(0, 260);
        event.preventDefault();
        event.stopPropagation();
    }
    document.querySelector(".js-text-length-count").innerHTML = this.value.length;
    if (this.value.trim().length > 0) {
        document.querySelector('.add-quote-btn').classList.add('active');
        document.title = this.value;
    } else {
        document.querySelector('.add-quote-btn').classList.remove('active');
        document.title = 'tasty quotes';
    }
});
document.querySelector(".js-textarea-input").addEventListener("keydown", function (event) {
    autosizeTextArea(this);
});
document.querySelector(".js-add-quote-btn").addEventListener("click", function (event) {
    addNewQuote();
});
document.querySelector(".js-textarea-input").addEventListener("keydown", function (event) {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode == 13) {
        addNewQuote();
    }
});

document.querySelector(".js-ctrl-btn-help").addEventListener("click", function (event) {
    document.querySelector('.some-messages-wrapper').classList.toggle('active');
});
document.querySelector(".js-some-messages-cls-btn").addEventListener("click", function (event) {
    this.closest('.some-messages-wrapper').classList.toggle('active');
});

document.querySelector('.js-ctrl-btn-night-mood').addEventListener("click", function () {
    document.querySelector('.body-outer-wrapper').classList.toggle('night-mood');
    this.classList.toggle('active');
});
document.querySelector('.js-rand-re-color-btn').addEventListener("click", function () {
    getUpdateColors(true, setTextFieldColor);
});

function autosizeTextArea(elm) {
    var el = elm;
    setTimeout(function () {
        el.style.height = "auto";
        el.style.padding = "0";
        el.style.height = el.scrollHeight + "px";
    }, 0);
}

function getUpdateColors(swap, callBack) {
    if (randColors.a == null && randColors.b == null) {
        axios.get('http://api.creativehandles.com/getRandomColor').then(function (response) {
            // handle success
            randColors.a = response.data;
        })["catch"](function (error) {
            // handle error
            console.log(error);
        }).then(function () {
            callBack();
        });
        axios.get('http://api.creativehandles.com/getRandomColor').then(function (response) {
            // handle success
            randColors.b = response.data;
        })["catch"](function (error) {
            // handle error
            console.log(error);
        }).then(function () {
            // if (callBack) {
            //     callBack();
            // }
        });
    }

    if (swap) {
        var _ref = [randColors.b, null];
        randColors.a = _ref[0];
        randColors.b = _ref[1];

        axios.get('http://api.creativehandles.com/getRandomColor').then(function (response) {
            // handle success
            randColors.b = response.data;
        })["catch"](function (error) {
            // handle error
            console.log(error);
        }).then(function () {
            if (callBack) {
                callBack();
            }
        });
    }
}

// function getUpdateColors(fales,setTextFieldColor )

function setTextFieldColor() {
    document.querySelector('.js-text-input').style.background = randColors.a.color;
    document.querySelector('.js-text-input').setAttribute('data-set-bg-color', randColors.a.color);
    document.querySelector('.js-textarea-input').style.color = '#' + invertHexColors(randColors.a.color.slice(1, 10));
    document.querySelector('.js-textarea-input').setAttribute('data-set-color', invertHexColors(randColors.a.color.slice(1, 10)));
    upDatePlaceholder('#' + invertHexColors(randColors.a.color.slice(1, 10)));
}

function addNewQuote() {
    if (document.querySelector('.js-textarea-input').value.trim().length > 0) {
        var div = document.createElement("div");
        div.className = 'tastful-text';
        div.style.background = document.querySelector('.js-text-input').getAttribute('data-set-bg-color');
        div.style.color = document.querySelector('.js-textarea-input').getAttribute('data-set-color');
        var t = document.createTextNode(document.querySelector('.js-textarea-input').value);
        div.appendChild(t);
        var theParent = document.querySelector('.js-tastful-texts');
        theParent.insertBefore(div, theParent.firstChild);
        reSetTextField();
    }
}

function reSetTextField() {
    // document.querySelector('.js-text-input').setAttribute('data-set-bg-color', '');
    // document.querySelector('.js-text-input').style.cssText = '';
    // document.querySelector('.js-textarea-input').setAttribute('data-set-color', '');
    getUpdateColors(true, setTextFieldColor);
    document.querySelector('.js-textarea-input').value = '';
    // document.querySelector('.js-textarea-input').style.cssText = '';
    document.querySelector('.js-text-length-count').innerHTML = '0';
    document.querySelector('#textarea-pseudo').remove();
}

function upDatePlaceholder(val) {
    if (document.querySelector('#textarea-pseudo')) {
        document.querySelector('#textarea-pseudo').remove();
    }
    var sheet = document.createElement("style");
    sheet.id = 'textarea-pseudo';
    sheet.innerHTML = '.tastful-text-field .text-input textarea::placeholder { color:' + val + ' ; }';
    document.querySelector('body').append(sheet);
}

/* utils */

function invertHexColors(hexnum) {
    if (hexnum.length != 6) {
        alert("Hex color must be six hex numbers in length.");
        return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = new Array();
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for (var i = 0; i < 6; i++) {
        if (!isNaN(splitnum[i])) {
            resultnum += simplenum[splitnum[i]];
        } else if (complexnum[splitnum[i]]) {
            resultnum += complexnum[splitnum[i]];
        } else {
            alert("Hex colors must only include hex numbers 0-9, and A-F");
            return false;
        }
    }

    return resultnum;
}