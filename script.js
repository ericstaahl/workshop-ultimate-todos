/**
 * Ultimate TODOs
 *
 * 1. Sortera todos baserat på titel
 *
 * 2. Filtrera todos så ni har två listor, en med saker som är kvar att göra,
 * och en lista med avklarade saker.
 *
 * 3. Rendera ut varje TODO's ID till DOM istället för dess array-index.
 *
 * 4. Uppdatera click-eventhandler:n så att den hämtar ID från förälderns
 * data-attribut istället för index. Använd sedan detta ID för att hitta rätt
 * TODO i `todos`-array:en.
 *
 * 5. (extra utmaning)
 * När man skapar en ny TODO, se om du kan få till en funktion som hämtar ut
 * det högsta ID som finns och tar +1 på det, och använder det talet som den
 * nya TODO:ns ID.
 *
 */

// get references to DOM elements
const todosEl = document.querySelector('#todos');
const todos1El = document.querySelector('#todos1');
const newTodoFormEl = document.querySelector('#new-todo-form');
const ulWrapperEl = document.querySelector('.ul-wrapper')


// list of todos
const todos = [
	{
		id: 1,
		title: "Eat",
		completed: false,
	},
	{
		id: 2,
		title: "Code",
		completed: true,
	},
	{
		id: 3,
		title: "Sleep",
		completed: false,
	},
	{
		id: 4,
		title: "Repeat",
		completed: false,
	}
];

//STEG 5 FUNKTION
const maxIDFunction = function() {
	let maxID = 0;
	todos.forEach(todo => {
		if (todo.id > maxID) {
			maxID = todo.id;
		};
	});
	maxID++;
	return maxID;
};
//SLUT STEG 5 FUNKTION

todos.sort(function (a, b) {
	if (a.title.toUpperCase() > b.title.toUpperCase()) {
		return 1;
	}
	if (a.title.toUpperCase() < b.title.toUpperCase()) {
		return -1;
	}
	return 0;
});


let completedList = todos.filter(x => x.completed === true);
// console.log(completedList);
let unfinishedList = todos.filter(x => x.completed === false);
// console.log(unfinishedList);


const renderTodos = () => {
	// empty UL of todos
	todosEl.innerHTML = "";
	todos1El.innerHTML = "";

	// // render todos to DOM
	// todos.forEach((todo, i) => {
	// 	// if todo is completed, add "completed" to CSS classes
	// 	const cssClasses = (todo.completed)
	// 		? "list-group-item completed"
	// 		: "list-group-item";
	//     });

	completedList = todos.filter(x => x.completed === true);
	// console.log(completedList);
	unfinishedList = todos.filter(x => x.completed === false);
	// console.log(unfinishedList);

	completedList.forEach(completedTodo => {
		todosEl.innerHTML += `<li class="list-group-item completed" data-id="${completedTodo.id}">
			${completedTodo.title}
		 		<button class="ms-2 btn btn-sm btn-danger">🚮</button>
		 	</li>`;
	});

	unfinishedList.forEach((unfinishedTodo) => {
		todos1El.innerHTML += `<li class="list-group-item" data-id="${unfinishedTodo.id}">
			${unfinishedTodo.title}
		 		<button class="ms-2 btn btn-sm btn-danger">🚮</button>
		 	</li>`;
	});

	// todosEl.innerhtml += `<li class="${todo.completed}" data-index="${i}">
	// 	${todo.title}
	//  		<button class="ms-2 btn btn-sm btn-danger">🚮</button>
	//  	</li>`;

	// // Append a LI-element to the UL
	// todosEl.innerHTML += `
	// 	<li class="${cssClasses}" data-index="${i}">
	// 		${todo.title}
	// 		<button class="ms-2 btn btn-sm btn-danger">🚮</button>
	// 	</li>
	// `;

}

// render (initial list of) todos
renderTodos();

newTodoFormEl.addEventListener('submit', e => {
	// stop form from being submitted to the web server
	// and hence causing a page reload 😨
	e.preventDefault();

	// get todo to add to list of todos
	const newTodoDescription = e.target.newTodo.value;

	// empty input
	e.target.newTodo.value = "";

	// create a object for the new todo
	const newTodo = {
		id: maxIDFunction(),
		title: newTodoDescription,
		completed: false,
	}

	// add todo to array of todos
	todos.push(newTodo);

	// render todos
	renderTodos();
});

newTodoFormEl.addEventListener('reset', e => {
	// OH NO YOU NOT RESET FORM, FORM RESETS YOU!
	// e.preventDefault();
	// alert("Oh no you didn't");

	alert("Good job cleaning! 👍🏻");
});

// react to when user clicks on something in our TODO list
ulWrapperEl.addEventListener('click', e => {
	console.log(`You clicked on a ${e.target.tagName} element`, e.target);

	// check if user clicked on a LI element
	if (e.target.tagName === "LI") {
		// find index of todo
		const id = e.target.dataset.id;
		// change completed-status of todo
		if (e.target.parentElement === todos1El) {
			const res = unfinishedList.find(unfinished => unfinished.id == id);
			res.completed = true;
		}
		else {
			const res = completedList.find(completed => completed.id == id);
			res.completed = false;
		}


		// Render todos
		renderTodos();

	} else if (e.target.tagName === "BUTTON") {
		// How to find the clicked todo in our array,
		// and then remove it from the array?
		const buttonEl = e.target;
		const liEl = buttonEl.parentElement;
		const id = liEl.dataset.id; // data-index=""

		// shorter version of above 3 lines
		// const index = e.target.parentElement.dataset.index;

		// Remove item with index from array

		if (liEl.parentElement == todos1El) {
			const res = unfinishedList.find(unfinished => unfinished.id == id);
			console.log(res);
			const index = todos.indexOf(res)
			console.log(index);
			todos.splice(index, 1);
		};


		if (liEl.parentElement == todosEl) {
			const res = completedList.find(completed => completed.id == id);
			console.log(res);
			const index = todos.indexOf(res)
			console.log(index);
			todos.splice(index, 1);
		};

		// Render todos
		renderTodos();
	}
});