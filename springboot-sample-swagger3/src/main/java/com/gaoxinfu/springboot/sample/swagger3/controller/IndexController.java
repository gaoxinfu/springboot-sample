package com.gaoxinfu.springboot.sample.swagger3.controller;

import com.gaoxinfu.springboot.sample.swagger3.dto.IndexReqDto;
import com.gaoxinfu.springboot.sample.swagger3.dto.IndexResDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/6 21:47
 * @Version 1.0.0
 */
@Slf4j
@RestController
@Controller
public class IndexController {

    @PostMapping("/index")
    public IndexResDto index(@RequestBody IndexReqDto indexReqDto) {
        log.info("indexReqDto = "+indexReqDto);
        return new IndexResDto(1,"gaoxinfu","man",18);
    }
}