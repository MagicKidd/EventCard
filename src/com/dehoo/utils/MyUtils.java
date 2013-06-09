package com.dehoo.utils;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.dehoo.beans.Alldata;
import com.dehoo.beans.Eventdata;

/**
 * @author dehoo­HuangDong 2013-6-6上午11:17:38
 * @version jdk 1.6;
 */
public class MyUtils {

	/**
	 * Function: alldataToJSON 将“alldata”表中的数据查询处理转换成json数组
	 * @author dehoo­HuangDong 2013-6-7下午3:56:15
	 * @param list
	 * @return JSONArray
	 */
	public static JSONArray alldataToJSON(List<Alldata> list) {
		JSONArray array = new JSONArray();
		try {
			for (Alldata alldata : list) {
				JSONObject object = new JSONObject();
				object.put("id", alldata.getId());
				object.put("title_1", alldata.getTitle1());
				object.put("title_2", alldata.getTitle2());
				object.put("iamge", alldata.getImage());
				array.put(object);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return array;
	}
	
	/**
	 * Function: eventdataToJSON 将“eventdata”表中的数据全部查询出来转换成json数组
	 * @author dehoo­HuangDong 2013-6-7下午3:57:32
	 * @param list
	 * @return JSONArray
	 */
	public static JSONArray eventdataToJSON(List<Eventdata> list) {
		JSONArray array = new JSONArray();
		try {
			for (Eventdata eventdata : list) {
				JSONObject object = new JSONObject();
				object.put("id", eventdata.getId());
				object.put("title_1", eventdata.getTitle1());
				object.put("title_2", eventdata.getTitle2());
				object.put("iamge", eventdata.getImage());
				array.put(object);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return array;
	}

}
