import request from 'request';
import buildUrl from 'build-url';

function sendFormToSheet(name, ssn, email, scoutGroup, events, cb) {
	//let url = 'https://script.google.com/macros/s/AKfycbwV_Bw6shvkcPVE3eAHRe9fqg48haLJuAJqSWb8PYgqh1yoA84n/exec?';

	let params = {
		[name.name]: name.val,
		[ssn.name]: ssn.val,
		[email.name]: email.val,
		[scoutGroup.name]: scoutGroup.val,
		timeStamp: new Date(),
	}
	for(let i = 0; i < events.length; i++) {
		params[events[i].name] = events[i].val
	}
	//console.log(params);
	const url = buildUrl(process.env.REACT_APP_GOOGLE_URL, {
		path: process.env.REACT_APP_GOOGLE_PATH,
		queryParams: params
	});
	request.get(url, cb);
}

export {sendFormToSheet};