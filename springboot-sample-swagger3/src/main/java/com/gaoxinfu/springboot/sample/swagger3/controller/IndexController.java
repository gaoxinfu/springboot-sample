package com.gaoxinfu.springboot.sample.swagger3.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/6 21:47
 * @Version 1.0.0
 */
@RestController
@Controller
public class IndexController {

    @RequestMapping("/index")
    public String index() {
        return "index";
    }
}