<?php
/**
 * 文件操作类
*/
class fileoperate{
	var $path;// 文件路径
	var $name;//文件名
	var $result;//对文件操作后的结果
	
	/**
	* 获取目录和文件列表
	* switch为2只列出目录，switch为3只列出文件
	*/
	function list_file($path, $switch) {
		if (file_exists($path)) {
			$result=array();
			$dir = scandir($path);
			if ($switch == 1) {
				for ($i = 0; $i < count($dir); $i++) {
					if ($dir[$i] != "." && $dir[$i] != "..") {
						//echo "<div>".$dir[$i]."</div>";
						$result[]=$dir[$i];
					}
				}
			}
			if ($switch == 2) {
				for ($i = 0; $i < count($dir); $i++) {
					$x = is_dir($path.$dir[$i]);
					if ($dir[$i] != "." && $dir[$i] != ".." && $x == true) {
						//echo "<div>".$dir[$i]."</div>";
						$result[]=$dir[$i];
					}
				}
			}
			if ($switch == 3) {
				for ($i = 0; $i < count($dir); $i++) {
					$x = is_dir($path.$dir[$i]);
					if ($dir[$i] != "." && $dir[$i] != ".." && $x == false) {
						//echo "<div>".$dir[$i]."</div>";
						$result[]=$dir[$i];
					}
				}
			}
			return $result;
		}
	}
	
	/**
	* 获取文件内容
	*/
	function read_file($path) {
		if (file_exists($path)) {
			$content = file_get_contents($path);
			return $content;
		}
	}

	/**
	* 修改文件内容
	*/
	function write_file($path, $content) {
		if (file_exists($path)) {
			$handle = fopen($path, 'w');
			if (fwrite($handle, $content));
			return true;
		}
	}
}
?>