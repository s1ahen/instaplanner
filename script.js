document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.querySelector('.calendar');
    const drafts = document.getElementById('draft-list');
    
    function loadCalendar() {
        // Simple example of generating days
        for (let i = 1; i <= 30; i++) {
            const dayElement = document.createElement('div');
            dayElement.innerText = i;
            dayElement.classList.add('day');
            dayElement.addEventListener('click', () => showPostDetails(i));
            calendar.appendChild(dayElement);
        }
    }

    function showPostDetails(day) {
        const postDetails = document.getElementById('post-details');
        postDetails.innerHTML = `<h3>Post Details for Day ${day}</h3>`;
        // Logic to show post details and allow edits
    }

    function loadDrafts() {
        // Example draft loading
        for (let i = 1; i <= 5; i++) {
            const draftElement = document.createElement('div');
            draftElement.innerText = `Draft ${i}`;
            draftElement.classList.add('draft');
            drafts.appendChild(draftElement);
        }
    }

    loadCalendar();
    loadDrafts();
});
