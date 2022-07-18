# server demo 演示

## 创建server项目
<img width="1202" alt="image" src="https://user-images.githubusercontent.com/26900268/179634074-583da013-6e41-424d-a90d-ffa94bc35745.png">

## application.properties配置
```properties
spring.application.name=springboot-sample-openfeign-server
server.port=8086
```
## import jar [pom.xml]
```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.gaoxinfu.springboot.sample.openfeign</groupId>
    <artifactId>springboot-sample-openfeign-server</artifactId>
    <version>1.0.0</version>
    <name>springboot-sample-openfeign-server</name>
    <description>springboot-sample-openfeign-server</description>
    <packaging>pom</packaging>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <repositories>
        <repository>
            <id>maven-public</id>
            <name>maven-public</name>
            <url>http://localhost:8081/repository/maven-public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>always</updatePolicy>
                <checksumPolicy>warn</checksumPolicy>
            </snapshots>
        </repository>
    </repositories>

    <!-- 发布选项: id必须与setting.xml文件中server的id相同 -->
    <distributionManagement>
        <repository>
            <id>releases</id>
            <name>Nexus Release Repository</name>
            <url>http://localhost:8081/repository/releases/</url>
        </repository>
        <snapshotRepository>
            <id>snapshots</id>
            <name>Nexus Snapshot Repository</name>
            <url>http://localhost:8081/repository/snapshots/</url>
        </snapshotRepository>
    </distributionManagement>

    <dependencies>
        <!-- This is a web application -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <resources>
            <resource>
                <directory>${basedir}/src/main/webapp</directory>
                <targetPath>META-INF/resources</targetPath>
                <includes>
                    <include>**/**</include>
                </includes>
            </resource>
            <resource>
                <directory>${basedir}/src/main/resources</directory>
                <includes>
                    <include>**/**</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```

## 创建服务端的restful controller
```java

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
```

## 验证
<img width="1205" alt="image" src="https://user-images.githubusercontent.com/26900268/179634368-cd579d35-7965-442b-872b-74b48054ae3d.png">




# openfeign client demo 

## 创建client项目

<img width="1375" alt="image" src="https://user-images.githubusercontent.com/26900268/179634537-5d6c7fb4-ce9a-40f5-a8e2-a88f002bdf61.png">

## import jar【pom.xml】
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.gaoxinfu.springboot.sample.openfeign</groupId>
    <artifactId>springboot-sample-openfeign-client</artifactId>
    <version>1.0.0</version>
    <name>springboot-sample-openfeign-client</name>
    <description>springboot-sample-openfeign-client</description>
    <packaging>pom</packaging>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <repositories>
        <repository>
            <id>maven-public</id>
            <name>maven-public</name>
            <url>http://localhost:8081/repository/maven-public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
                <updatePolicy>always</updatePolicy>
                <checksumPolicy>warn</checksumPolicy>
            </snapshots>
        </repository>
    </repositories>

    <!-- 发布选项: id必须与setting.xml文件中server的id相同 -->
    <distributionManagement>
        <repository>
            <id>releases</id>
            <name>Nexus Release Repository</name>
            <url>http://localhost:8081/repository/releases/</url>
        </repository>
        <snapshotRepository>
            <id>snapshots</id>
            <name>Nexus Snapshot Repository</name>
            <url>http://localhost:8081/repository/snapshots/</url>
        </snapshotRepository>
    </distributionManagement>

    <dependencies>
        <!-- This is a web application -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <!--springboot版本与springcloud版本必须按照官方的要求一直-->
                <version>Greenwich.SR6</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <resources>
            <resource>
                <directory>${basedir}/src/main/webapp</directory>
                <targetPath>META-INF/resources</targetPath>
                <includes>
                    <include>**/**</include>
                </includes>
            </resource>
            <resource>
                <directory>${basedir}/src/main/resources</directory>
                <includes>
                    <include>**/**</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```
### 注意 springboot与springcloud版本的一个对照 参考
https://blog.csdn.net/u014636209/article/details/125863935?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22125863935%22%2C%22source%22%3A%22u014636209%22%7D&ctrtid=dXJ80

## application.properties配置

```java
spring.application.name=springboot-sample-openfeign-client
server.port=8085
```

## 调用服务端的client接口编码

```java
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

```

## 客户端restful controller编码

```java
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
```

## 客户端调用验证
<img width="1374" alt="image" src="https://user-images.githubusercontent.com/26900268/179634867-086248af-9279-4b61-b5f2-e7635aa8556f.png">


# 源码
https://github.com/gaoxinfu/springboot-sample/tree/master/springboot-sample-openfeign

# 写在最后

欢迎点赞，收藏，转发，关注，一起学习，一起成长
https://github.com/gaoxinfu/springboot-sample/tree/master/springboot-sample-openfeignd现在
https://github.com/gaoxinfu/springboot-sample/tree/master/springboot-sample-openfeign




