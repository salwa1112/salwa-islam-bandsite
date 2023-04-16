const allComments = [
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Connor Walton",
        post_date: "02/17/2021",
        description: "This is art. This is inexplicable magic\
                expressed in the purest way, everything\
                that makes up this majestic work\
                deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Emilie Beach",
        post_date: "01/09/2021",
        description: "I feel blessed to have seen them in\
        person. What a show! They were just\
        perfection. If there was one day of my\
        life I could relive, this would be it. What\
        an incredible day."
    },
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Miles Acosta",
        post_date: "12/20/2020",
        description: "I can t stop listening. Every time I hear\
        one of their songs - the vocals - it gives\
        me goosebumps. Shivers straight down\
        my spine. What a beautiful expression of\
        creativity. Can t get enough."
    }
]

function loadComments() {
    if (allComments.length === 0) return;

    // Sort by date asc, this is to insert the latest comment at the top
    allComments.sort((a, b) => {
        return new Date(a.post_date).getTime() - new Date(b.post_date).getTime();
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
    if(!event.target.name.value){
        event.target.querySelector("#name").classList.toggle(`${event.target.querySelector("#name").className}--error`);
        return;
    }

    if(!event.target.comment.value){
        event.target.querySelector("#comment").classList.toggle(`${event.target.querySelector("#comment").className}--error`);
        return;
    }

    

    const currentTime = new Date();
    
    
    const comment = {
        img_src: "./assets/images/default.jpg",
        author_name: event.target.name.value,
        post_date: `${currentTime}`,
        description: event.target.comment.value
    };

    //push the new added code to the array
    allComments.push(comment);
    //clear previous comments from the page
    const ulComments = document.querySelector('.comments-section__list');
    //using replaceChildren() function instead of innerHTML to clear the content
    ulComments.replaceChildren();
    //load comments
    loadComments();

    //Clear inputs from form
    clearForm();
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
    commentHeaderChild_Name.textContent = comment.author_name;
    commentHeaderChild_PostDate.textContent = timeAgo(comment.post_date);
    commentContainerChild_Description.textContent = comment.description;
    commentsSectionImage.src = comment.img_src;
    commentsSectionImage.alt = `profile photo of ${comment.author_name}`;


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

function timeAgo(time){
    const postTime = new Date(time);

    const timeDifferenceInSeconds = (new Date().getTime()-postTime)/1000;
    const totalSecondsInAYear = 365*24*3600;
    const totalSecondsInAMonth = 30*24*3600;
    const totalSecondsInADay = 24*3600;
    const totalSecondsInAnHour = 3600;
    const totalSeconsInAMinute = 60;

    if((totalYears = Math.trunc(timeDifferenceInSeconds / totalSecondsInAYear)) > 0) {
        return `${totalYears > 1 ? totalYears + ' years' : 'a year'} ago`;
    }

    if((totalMonths = Math.trunc(timeDifferenceInSeconds  / totalSecondsInAMonth)) > 0){   
        return `${totalMonths > 1 ? totalMonths + ' months' : 'a month'} ago`;
    }

    if(totalDays = Math.trunc(timeDifferenceInSeconds/ totalSecondsInADay) > 0){
        return `${totalDays > 10 ? totalDays +' days' : (totalDays > 1 ? 'a few days' : totalDays + ' day') } ago`;
    }

    if(totalHours = Math.trunc(timeDifferenceInSeconds/ totalSecondsInAnHour) > 0){
        return `${totalHours > 5 ? totalDays + ' hours' : (totalHours > 1 ? 'a few hours' : 'an hour') } ago`;
    }

    if(totalMinutes = Math.trunc(timeDifferenceInSeconds / totalSeconsInAMinute) > 0){
        return `${totalMinutes > 9 ? totalMinutes + ' minutes' : (totalMinutes > 1 ? 'a few minutes' : 'a minute') } ago`;
    }

    return timeDifferenceInSeconds > 1 ? 'a few seconds ago' : 'Just now';
}


document.addEventListener('DOMContentLoaded', () => {
    //load Previous Comments
    loadComments();

    const commentButton = document.querySelector('.comments-section__btn');
    commentButton.addEventListener('click', (event) => {
        //Stop propagation on button click
        event.stopPropagation();
    });

    const commentSubmissionForm = document.querySelector('.comments-section__frm');
    commentSubmissionForm.addEventListener('submit', onCommentSubmitted);
});