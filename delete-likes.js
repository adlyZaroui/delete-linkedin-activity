// https://www.linkedin.com/in/{username}/detail/recent-activity

/**
 * Halts execution for a certain amount of seconds.
 */
function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Gets the "View post" buttons for posts that require viewing before interacting.
function getViewPostButtons() {
    return document.querySelectorAll("button.artdeco-button.artdeco-button--inverse.artdeco-button--2.artdeco-button--secondary.interstitial-view-model-click-through-interstitial__button");
}

// Gets like buttons on posts you've reacted to.
function getLikesOnPosts() {
    return document.querySelectorAll(".react-button__trigger.artdeco-button[aria-pressed=\"true\"]");
}

// Gets like buttons on comments you've reacted to.
function getLikesOnComments() {
    return document.querySelectorAll(".comments-comment-social-bar__like-action-button[aria-pressed=\"true\"]");
}

// Forces click on "load more comments" buttons.
function loadMoreComments() {
    var loadMoreCommentsButtons = document.querySelectorAll(".button.comments-comments-list__show-previous-button");
    for (var i = 0; i < loadMoreCommentsButtons.length; i++) {
        loadMoreCommentsButtons[i].click();
    }
}

// Forces click on "load previous replies" buttons.
function loadPreviousReplies() {
    var loadPreviousRepliesButtons = document.querySelectorAll("button.show-prev-replies");
    for (var i = 0; i < loadPreviousRepliesButtons.length; i++) {
        loadPreviousRepliesButtons[i].click();
    }
}

// Forces scroll down and loads more comments and previous replies
function loadMoreActivity() {
    window.scrollTo(0, document.body.scrollHeight);
    loadMoreComments();
    loadPreviousReplies();
}

// Function to click "View post" buttons
async function clickViewPostButtons() {
    const viewPostButtons = getViewPostButtons();
    for (let i = 0; i < viewPostButtons.length; i++) {
        viewPostButtons[i].click();
        await sleep(2);  // Wait for the post to load
    }
}

// Function to delete activity (likes on posts and comments)
function deleteActivity() {
    let likesOnPosts = getLikesOnPosts();
    for (let i = 0; i < likesOnPosts.length; i++) {
        console.log(likesOnPosts[i].click());
    }

    let likesOnComments = getLikesOnComments();
    for (let i = 0; i < likesOnComments.length; i++) {
        console.log(likesOnComments[i].click());
    }
}

let keepGoing = true;
async function init() {
    console.log("*** Starting activity deletion ***");
    console.log(">>> Loading more activity");
    loadMoreActivity();
    await sleep(2);
    console.log(">>> Clicking 'View post' buttons");
    await clickViewPostButtons();  // First, click "View post" buttons
    console.log(">>> Deleting loaded activity");
    deleteActivity();
    if (keepGoing) {
        await sleep(5);
        init();
    }
}

init();