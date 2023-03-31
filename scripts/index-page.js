const historicalComments = [
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

document.addEventListener('DOMContentLoaded', () => {  
    //load Previous Comments
    loadHistoricalComments();

    const commentButton = document.querySelector('.comments-section__btn');
    commentButton.addEventListener('click', (e) => {
        //Stop propagation on button click
        e.stopPropagation();
    });

    const commentSubmissionForm = document.querySelector('.comments-section__frm');
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
    const ulComments = document.querySelector('.comments-section__list');
    const commentsSection = document.querySelector('.comments-section');
    const divider = getElement('hr','comments-section__divider');
    commentsSection.insertBefore(divider, ulComments);
}

function onCommentSubmitted(event){
//  Prevent default submit action
    event.preventDefault();

    const currentDate = new Date();
    const comment = {
        img_src: "./assets/images/default.jpg",
        author_name: event.target.name.value,
        post_date: `${(currentDate.getMonth()+1).toString().padStart(2,'0')}/
            ${currentDate.getDate().toString().padStart(2,'0')}/${currentDate.getFullYear()}`,
        description: event.target.comment.value
    };

    //Add comment
    addComment(comment);

    //Clear inputs from form
    clearForm();
}

function addComment(comment){
    if(typeof(comment) != "object")
        return;

    let ulComments = document.querySelector('.comments-section__list');

    if(!ulComments){
        //No previous comments list found, create a new one
        ulComments = getElement('ul', 'comments-section__list');
    }

    const listItem = getElement('li', 'comments-section__list-item');
    
    const listItemContentRoot = getElement('div', 'comments-section__list-item-content');
    const commentsSectionImage = getElement('img', 'comments-section__img');
    const commentContainer = getElement('div', 'comments-section__posted-comment');
    const commentContainerChild_Header = getElement('div', 'comments-section__list-item-header');
    const commentHeaderChild_Name = getElement('h3', 'comments-section__list-item-author-name');
    const commentHeaderChild_PostDate = getElement('p', 'comments-section__list-item-post-date');
    const commentContinerChild_Description = getElement('p', 'comments-section__list-item-description');
    const commentDivider = getElement('hr', 'comments-section__divider');
    
    //Append  header items to the header container
    commentContainerChild_Header.appendChild(commentHeaderChild_Name);
    commentContainerChild_Header.appendChild(commentHeaderChild_PostDate);

    //Append header and comment description to the comment continer
    commentContainer.appendChild(commentContainerChild_Header);
    commentContainer.appendChild(commentContinerChild_Description);

    //Append image and the comment container and the diveder to the list item class
    listItemContentRoot.appendChild(commentsSectionImage);
    listItemContentRoot.appendChild(commentContainer);
   
    //Add to the list item
    listItem.appendChild(listItemContentRoot);
    listItem.appendChild(commentDivider);

    //Add data to the items
    commentHeaderChild_Name.textContent = comment.author_name;
    commentHeaderChild_PostDate.textContent = comment.post_date;
    commentContinerChild_Description.textContent = comment.description;
    commentsSectionImage.src = comment.img_src;
    commentsSectionImage.alt = `profile photo of ${comment.author_name}`;


    //Add comment to list
    ulComments.insertBefore(listItem, ulComments.firstChild);
    const commentSection = document.querySelector('.comments-section');
    commentSection.appendChild(ulComments);
}

function clearForm() {
    const form = document.querySelector('.comments-section__frm');
    form.reset();
}

function getElement(tagName, className){
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}