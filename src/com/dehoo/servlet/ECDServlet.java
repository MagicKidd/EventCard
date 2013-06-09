package com.dehoo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.dehoo.beans.Alldata;
import com.dehoo.beans.Eventdata;
import com.dehoo.dao.AllDataDao;
import com.dehoo.dao.EventDataDao;
import com.dehoo.utils.DBUtils;
import com.dehoo.utils.MyUtils;

@SuppressWarnings("serial")
public class ECDServlet extends HttpServlet {
	AllDataDao allDataDao = new AllDataDao();
	EventDataDao eventDataDao = new EventDataDao();
	List<Alldata> alldatas = null;
	List<Eventdata> eventdatas = null;
	DBUtils dbUtils = new DBUtils();

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// request.getRequestURI();
		String id = request.getParameter("id");
		System.out.println("request.getParameter('id') = " + id);
		if (id != null) {
			/** 接受页面点击的信号，存入数据库中 */
			this.dbUtils.insertIntoEventdata(id);
		}
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		this.alldatas = this.allDataDao.queryAll();
		/** 显示alldata表中的数据 */
		// JSONArray array = MyUtils.alldataToJSON(alldatas);

		this.eventdatas = this.eventDataDao.queryAll();
		/** 显示eventdata表中的数据 */
		JSONArray array = MyUtils.eventdataToJSON(eventdatas);

		String datas = array.toString();
		/** 将处理完的json数据以字符串格式显示在页面上相应请求 */
		out.print(datas);

		out.flush();
		out.close();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
