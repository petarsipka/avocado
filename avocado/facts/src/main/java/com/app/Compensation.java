package com.app;

import java.io.Serializable;

public class Compensation implements Serializable {

    private String article;
    private double amountEur;
    private String explanation;

    public Compensation() {}

    public Compensation(String article, double amountEur, String explanation) {
        this.article = article;
        this.amountEur = amountEur;
        this.explanation = explanation;
    }

    public String getArticle() { return article; }
    public void setArticle(String article) { this.article = article; }

    public double getAmountEur() { return amountEur; }
    public void setAmountEur(double amountEur) { this.amountEur = amountEur; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}
