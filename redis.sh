#!/bin/bash
#接收参数：redis压缩包绝对路径
src=$1
#接收参数：redis安装绝对路径
target=$2
echo $src
unzipParentDir=${src%/*}
temp=${src%t*}
#解压缩后的目录
unzipDir=${temp%.*}
echo "directory :"$unzipParentDir
echo "file path :"$unzipDir
#unzip tar file to current directory
#解压缩
tar -xzvf $src -C $unzipParentDir
#进入解压后的目录
cd $unzipDir
echo `pwd`
#编译
make
#安装
make PREFIX=$target install
#复制redis配置文件
cp -f redis.conf $target"/"bin
#进入安装目录下的bin目录
cd $target"/bin"
#支持远程连接
sed -i 's|bind 127.0.0.1|# bind 127.0.0.1|' redis.conf
#设置redis密码，默认密码123
sed -i 's|# requirepass foobared|requirepass 123|' redis.conf
#redis服务后台启动
sed -i 's|daemonize no|daemonize yes|' redis.conf
#启动redis
./redis-server redis.conf
#开放redis防火墙端口
iptables -A INPUT -p tcp --dport 6379 -j ACCEPT
iptables -A OUTPUT -p tcp --sport 6379 -j ACCEPT
#保存规则
service iptables save