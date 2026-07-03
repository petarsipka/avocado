package com.app;

public enum DisruptionCause {
    NONE,
    TECHNICAL_FAULT,       // not extraordinary (Wallentin-Hermann C-549/07)
    WEATHER,               // extraordinary (recital 14)
    POLITICAL_INSTABILITY, // extraordinary (recital 14)
    SECURITY_RISK,         // extraordinary (recital 14)
    ATC_STRIKE,            // extraordinary (recital 14)
    AIRPORT_STRIKE,        // extraordinary (recital 14)
    ATM_DECISION,          // extraordinary (recital 15)
    AIRLINE_STAFF_STRIKE   // not extraordinary (Krusemann C-195/17)
}
