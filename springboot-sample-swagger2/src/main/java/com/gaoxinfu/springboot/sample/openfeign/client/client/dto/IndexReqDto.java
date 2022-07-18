package com.gaoxinfu.springboot.sample.openfeign.client.client.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/17 20:37
 * @Version 1.0.0
 */
@ApiModel(value = "index入参请求对象")
public class IndexReqDto {
    @ApiModelProperty(value = "id主键")
    private int id;

    public IndexReqDto() {
    }

    public IndexReqDto(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "IndexReqDto{" +
                "id=" + id +
                '}';
    }
}
