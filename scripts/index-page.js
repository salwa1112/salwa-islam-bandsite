import BandSiteRestService from './restservice.js'

BandSiteRestService.getAllData('comments')
.then((response) => {
    const comments = response.data;
    loadComments(comments);
})
.catch((error) => {
    console.log("Error fetching comments data ", error);
});


function loadComments(allComments) {
    if (allComments.length === 0) return;

    // Sort by date asc, this is to insert the latest comment at the top
    allComments.sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });


    allComments.forEach((comment) => {
        displayComment(comment);
    });
}

function onCommentSubmitted(event) {
    //  Prevent default submit action
    event.preventDefault();

    //Validation passed, remove any previous error state if present
    event.target.querySelector("#name").classList.remove("comments-section__name--error");
    event.target.querySelector("#comment").classList.remove("comments-section__comment--error");


    //Form validation check
    if (!event.target.name.value) {
        event.target.querySelector("#name").classList.toggle(`${event.target.querySelector("#name").className}--error`);
        return;
    }

    if (!event.target.comment.value) {
        event.target.querySelector("#comment").classList.toggle(`${event.target.querySelector("#comment").className}--error`);
        return;
    }

    //Create object 
    const newComment = {
        name: event.target.name.value,
        comment: event.target.comment.value
    };

    //Post comment data
    BandSiteRestService.postData('comments', newComment)
    .then((response) => {
        //Response data is the added comment
        const addedComment = response.data;
        displayComment(addedComment);

        //Clear form element
        clearForm();
    })
    .catch((error) => {
        console.log("Somebody handle this ",error);
    });

}

function displayComment(comment) {
    if (typeof (comment) != "object")
        return;

    let ulComments = document.querySelector('.comments-section__list');

    if (!ulComments) {
        //No previous comments list found, create a new one
        ulComments = getElement('ul', 'comments-section__list');
    }

    const listItem = getElement('li', 'comments-section__list-item');

    const listItemContentRoot = getElement('div', 'comments-section__list-item-content');
    const commentsSectionImage = getElement('img', 'comments-section__img');
    const commentContainer = getElement('div', 'comments-section__posted-comment');
    const commentHeader = getElement('div', 'comments-section__list-item-header');
    const commentHeaderChild_Name = getElement('h3', 'comments-section__list-item-author-name');
    const commentHeaderChild_PostDate = getElement('p', 'comments-section__list-item-post-date');
    const commentContainerChild_Description = getElement('p', 'comments-section__list-item-description');
    const commentDivider = getElement('hr', 'comments-section__divider');

    //Append header items to the header container
    commentHeader.appendChild(commentHeaderChild_Name);
    commentHeader.appendChild(commentHeaderChild_PostDate);

    //Append header and comment description to the comment continer
    commentContainer.appendChild(commentHeader);
    commentContainer.appendChild(commentContainerChild_Description);

    //Append image and the comment container and the divider to the list item class
    listItemContentRoot.appendChild(commentsSectionImage);
    listItemContentRoot.appendChild(commentContainer);

    //Add to the list item
    listItem.appendChild(listItemContentRoot);
    listItem.appendChild(commentDivider);

    //Add data to the items
    commentHeaderChild_Name.textContent = comment.name;
    commentHeaderChild_PostDate.textContent = timeAgo(comment.timestamp);
    commentContainerChild_Description.textContent = comment.comment;
    commentsSectionImage.src = './assets/images/default.jpg';
    commentsSectionImage.alt = `comment section image`;


    //Add comment to list
    ulComments.insertBefore(listItem, ulComments.firstChild);
    const commentSection = document.querySelector('.comments-section');
    commentSection.appendChild(ulComments);

    //Add top border after adding historical comments
    ulComments = document.querySelector('.comments-section__list');
    const commentsSection = document.querySelector('.comments-section');



    const topDivider = document.querySelector('.comments-section__list-divider');
    if (!topDivider) {
        const divider = getElement('hr', 'comments-section__list-divider');
        commentsSection.insertBefore(divider, ulComments);
    }
}

function clearForm() {
    const form = document.querySelector('.comments-section__frm');
    form.reset();
}

function getElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

function timeAgo(postTime) {
   
    const timeDifferenceInSeconds = (new Date().getTime() - postTime) / 1000;
    const totalSecondsInAYear = 365 * 24 * 3600;
    const totalSecondsInAMonth = 30 * 24 * 3600;
    const totalSecondsInADay = 24 * 3600;
    const totalSecondsInAnHour = 3600;
    const totalSeconsInAMinute = 60;

    let totalYears = 0;
    let totalMonths = 0;
    let totalDays = 0;
    let totalHours = 0;
    let totalMinutes = 0;

    if ((totalYears = Math.trunc(timeDifferenceInSeconds / totalSecondsInAYear)) > 0) {
        return `${totalYears > 1 ? totalYears + ' years' : 'a year'} ago`;
    }

    if ((totalMonths = Math.trunc(timeDifferenceInSeconds / totalSecondsInAMonth)) > 0) {
        return `${totalMonths > 1 ? totalMonths + ' months' : 'a month'} ago`;
    }

    if ((totalDays = Math.trunc(timeDifferenceInSeconds / totalSecondsInADay)) > 0) {
        return `${totalDays > 10 ? totalDays + ' days' : (totalDays > 1 ? 'a few days' : totalDays + ' day')} ago`;
    }

    if ((totalHours = Math.trunc(timeDifferenceInSeconds / totalSecondsInAnHour)) > 0) {
        return `${totalHours > 5 ? totalHours + ' hours' : (totalHours > 1 ? 'a few hours' : 'an hour')} ago`;
    }

    if ((totalMinutes = Math.trunc(timeDifferenceInSeconds / totalSeconsInAMinute)) > 0) {
        return `${totalMinutes > 9 ? totalMinutes + ' minutes' : (totalMinutes > 1 ? 'a few minutes' : 'a minute')} ago`;
    }

    return timeDifferenceInSeconds > 1 ? 'a few seconds ago' : 'Just now';
}

document.addEventListener('DOMContentLoaded', () => {
    const commentSubmissionForm = document.querySelector('.comments-section__frm');
    commentSubmissionForm.addEventListener('submit', onCommentSubmitted);
});