<?php
class RegisterApi{
	protected $key 			= null;
	protected $apiServer 	= null;

	/**
	 * Api 初始化方法，可通过$config传参直接设定Api的key及server
	 * @params $config   $config['key']设定验证的key，$config['server']设置API请求的服务器端URL
	 *
	 */
	public function __construct($config=array()){
		if(isset($config['key'])) $this->setKey($config['key']);
		if(isset($config['server'])) $this->setApiServer($config['server']);
	}

	/**
	 * 设置key方法
	 * @params $key		验证的key
	 *
	 */
	public function setKey($key){
		$this->key = $key;
	}

	/**
	 * 设置Api服务器
	 * @params $server  API请求的服务器端URL
	 *
	 */
	public function setApiServer($server){
		$this->apiServer = $server;
	}

	/**
	 * 注册方法
	 * @important	$data['signCode'] 	是验证参数，必需
	 * @params 		$data				需要传给Api服务器端的参数
	 * @params 		$config				POST/GET方法与超时设定参数
	 * @return 			API返回值
	 * @example
		$data = array(
			'from'		=> 'abc',
			'username'	=> 'abc',
			'code'		=> '123456',
			'signCode'	=> '123456',
		);
		$config = array(
			'timeout'	=> 30,
			'method'	=> 'POST',
		);
	 */
	public function register($data, $config=array()){
		if(!isset($data['signCode'])) return 'data参数必需带signCode参数，作为验证参数';
		$data['sign'] = $this->getSignKeyed($data['signCode'].$this->getKey().$data['time']);
		unset($data['signCode']);
		$apiServer = $this->getApiServer();
		 
		return $this->send($apiServer, $data, $config);
	}

public function updatepass($data, $config=array()){
		if(!isset($data['signCode'])) return 'data参数必需带signCode参数，作为验证参数';
		$data['sign'] = $this->getSignKeyed($data['username'].$data['signCode'].$this->getKey().$data['time']);
		unset($data['signCode']);
		$apiServer = $this->getApiServer();
		return $this->send($apiServer, $data, $config);
	}
	/**
	 * 用户名检测方法
	 * @important	$data['signCode'] 	是验证参数，必需
	 * @params 		$data				需要传给Api服务器端的参数
	 * @params 		$config				POST/GET方法与超时设定参数
	 * @return 							API返回值
	 * @example
		$data = array(
			'from'		=> 'abc',
			'username'	=> 'abc',
			'time'		=> time(),
			'signCode'	=> time(),
		);
		$config = array(
			'timeout'	=> 30,
			'method'	=> 'POST',
		);
	 */
	public function checkUsername($data, $config=array()){
		if(!isset($data['signCode'])) return 'data参数必需带signCode参数，作为验证参数';
		$data['sign'] = $this->getSign($data['signCode']);
		unset($data['signCode']);
		$apiServer = $this->getApiServer();
		return $this->send($apiServer, $data, $config);
	}
	
	/**
	 * Api 发送请求方法
	 * @params $url 	API请求的服务器端URL
	 * @params $data	需要传给Api服务器端的参数
	 * @params $config	POST/GET方法与超时设定参数
	 * @return 			API返回值
	 */
	public function send($url, $data = null, $config = array()) {
		$timeout = isset($config['timeout']) ? (int)$config['timeout'] : 60;
		$method = isset($config['method']) ? $config['method'] : 'POST';

		//调整file_get_contents超时时间
		$default_socket_timeout = ini_get('default_socket_timeout');
		ini_set('default_socket_timeout', $timeout);

		//根据不同方法调取
		switch(strtoupper($method)){
			case 'POST':
				$context = array();
				if (is_array($data)) {
					$context['http'] = array (
						'timeout'	=> $timeout,
						'method' 	=> $method,
						'content'	=> http_build_query($data),
					);
				}
				return @file_get_contents($url, false, stream_context_create($context));

				break;
			default:
				return @file_get_contents($url.'?'.http_build_query($data));
				break;
		}

		//还原程序默认超时时间
		ini_set('default_socket_timeout', $default_socket_timeout);
	}

	/**
	 * 获取key方法
	 * @return 验证的key
	 *
	 */
	protected function getKey(){
		return $this->key;
	}

	/**
	 * 获取API请求的服务器端URL
	 * @return API请求的服务器端URL
	 *
	 */
	protected function getApiServer(){
		return $this->apiServer;
	}

	/**
	 * 生成认证密码
	 * @code			认证的参数
	 * @method			认证加密的方法，如：md5/sha1
	 * @return 			认证密码
	 */
	protected function getSign($code, $method='md5'){
		$key = $code . $this->getKey();
		if(function_exists($method)) return $method($key);
		else return md5($key);
	}
	
	protected function getSignKeyed($key, $method='md5'){
		if(function_exists($method)) return $method($key);
		else return md5($key);
	}
}
?>