package com.gaoxinfu.springboot.sample.openfeign.client.controller;

import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexReqDto;
import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexResDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = "Index")
@RestController
@Controller
public class IndexController {


    @ApiOperation(value = "index方法")
    @PostMapping("/index")
    public IndexResDto index(@RequestBody IndexReqDto indexReqDto) {
        System.out.println("indexReqDto = "+indexReqDto);
        return new IndexResDto(1,"gaoxinfu","man",18);
    }
}