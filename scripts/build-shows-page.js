// const current_shows = [
//     {
//         date: 'Mon Sept 06 2021',
//         venue: 'Ronald Lane',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Tue Sept 21 2021',
//         venue: 'Pier 3 East',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Fri Oct 15 2021 ',
//         venue: 'View Lounge',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Sat Nov 06 2021',
//         venue: 'Hyatt Agency',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Fri Nov 26 2021',
//         venue: 'Moscow Center',
//         location: 'San Francisco, CA'
//     },
//     {
//         date: 'Wed Dec 15 2021',
//         venue: 'Press Club',
//         location: 'San Francisco, CA'
//     }
// ]

import BandSiteRestService from './restservice.js'

BandSiteRestService.getAllData('showdates')
.then((response) => {
    const showDates = response.data;
    console.log(response.data);
    loadAllShows(showDates);
})
.catch((error) => {
    console.log("Error fetching show data ", error);
});

function setupListItemClickStyle() {
    const listItems = document.querySelectorAll('.shows-section__list-item');
    listItems.forEach((listItem) => {
        listItem.addEventListener('click', () => {
            listItems.forEach(item => {
                if (item !== listItem) {
                    item.classList.remove("selected");
                }
            });

            listItem.classList.toggle("selected");
        });
    })
}


function onListItemClicked(event) {
    event.stopPropagation();
    event.preventDefault();


    if (event.target.parentElement.tagName !== 'LI') {
        return;
    }



    const listItems = document.querySelectorAll('.shows-section__list-item');

    //No click event action for the first item
    if (listItems[0] === event.target.parentElement) {
        return;
    }

    //console.log(currentItem);
    listItems.forEach(item => {
        if (item !== event.target.parentElement) {
            item.classList.remove("selected");
        }
    });

    event.target.parentElement.classList.toggle("selected");
}


function onButtonClicked(event) {
    const show = {
        date: event.target.parentElement.querySelector("#date").innerText,
        venue: event.target.parentElement.querySelector("#venue").innerText,
        location: event.target.parentElement.querySelector("#location").innerText,
    }
    console.log(show);
}


//This function returns promise
function getElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

function addShow(show) {
    const sectionClass = 'shows-section';

    const ulShows = document.querySelector(`.${sectionClass}__list`);

    const listItemNode = getElement('li', `${sectionClass}__list-item`);
    const listContentNode = getElement('div', `${sectionClass}__show`);
    const listItemDivider = getElement('hr', `${sectionClass}__divider`);

    //Create button
    const btnBuyTicket = getElement('button', `${sectionClass}__buy-button`);
    btnBuyTicket.type = "button";
    btnBuyTicket.textContent = "Buy Tickets".toUpperCase();
    btnBuyTicket.addEventListener('click', onButtonClicked);

    //Load all the values
    for (const [key, value] of Object.entries(show)) {
        if (key !== 'id'){
        //console.log(new Date().getTime(),key,value);
        const listContentChild = getElement('div', `${sectionClass}__show-details`);
        const listContentChildLbl = getElement('h2', `${sectionClass}__lbl`);
        const listContentChildValue = getElement('p', `${sectionClass}__${key}`);

        listContentChildValue.id = key;

        listContentChildLbl.textContent = key === 'place' ? "VENUE" : key.toUpperCase();

        listContentChildValue.textContent = key === 'date' && value !== '' ? new Date(value).toDateString() : value;

        listContentChild.appendChild(listContentChildLbl);
        listContentChild.appendChild(listContentChildValue);

        listContentNode.appendChild(listContentChild);
        }

    }

    listContentNode.appendChild(btnBuyTicket);

    listItemNode.appendChild(listContentNode);
    listItemNode.appendChild(listItemDivider);


    //Add click event listener
    listItemNode.addEventListener('click', onListItemClicked);

    ulShows.appendChild(listItemNode);

}

function loadAllShows(showDates) {
    //Add a first header element
    const headerLabel = {
        date: '',
        place: '',
        location: '',
    }

    addShow(headerLabel);

    showDates.forEach(show => {
        addShow(show);
    });
}

function returnDateFormat(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(new Date().getTime(), "Dom content loaded");
});

