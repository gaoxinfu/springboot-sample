package com.gaoxinfu.springboot.sample.openfeign.server.dto;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/17 20:37
 * @Version 1.0.0
 */
public class IndexReqDto {
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
