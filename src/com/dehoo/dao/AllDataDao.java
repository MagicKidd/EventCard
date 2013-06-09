package com.dehoo.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;

import com.dehoo.beans.Alldata;
import com.dehoo.beans.HibernateSessionFactory;

/**
 * @author dehoo­HuangDong 2013-6-6上午11:19:27
 * @version jdk 1.6;
 */
public class AllDataDao {

	// 增
	public void add(Integer id) {

	}

	// 删
	public void delete() {

	}

	// 改
	public void update() {

	}

	/**
	 * Function: queryAll 查询所有
	 * @author dehoo­HuangDong 2013-6-6下午3:48:18
	 * @return List<Alldata>
	 */
	public List<Alldata> queryAll() {
		Session session = null;
		List<Alldata> list = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			/** HQL查询的是beans里的类，而不是数据表，所以是Alldata而不是alldata */
			String hql = " from Alldata ";
			Query query = session.createQuery(hql);
			list = query.list();
		} finally {
			session.close();
		}
		return list;
	}

	/**
	 * Function: queryById 根据id查询
	 * @author dehoo­HuangDong 2013-6-6下午3:48:35
	 * @param id 
	 * @return Alldata
	 */
	public Alldata queryById(Integer id) {
		Session session = null;
		List<Alldata> list = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			String hql = " from Alldata where id = " + id;
			Query query = session.createQuery(hql);
			list = query.list();
		} finally {
			session.close();
		}
		return list.get(0);
	}

}
