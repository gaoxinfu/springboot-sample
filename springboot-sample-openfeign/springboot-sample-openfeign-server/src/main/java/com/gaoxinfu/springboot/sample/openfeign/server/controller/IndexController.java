package com.gaoxinfu.springboot.sample.openfeign.server.controller;


import com.gaoxinfu.springboot.sample.openfeign.server.dto.IndexReqDto;
import com.gaoxinfu.springboot.sample.openfeign.server.dto.IndexResDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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


    @PostMapping("/index")
    public IndexResDto index(@RequestBody IndexReqDto indexReqDto) {
        System.out.println("indexReqDto = "+indexReqDto);
        return new IndexResDto(1,"gaoxinfu","man",18);
    }
}