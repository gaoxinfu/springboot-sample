package com.gaoxinfu.springboot.sample.openfeign.client.controller;

import com.gaoxinfu.springboot.sample.openfeign.client.client.ServerFeignClient;
import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexReqDto;
import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexResDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/6 21:47
 * @Version 1.0.0
 */
@RestController
@Controller
public class DemoController {

    @Resource
    private ServerFeignClient serverFeignClient;

    @GetMapping("/client/index")
    public IndexResDto index(@RequestParam int id) {
        return serverFeignClient.index(new IndexReqDto(id));
    }
}