package com.app;

import java.io.Serializable;

public class Right implements Serializable {

    private RightType type;
    private String article;
    private String description;

    public Right() {}

    public Right(RightType type, String article, String description) {
        this.type = type;
        this.article = article;
        this.description = description;
    }

    public RightType getType() { return type; }
    public void setType(RightType type) { this.type = type; }

    public String getArticle() { return article; }
    public void setArticle(String article) { this.article = article; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
