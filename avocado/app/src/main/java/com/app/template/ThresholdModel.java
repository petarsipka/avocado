package com.app.template;

public class ThresholdModel {

    private double minDelayHours;
    private String article;
    private String description;

    public ThresholdModel() {}

    public ThresholdModel(double minDelayHours, String article, String description) {
        this.minDelayHours = minDelayHours;
        this.article = article;
        this.description = description;
    }

    public double getMinDelayHours() { return minDelayHours; }
    public void setMinDelayHours(double minDelayHours) { this.minDelayHours = minDelayHours; }

    public String getArticle() { return article; }
    public void setArticle(String article) { this.article = article; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
