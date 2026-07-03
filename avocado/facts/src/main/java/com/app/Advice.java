package com.app;

import java.io.Serializable;

public class Advice implements Serializable {

    private String text;
    private String article;

    public Advice() {}

    public Advice(String text, String article) {
        this.text = text;
        this.article = article;
    }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getArticle() { return article; }
    public void setArticle(String article) { this.article = article; }
}
