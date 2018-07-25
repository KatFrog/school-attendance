// Beginning of my code
// the data for this app

//Current max days shown on the page
const maxDays = 12;

let students = [{
		id: 0,
		name: 'Slappy the Frog',
		in_class: [],
		missed_days: 0
	},
	{
		id: 1,
		name: 'Lilly the Lizard',
		in_class: [],
		missed_days: 0
	},
	{
		id: 2,
		name: 'Paulrus the Walrus',
		in_class: [],
		missed_days: 0
	},
	{
		id: 3,
		name: 'Gregory the Goat',
		in_class: [],
		missed_days: 0
	},
	{
		id: 4,
		name: 'Adam the Anaconda',
		in_class: [],
		missed_days: 0
	},
	{
		id: 5,
		name: 'Barney the Bear',
		in_class: [],
		missed_days: 0
	}
];

// Initialize the attendance records

(function() {
	if (!localStorage.attendance) {
		console.log('Creating attendance records...');
		let attend;
		// Returns true or false
		function getRandom() {
			return (Math.random() >= 0.5);
		}
		students.forEach(function(student) {
			for (let i = 0; i < maxDays; i++) {
				attend = getRandom();
				if (!attend) {
					student.missed_days += 1;
				}
				student.in_class.push(attend);
			};
		});
		saveStudentData(); // Save data
	} else { // Read the contents of local storage
		students = readStudentData();
	}
}());

// The view for this App
// Set up the thead element in HTML
function setTableHead() {
	const thead = document.getElementById('table-head');

	let next; // Next node to be appended

	next = document.createElement('tr');
	thead.append(next); // Need to put the headings in a table row
	next = document.createElement('th');
	next.textContent = 'Student Name';
	thead.append(next); //First column
	for (let i = 0; i < maxDays; ++i) {
		next = document.createElement('th');
		next.textContent = `${i}`;
		thead.append(next);
	};
	next = document.createElement('th');
	next.classList.add('missed-col')
	next.textContent = 'Days Missed';
	thead.append(next);
}


function setTableBody() {
	const tbody = document.getElementById('attendance-table');
	let daily, // Daily attendance element
		next, // Next node to be appended
		next_row, // Next row to be appended
		next_cell; // Next table cell to be appended

	students.forEach(function(student) {
		next_row = document.createElement('tr');
		next_cell = document.createElement('td');
		next_cell.textContent = `${student.name}`;
		next_row.append(next_cell);
		missed = 0;
		for (let k = 0; k < maxDays; ++k) {
			daily = document.createElement('td');
			next = document.createElement('input');
			next.setAttribute('type', 'checkbox');
			next.setAttribute('id', `${student.id}_${k}`);
			next.classList.add('checkbox');
			next.setAttribute('onchange', 'toggleChecked(this)');
			if (student.in_class[k]) {
				next.classList.add('checked');
				next.checked = true;
			};
			daily.append(next);
			next_row.append(daily);
		}
		next = document.createElement('td');
		next.setAttribute('id', `${student.id}_missed`);
		next.classList.add('missed-col');
		next.textContent = `${student.missed_days}`;
		next_row.append(next);
		tbody.append(next_row);

	});
}

function saveStudentData() {
	localStorage.attendance = JSON.stringify(students);
}

function readStudentData() {
	return JSON.parse(localStorage.attendance);
}

function toggleChecked(checkbox) {
	let student_id,
		day,
		input_id,
		missed_cell;

	input_id = checkbox.id.split('_');
	student_id = Number(input_id[0]);
	day = Number(input_id[1]);

	students[student_id].in_class[day] = !students[student_id].in_class[day];
	if (students[student_id].in_class[day]) {
		students[student_id].missed_days -= 1;
	} else {
		students[student_id].missed_days += 1;
	}
	missed_cell = document.getElementById(`${student_id}_missed`);
	missed_cell.textContent = `${students[student_id].missed_days}`;
	saveStudentData();
}

setTableHead();
setTableBody();