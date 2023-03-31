const historicalComments = [
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Connor Walton",
        post_date: "02/17/2021",
        comment: "This is art. This is inexplicable magic\
                expressed in the purest way, everything\
                that makes up this majestic work\
                deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Emilie Beach",
        post_date: "01/09/2021",
        comment: "I feel blessed to have seen them in\
        person. What a show! They were just\
        perfection. If there was one day of my\
        life I could relive, this would be it. What\
        an incredible day."
    },
    {
        img_src: "./assets/images/default.jpg",
        author_name: "Miles Acosta",
        post_date: "12/20/2020",
        comment: "I can t stop listening. Every time I hear\
        one of their songs - the vocals - it gives\
        me goosebumps. Shivers straight down\
        my spine. What a beautiful expression of\
        creativity. Can t get enough."
    }
]

document.addEventListener('DOMContentLoaded', () => {  
    //load Previous Comments
    loadHistoricalComments();

    const commentButton = document.querySelector('.comments-section-form-content__btn');
    commentButton.addEventListener('click', (e) => {
        //Stop propagation on button click
        e.stopPropagation();
    });

    const commentSubmissionForm = document.querySelector('.comments-section-form-content__frm');
    commentSubmissionForm.addEventListener('submit', onCommentSubmitted);
});


function loadHistoricalComments(){
    if(historicalComments.length === 0) return;

    //Sort by date asc, this is to insert the latest comment at the top
    historicalComments.sort((a,b) => {
        return new Date(a.post_date).getTime() - new Date(b.post_date).getTime();
    });


    //const ulComments = getElement('ul', 'comments-list');

    historicalComments.forEach( (comment) => {
        addComment(comment);
    });

    //Add top border after adding historical comments
    const topComment = document.querySelector('.comments-section-history');
    const commentsSection = document.querySelector('.comments-section');
    const divider = getElement('hr','comments-section-history__divider');
    commentsSection.insertBefore(divider, topComment);
}

function onCommentSubmitted(event){
//  Prevent default submit
    event.preventDefault();

    const currentDate = new Date();
    const comment = {
        img_src: "./assets/images/default.jpg",
        author_name: event.target.name.value,
        post_date: `${(currentDate.getMonth()+1).toString().padStart(2,'0')}/
            ${currentDate.getDate().toString().padStart(2,'0')}/${currentDate.getFullYear()}`,
        comment: event.target.comment.value
    };

    //Add comment
    addComment(comment);

    //Clear inputs from form
    clearForm();
}

function addComment(comment){
    if(typeof(comment) != "object")
        return;

    const commentsSectionHistoryHeaderDiv = getElement('div','comments-section-history-header');  
    const commentAuthorNameHeader = getElement('h3',"comments-section-history-header__authorname");
    const commentPostDate = getElement('p',"comments-section-history-header__postdate");

    const commentText = getElement('p', 'comments-section-history-info__comment');
    const commentDetailsRoot = getElement('div','comments-section-history-info-posted_comment');

    const commentsHistoryInfoRoot = getElement('div', "comments-section-history-info");
    const authorImageElement = getElement('img', "comments-section-history-info__img");

    const commentHistoryRoot = getElement('div', 'comments-section-history');
    const divider = getElement('hr',"comments-section-history__divider");

    commentsSectionHistoryHeaderDiv.appendChild(commentAuthorNameHeader);
    commentsSectionHistoryHeaderDiv.appendChild(commentPostDate);

    commentDetailsRoot.appendChild(commentsSectionHistoryHeaderDiv);
    commentDetailsRoot.appendChild(commentText);


    commentsHistoryInfoRoot.appendChild(authorImageElement);
    commentsHistoryInfoRoot.appendChild(commentDetailsRoot);
    commentHistoryRoot.appendChild(commentsHistoryInfoRoot);

    //Add comment values
    commentText.textContent = comment.comment;
    commentPostDate.textContent = comment.post_date;
    commentAuthorNameHeader.textContent = comment.author_name;
    authorImageElement.src = comment.img_src;
    authorImageElement.alt = `profile image of ${comment.author_name}`;

    //Add to root comment section
    const commentSection = document.querySelector('.comments-section');
    const firstComment= document.querySelector('.comments-section-history');
    commentSection.insertBefore(commentHistoryRoot,firstComment);

    //Add divider after each comment
    commentSection.insertBefore(divider, firstComment);
}

function clearForm() {
    const form = document.querySelector('.comments-section-form-content__frm');
    form.reset();
}

function getElement(tagName, className){
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}