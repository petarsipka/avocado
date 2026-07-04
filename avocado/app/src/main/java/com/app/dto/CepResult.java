package com.app.dto;

import com.app.MissedConnection;
import com.app.Notification;

import java.util.ArrayList;
import java.util.List;

public class CepResult {

    private List<Notification> notifications = new ArrayList<>();
    private List<MissedConnection> missedConnections = new ArrayList<>();

    public List<Notification> getNotifications() { return notifications; }
    public void setNotifications(List<Notification> notifications) { this.notifications = notifications; }

    public List<MissedConnection> getMissedConnections() { return missedConnections; }
    public void setMissedConnections(List<MissedConnection> missedConnections) { this.missedConnections = missedConnections; }
}
