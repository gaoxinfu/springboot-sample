package com.gaoxinfu.springboot.sample.openfeign.client.client;

import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexReqDto;
import com.gaoxinfu.springboot.sample.openfeign.client.client.dto.IndexResDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/19 07:16
 * @Version 1.0.0
 */
@FeignClient(name = "demo",url = "http://localhost:8086")
public interface ServerFeignClient {

    @GetMapping("/index")
    IndexResDto index(@RequestBody IndexReqDto indexReqDto);
}
