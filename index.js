import { MDCList } from "@material/list";
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from "@material/drawer";
import { MDCRipple } from '@material/ripple';
import $ from 'jquery';

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

const drawerElement = document.querySelector('.mdc-drawer');
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

// Text fields
import { MDCTextField } from '@material/textfield';

document.querySelectorAll('.mdc-text-field').forEach(textField => {
    new MDCTextField(textField);
});

// Card buttons ripple
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
    return new MDCRipple(el);
});
// 

// Form buttons ripple
// document.querySelectorAll('')
// 
console.log("Javascript initialized");

const initModalDrawer = () => {
    drawerElement.classList.add("mdc-drawer--modal");
    const drawer = MDCDrawer.attachTo(drawerElement);
    drawer.open = false;
    topAppBar.setScrollTarget(mainContentEl);
    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });

    listEl.addEventListener('click', (event) => {
        drawer.open = false;
    });
}

if (window.matchMedia("(max-width: 900px)").matches) {
    initModalDrawer();
} else {
    const list = new MDCList(listEl);
    list.wrapFocus = true;
}

const resizeHandler = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
        initModalDrawer();
    } else {
        drawerElement.classList.remove("mdc-drawer--modal");
    }
}
window.addEventListener('resize', resizeHandler);

document.querySelectorAll('.mdc-list a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        window.autoScroll = true;
        var pos = $(this.getAttribute('href')).offset().top - 80

        $('html, body').animate({
            scrollTop: pos
        }, 800, 'swing', () => {
            window.autoScroll = false;
        });
    });
});

document.addEventListener('scroll', function () {

    if (!window.autoScroll) {
        var closestElement;
        var minDistance;

        $('.kevinislas-navigationLink').each(function (i) {
            var currDistance = Math.abs($(window).scrollTop() - $(this).offset().top)
            if (!minDistance || currDistance < minDistance) {
                minDistance = currDistance;
                closestElement = i;
            }
        });
        $('.mdc-list-item--activated').removeClass("mdc-list-item--activated");
        $('.mdc-list-item').eq(closestElement).addClass('mdc-list-item--activated');
    }
});

function matchContentSize() {
    if ($('#workCard1').height() > $('#workCard2').height()) {
        $('#workCard2').height($('#workCard1').height());
    } else {
        $('#workCard1').height($('#workCard2').height());
    }

    if ($('#educationCard1').height() > $('#educationCard2').height()) {
        $('#educationCard2').height($('#educationCard1').height());
    } else {
        $('#educationCard1').height($('#educationCard2').height());
    }

    if ($('#OSSCard1').height() > $('#OSSCard2').height()) {
        $('#OSSCard2').height($('#OSSCard1').height());
    } else {
        $('#OSSCard1').height($('#OSSCard2').height());
    }
}
document.body.onresize = matchContentSize;

document.body.onload = matchContentSize;