
# import swagger jar【pom.xml】

```xml
<dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-spring-boot-starter</artifactId>
            <version>2.0.6</version>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.plugin</groupId>
                    <artifactId>spring-plugin-core</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.springframework.plugin</groupId>
            <artifactId>spring-plugin-core</artifactId>
            <version>2.0.0.RELEASE</version>
        </dependency>
```

# swagger config【SwaggerConfig.java】
```java
package com.gaoxinfu.springboot.sample.swagger3.common.config;

import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

/**
 * @Description:[一句话描述该类的功能]
 * @Author:gaoxinfu
 * @Date:2022/7/17 20:50
 * @Version 1.0.0
 */
@Configuration
@EnableSwagger2WebMvc
@EnableKnife4j
@ConditionalOnExpression("${knife4j.enable}") //开启访问接口文档的权限  **knife4j.enable是在yml配置文件中配置为true**
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()).select()
                .apis(RequestHandlerSelectors.basePackage("com.gaoxinfu.springboot.sample.swagger3.controller"))
                .paths(PathSelectors.any()).build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Spring Boot中使用Swagger2构建RESTful APIs(带认证）")
                .description("")
                .termsOfServiceUrl("").version("1.0").build();
    }
}
```

# config properties 【application.properties】

```properties
knife4j.basic.username=admin
knife4j.basic.password=123
knife4j.basic.enable=true
knife4j.production=false
knife4j.enable=true
```

# controller request response 

```java

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
```

```java
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
```

```java
@ApiModel(value = "index响应出参对象")
public class IndexResDto {
    @ApiModelProperty(value = "id主键")
    private int id;
    @ApiModelProperty(value = "姓名")
    private String name;
    @ApiModelProperty(value = "性别")
    private String sex;
    @ApiModelProperty(value = "年龄")
    private int age;

    public IndexResDto() {
    }

    public IndexResDto(int id, String name, String sex, int age) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

}
```

# login doc

```java
http://127.0.0.1:8083/doc.html
账户/密码：admin/123
```


