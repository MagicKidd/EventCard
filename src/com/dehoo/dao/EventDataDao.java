package com.dehoo.dao;

import java.util.LinkedList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.dehoo.beans.Eventdata;
import com.dehoo.beans.HibernateSessionFactory;

public class EventDataDao {

	/**
	 * Function: add 添加数据到eventdata表中
	 * @author dehoo­HuangDong 2013-6-6下午5:12:37
	 * @param eventdata
	 */
	public void add(Eventdata eventdata) {
		Session session = null;
		Transaction transaction = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			transaction = session.getTransaction();
			transaction.begin(); // 别忘了先开始事务
			session.save(eventdata);
			transaction.commit();
			session.flush();
		} catch (Exception e) {
			e.printStackTrace();
			if (transaction != null) {
				transaction.rollback();
			}
		} finally {
			transaction = null;
			session.close();
		}
	}

	/**
	 * Function: delete 根据id删除eventdata表中的数据
	 * @author dehoo­HuangDong 2013-6-6下午4:58:45
	 * @param id
	 */
	public void delete(int id) {
		Session session = null;
		Transaction transaction = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			transaction = session.getTransaction();
			transaction.begin();
			String hql = "delete from Eventdata where id = " + id;
			if (this.queryById(id) != null) {
				Query queryupdate = session.createQuery(hql);
				int ret = queryupdate.executeUpdate();
				transaction.commit();
			}
			session.flush();
		} catch (Exception e) {
			e.printStackTrace();
			if (transaction != null) {
				transaction.rollback();
			}
		} finally {
			session.close();
			transaction = null;
		}
	}

	/**
	 * Function: queryAll 根据插入顺序查询eventdata表中的数据，并存储在LinkedList中
	 * @author dehoo­HuangDong 2013-6-6下午5:28:37
	 * @return LinkedList<Eventdata>
	 */
	public LinkedList<Eventdata> queryAll() {
		Session session = null;
		List<Eventdata> list = null;
		LinkedList<Eventdata> linkedList = new LinkedList<Eventdata>();
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			String hql = " from Eventdata order by date desc";
			Query query = session.createQuery(hql);
			list = query.list();
			if (query == null || list.size() == 0) {
				System.out.println("EventDataDao-queryAll-query has no data！");
				return null;
			}
			for (Eventdata eventdata : list) {
				linkedList.add(eventdata);
			}
		} finally {
			session.close();
		}
		return linkedList;
	}

	/**
	 * Function: queryById 根据id查询eventdata表中的数据
	 * @author dehoo­HuangDong 2013-6-6下午4:43:28
	 * @param id
	 * @return Eventdata
	 */
	public Eventdata queryById(Integer id) {
		Session session = null;
		Eventdata eventdata = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			eventdata = (Eventdata) session.get(Eventdata.class, id);
			if (eventdata == null) {
				System.out.println("EventDataDao-queryById-query has no data！");
				return null;
			}
		} finally {
			session.close();
		}
		return eventdata;
	}

	/**
	 * Function: isInEventdata 判断id是否在eventdata表中
	 * @author dehoo­HuangDong 2013-6-6下午6:08:29
	 * @param id
	 * @return boolean
	 */
	public boolean isInEventdata(String id) {
		Session session = null;
		Eventdata eventdata = null;
		try {
			session = HibernateSessionFactory.getSessionFactory().openSession();
			eventdata = (Eventdata) session.get(Eventdata.class, Integer.valueOf(id).intValue());
			if (eventdata == null) {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			session.close();
		}
		return true;
	}

}
