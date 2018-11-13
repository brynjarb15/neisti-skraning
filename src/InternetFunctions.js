import request from 'request';
import buildUrl from 'build-url';

function sendFormToSheet(name, ssn, phone, email, scoutGroup, bankNumber, stores, parentSSN, parentPhone, parentEmail, bankInfoBelongsToParticipant, cb) {
	//let url = 'https://script.google.com/macros/s/AKfycbwV_Bw6shvkcPVE3eAHRe9fqg48haLJuAJqSWb8PYgqh1yoA84n/exec?';

	let params = {
		[name.name]: name.val,
		[ssn.name]: ssn.val,
		[phone.name]: phone.val,
		[email.name]: email.val,
		[scoutGroup.name]: scoutGroup.val,
		[bankNumber.name]: bankNumber.val,
		timeStamp: new Date(),
		[parentSSN.name]: [parentSSN.val ? parentSSN.val : '-----'],
		[parentPhone.name]: [parentPhone.val ? parentPhone.val : '-----'],
		[parentEmail.name]: [parentEmail.val ? parentEmail.val : '-----'],
		['Reikningur í eigu þáttakanda']: bankInfoBelongsToParticipant
	}
	for(let i = 0; i < stores.length; i++) {
		params[stores[i].name] = stores[i].val
	}
	//console.log(params);
	const url = buildUrl(process.env.REACT_APP_GOOGLE_URL, {
		path: process.env.REACT_APP_GOOGLE_PATH,
		queryParams: params
	});
	request.get(url, cb);
}

export {sendFormToSheet};