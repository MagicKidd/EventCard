
服务端框架结构


EventCard（项目名称）
　　|——src
        |——com.dehoo.beans		数据库反转后自动生成的java文件及xml文件
　　    |——com.dehoo.dao		  数据库的基本操作
　　    |——com.dehoo.servlet	处理前端页面的请求并响应
　　    |——com.dehoo.utils		工具类
　　    |——hibernate.cfg.xml	hibernate框架的配置文件
　　|——WebRoot
　　    |——EventCardDemo	  	服务器端的页面（在线模式的模板页面）
　　    |——Css			
　      |——Images
　　    |——Js
　　    |——Lib	            	前端框架
　　    |——Model	          	前端的model层
　   　 |——Template		        页面模板
　　    |——TV				          第一屏页面
　　    |——View			          前端的view层
　　


服务端框架结构如上所示。使用Servlet处理页面的请求，hibernate框架管理数据库，后台数据库使用MySql。

数据库连接的用户名为root，密码为dehoo，数据库名为eventcard.db，现已建立两张表：
　　1.alldata 	 ——   用于存放所有的后台数据。
　　2.eventdata  ——   用于存放接收页面事件卡拓展功能的点击信号，从alldata表中查询出对应的eventcard并存储在此表中，
　　此表有一个关键的字段	 “date”，记录点击信号触发时的时间，在第一屏的事件卡，就是根据这个“date”字段进行排序。

