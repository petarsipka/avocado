package com.app;

import java.io.Serializable;

public class Notification implements Serializable {

    private String message;
    private String article;

    public Notification() {}

    public Notification(String message, String article) {
        this.message = message;
        this.article = article;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getArticle() { return article; }
    public void setArticle(String article) { this.article = article; }
}
