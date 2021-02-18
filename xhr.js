const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {

	const promise = new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();
		//xhr.open('GET', 'https://reqres.in/api/users'); //prepares http req to be sent
		xhr.open(method, url);

		xhr.responseType = 'json'; //so you dont need to do json parse

		xhr.setRequestHeader('Content-Type', 'application/json'); //signals that we are appending json data - only applicable if you have data


		xhr.onload = () => {

			if (xhr.status >= 400 ){
				reject(xhr.response);
			} else {
				resolve(xhr.response);
			}

			//const data = JSON.parse(xhr.response); // converts json date to js data
			//const data = xhr.response;
			//console.log(data);	
		}


		// will only get triggered if the request fails 
		xhr.onerror = () => {
			reject('Something went wrong');
		}

		xhr.send(JSON.stringify(data)); // stringify converts js obj to json

	});

	return promise;

}

const getData = () => {
	sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData => {
		console.log(responseData)
	});
};

const sendData = () => {
	sendHttpRequest('POST', 'https://reqres.in/api/register', {
		email: 'eve.holt@reqres.in',
		//password: 'pistol'
	}).then(responseData => {
		console.log(responseData);
	}).catch(err => {
		console.log(err);
	})
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
