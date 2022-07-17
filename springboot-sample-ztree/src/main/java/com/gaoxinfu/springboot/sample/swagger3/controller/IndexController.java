package com.gaoxinfu.springboot.sample.swagger3.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/6 21:47
 * @Version 1.0.0
 */
@Controller
public class IndexController {

    @RequestMapping("/index")
    public String index(Map<String, Object> model) {
        model.put("message", "这里是Index主页");
        return "index";
    }
}