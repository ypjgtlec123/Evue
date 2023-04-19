	
import axios from 'axios'
// import { UserStatusService } from './user-status.service';
axios.defaults.baseURL = process.env.VUE_APP_PROXY
declare var $:any;

axios.interceptors.response.use(function (response) {
	if (response.status == 200) {
		if (response.headers['content-type'] == 'application/octet-stream') return response;
		else return response.data;
	}
  }, function (error) {
    return Promise.reject(error);
});

export class ProxyService {
	static axios = axios;
	static get (url,params) {
		return new Promise((resolve,reject) => {
			axios.get(url,params).then((res) => {
				if (res['code'] == '0000') resolve(res)
				// else if (res['code'] == 'vessel-user_not_login') UserStatusService.loginOut()
				else reject(res)
			},(err) => {
				reject(err);
			});
		})
	}
	static post (url,params) {
		return new Promise((resolve,reject) => {
			axios.post(url,params).then((res) => {
				if (res['code'] == '0000') resolve(res)
				// else if (res['code'] == 'vessel-user_not_login') UserStatusService.loginOut()
				else reject(res)
			},(err) => {
				reject(err);
			});
		})
	}
	
   // 下载
	static export(_url:string, data:any = {}) {
		// data['sid'] = UserStatusService.userInfo['sid'];
		if (_url.indexOf('/')===0) {
		return ("请去除URL前的'/'");
		}
		_url = axios.defaults.baseURL + _url + '?';
		for (var i in data) {
		_url+= i;
		_url+= '=';
		_url+= data[i];
		_url+= '&';
		}
		// _url = _url+'sid='+ this.__header__.sid
		window.open(_url)
	}
    // 下载
    static getExport(_url:string, data:any,header?:any) {
		
		return new Promise((resolve,reject) => {
			axios.get(_url,{params : data,...{
			responseType: 'blob',
			}}).then(res => {
			// 判断是否不是文件 - 此处为错误信息
			if (res.data.type != 'application/octet-stream') {
				let reader = new FileReader();
				reader.readAsText(res.data, 'utf-8');
				reader.onload = function (e) {
					let readerres : any = reader.result;
					let parseObj = readerres ? JSON.parse(readerres) : '导出失败';
					reject(parseObj);
				}
			} else {
			// 返回正确，开始下载
				let blob = res.data;
				let url = URL.createObjectURL(blob);
				let a = document.createElement('a');
				a.style.display = 'none';
				// 获取文件名fileName
				let disposition = Object.keys(res.headers).find(name => /content-disposition/i.test(name));
				if (!disposition)
					reject('响应头 content-disposition 异常，响应头必须包含：Access-Control-Expose-Headers: content-disposition, Content-Disposition ；以及 content-disposition ；详情请参阅 @see https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers');
				let fileName = res.headers[disposition].split("=");
				fileName = fileName[fileName.length - 1];
				fileName = fileName.replace(/"/g, "");
				a.download = decodeURI(fileName);
				a.href = url;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
				resolve({message : '操作成功'});
			}
			
			},(err) => {
			reject(err);
			})  
		})
	}
	static upload (url,params) {
		return new Promise((resolve,reject) => {
			axios.post(url,params,{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}}).then((res) => {
				if (res['code'] == '0000') resolve(res)
				else reject(res)
			},(err) => {
				reject(err);
			});
		})
	}
}