package com.gaoxinfu.springboot.sample.swagger3.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/17 20:37
 * @Version 1.0.0
 */
@ApiModel(value = "index入参请求对象")
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class IndexReqDto {
    @ApiModelProperty(value = "id主键")
    private int id;
}
