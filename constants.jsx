/* jshint strict: false, asi: true, esversion:6 */
const api_url = function(){
	let api_url ='';
	if(process.env.NODE_ENV == 'development'){
		api_url = 'http://localhost:3000';
	}
	else if(process.env.NODE_ENV == 'production'){
		api_url = 'https://floating-basin-79702.herokuapp.com/';
	}
	return api_url;
};

export const url = api_url();