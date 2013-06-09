package com.dehoo.beans;

/**
 * Alldata entity. @author MyEclipse Persistence Tools
 */

public class Alldata implements java.io.Serializable {

	// Fields

	private Integer id;
	private String title1;
	private String title2;
	private String image;

	// Constructors

	/** default constructor */
	public Alldata() {
	}

	/** full constructor */
	public Alldata(Integer id, String title1, String title2, String image) {
		this.id = id;
		this.title1 = title1;
		this.title2 = title2;
		this.image = image;
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

}