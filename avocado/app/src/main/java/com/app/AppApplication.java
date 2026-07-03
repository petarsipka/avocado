package com.app;

import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AppApplication {
    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    public KieContainer kieContainer() {
        KieServices ks = KieServices.Factory.get();
        return ks.getKieClasspathContainer();
    }
}
