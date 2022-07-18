package com.gaoxinfu.springboot.sample.openfeign.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@EnableFeignClients
@SpringBootApplication
public class OpenfeginClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(OpenfeginClientApplication.class, args);
    }
}


