
const autoLogin = () => {
	//인증키가 쿠키로 저장되어 있는지 확인		
	let authKey = getCookie('authKey');
	
	//자동 로그인 처리
	if(authKey !== undefined){
		
		let formData = new FormData();
		formData.append("authKey", authKey);			
		fetch('/member/login', {				
			method:'POST',
			body:formData				
		})
		.then((response) => response.json())
		.then((data) => {
			if(data.message === 'AUTHKEY_NOT_FOUND'){
				document.cookie = 'authKey=' + data.authKey + ';path=/; max-age=0';
				alert("인증키 오류로 자동 로그인이 실패하였습니다.로그인창으로 이동합니다.");
				document.locatio.href = '/member/login';
				
			} else if(data.message === 'autoLogin' && data.role === 'MASTER') 
					window.location.href="/master/main?page=1";
				else if(data.message === 'autoLogin' && data.role === 'USER') 
					window.location.href="/shop/main?page=1";
		}).catch((error) => {console.log("error = " + error)});
		
	}
}

const getCookie = (name) => {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
}		