package com.dehoo.utils;

import java.util.Date;

import com.dehoo.beans.Eventdata;
import com.dehoo.dao.AllDataDao;
import com.dehoo.dao.EventDataDao;

/**
 * 前端页面和后台程序的数据交互模块 （在线模式）
 * @author dehoo­HuangDong 2013-6-7下午3:42:13
 * @version jdk 1.6;
 */
public class DBUtils {
	AllDataDao allDataDao = new AllDataDao();
	EventDataDao eventDataDao = new EventDataDao();

	/**
	 * Function: insertIntoEventdata 将从拓展功能栏点击接收的id存储至 “eventdata”表中--可覆盖
	 * @author dehoo­HuangDong 2013-6-7下午3:52:33
	 * @param id 从页面上传回来的id值
	 */
	public void insertIntoEventdata(String id) {
		int eventcard_id = Integer.valueOf(id).intValue();
		if (this.eventDataDao.isInEventdata(id)) {
			this.eventDataDao.delete(eventcard_id);
		}
		int _id = this.allDataDao.queryById(eventcard_id).getId();
		String title_1 = this.allDataDao.queryById(eventcard_id).getTitle1();
		String title_2 = this.allDataDao.queryById(eventcard_id).getTitle2();
		String image = this.allDataDao.queryById(eventcard_id).getImage();
		Date date = new Date();
		String currentTime = String.valueOf(date.getTime());
		Eventdata eventdata = new Eventdata(eventcard_id, title_1, title_2,
				image, currentTime);
		this.eventDataDao.add(eventdata);
	}
	
}
