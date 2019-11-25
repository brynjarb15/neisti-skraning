import request from 'request';
import buildUrl from 'build-url';

function sendFormToSheet(name, ssn, email, scoutGroup, chosenEvents, notChosenEvents, cb) {
	//let url = 'https://script.google.com/macros/s/AKfycbwV_Bw6shvkcPVE3eAHRe9fqg48haLJuAJqSWb8PYgqh1yoA84n/exec?';

	let params = {
		[name.name]: name.val,
		[ssn.name]: ssn.val,
		[email.name]: email.val,
		[scoutGroup.name]: scoutGroup.val,
		timeStamp: new Date(),
	}
	for(let i = 0; i < chosenEvents.length; i++) {
		params[chosenEvents[i].name] = i+1;
	}
	for(let i = 0; i < notChosenEvents.length; i++) {
		params[notChosenEvents[i].name] = '';
	}
	//console.log(params);
	const url = buildUrl(process.env.REACT_APP_GOOGLE_URL, {
		path: process.env.REACT_APP_GOOGLE_PATH,
		queryParams: params
	});
	request.get(url, cb);
}

export {sendFormToSheet};