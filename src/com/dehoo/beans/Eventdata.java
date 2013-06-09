package com.dehoo.beans;

/**
 * Eventdata entity. @author MyEclipse Persistence Tools
 */

public class Eventdata implements java.io.Serializable {

	// Fields

	private Integer id;
	private String title1;
	private String title2;
	private String image;
	private String date;

	// Constructors

	/** default constructor */
	public Eventdata() {
	}

	/** minimal constructor */
	public Eventdata(Integer id, String date) {
		this.id = id;
		this.date = date;
	}

	/** full constructor */
	public Eventdata(Integer id, String title1, String title2, String image,
			String date) {
		this.id = id;
		this.title1 = title1;
		this.title2 = title2;
		this.image = image;
		this.date = date;
	}

	// Property accessors

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle1() {
		return this.title1;
	}

	public void setTitle1(String title1) {
		this.title1 = title1;
	}

	public String getTitle2() {
		return this.title2;
	}

	public void setTitle2(String title2) {
		this.title2 = title2;
	}

	public String getImage() {
		return this.image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDate() {
		return this.date;
	}

	public void setDate(String date) {
		this.date = date;
	}

}