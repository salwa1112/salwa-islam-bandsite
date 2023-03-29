const historicalComments = [
    {
        img_src: "img src 1",
        author_name: "Connor Walton",
        post_date: "02/17/2021",
        comment: 'This is art. This is inexplicable magic \n \
                expressed in the purest way, everything \n \
                that makes up this majestic work \n \
                deserves reverence. Let us appreciate \n \
                this for what it is and what it contains.'
    },
    {
        img_src: "img src 2",
        author_name: "Emilie Beach",
        post_date: "01/09/2021",
        comment: 'This is art. This is inexplicable magic \n \
                expressed in the purest way, everything \n \
                that makes up this majestic work \n \
                deserves reverence. Let us appreciate \n \
                this for what it is and what it contains.'
    },
    {
        img_src: "img src 3",
        author_name: "Miles Acosta",
        post_date: "12/20/2020",
        comment: 'This is art. This is inexplicable magic \n \
                expressed in the purest way, everything \n \
                that makes up this majestic work \n \
                deserves reverence. Let us appreciate \n \
                this for what it is and what it contains.'
    }
]


document.addEventListener('DOMContentLoaded', () => {  
    // const commentContainerSection = document.querySelector('.comment__container');
    
    // const commentContainerContent = document.createElement('div');
    // const commentContainerHeader = document.createElement('h2');
    // const commentContainerForm = document.createElement('form');
   
    
    // commentContainerHeader.innerText = 'Join the Conversation';
    
    // //Add classes to element
    // commentContainerContent.classList.add('comment__container-content');
    // commentContainerHeader.classList.add('comment__container-content__title');    
    
    
    // commentContainerContent.appendChild(commentContainerHeader);
    // //commentContainerSection.appendChild(getLabel('Name:', 'name', 'comment__container-form__name'));
    // commentContainerSection.appendChild(commentContainerContent);

    //load Previous Comments
    loadHistoricalComments();


    const commentButton = document.querySelector('.comments-section-form__btn');
    commentButton.addEventListener('click', postNewComment);

});

function postNewComment(){
    const commentAuthorName = document.getElementById('name').value.trim();
    const currentDate = new Date();
    const commentPostDate = `${(currentDate.getMonth()+1).toString().padStart(2,'0')}/${currentDate.getDate().toString().padStart(2,'0')}/${currentDate.getFullYear()}`
    const commentText = document.getElementById('comment').value.trim();
    const imgSrc = "./assets/images/default.jpg";

    //Run data validation and set error state of the input elements

    const comment = {
        img_src: imgSrc,
        author_name: commentAuthorName,
        post_date: commentPostDate,
        comment: commentText
    };

    addComment(comment);

    clearForm();
}

function clearForm() {
    const form = document.querySelector('.comments-section-form__frm');
    form.reset();
}

function addComment(comment){
    if(typeof(comment) != "object")
        return;

    console.log(comment);

    const commentsSectionHistoryHeaderDiv= document.createElement('div');
    
    const commentAuthorNameHeader = document.createElement('h2');
    const commentPostDate = document.createElement('p');


    commentsSectionHistoryHeaderDiv.appendChild(commentAuthorNameHeader);
    commentsSectionHistoryHeaderDiv.appendChild(commentPostDate);

    const commentText = document.createElement('p');
    const commentDetailsRoot = document.createElement('div');
    commentDetailsRoot.classList.add("comments-section-history-info-posted_comment")
    commentDetailsRoot.appendChild(commentsSectionHistoryHeaderDiv);
    commentDetailsRoot.appendChild(commentText);


    const commentsHistoryInfoRoot = document.createElement('div');
    const authorImageElement = document.createElement('img');

    commentsHistoryInfoRoot.appendChild(authorImageElement);
    commentsHistoryInfoRoot.appendChild(commentDetailsRoot);

    const commentHistoryRoot = document.createElement('div');
    const divider = document.createElement('hr');

    commentHistoryRoot.appendChild(divider);
    commentHistoryRoot.appendChild(commentsHistoryInfoRoot);

    commentText.textContent = comment.comment;
    commentPostDate.textContent = comment.post_date;
    commentAuthorNameHeader.textContent = comment.author_name;
    authorImageElement.src = "./assets/images/default.jpg";
    authorImageElement.alt = `profile image of ${comment.author_name}`;



    //Add to root comment section
    const commentSection = document.querySelector('.comments-section');

   
    commentText.classList.add("comments-section-history-info__comment");
    commentPostDate.classList.add("comments-section-history-header__postdate");
    commentAuthorNameHeader.classList.add("comments-section-history-header__authorname");
    authorImageElement.classList.add("comments-section-history-info__img");
    divider.classList.add("comments-section-history__divider");
    commentsSectionHistoryHeaderDiv.classList.add("comments-section-history-header");
    commentsHistoryInfoRoot.classList.add("comments-section-history-info");
    commentHistoryRoot.classList.add("comments-section-history");

    const firstComment= document.querySelector('.comments-section-history');

    commentSection.insertBefore(commentHistoryRoot,firstComment);

}


function loadHistoricalComments(){
  
    //Sort by date asc
    historicalComments.sort((a,b) => {
        return new Date(a.post_date).getTime() - new Date(b.post_date).getTime();
    });

    historicalComments.forEach( (comment) => {
        addComment(comment);
    })
}




function getLabel(labelInnerText, labelFor, labelClassName){
    const label = document.createElement('label');
    label.innerText = labelInnerText;
    label.htmlFor = labelFor;
    label.classList.add(labelClassName);
    return label;
}



