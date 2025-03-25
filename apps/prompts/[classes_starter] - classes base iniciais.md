# Classes inicias e configs

> Estou fazendo um projeto de um sistema de gerenciamento para freelancers e criadores de conteíºdo didrático elaborarem
> e
> gerenciarem seus alunos (estudantes). Existem vrárias classes que criei para armazenar no backend em NestJS com
> com MongoDB usando o Mongoose e o front serrá em Angular e o backend, frontend e o WPPConnect precisam estar em um
> monorepo. A classe Pessoa (classe principal), a classe Instrutor (o freelancer) e a classe Estudante (o
> aluno). O aluno só serrá o cliente e nío terá interaí§ío alguma com o sistema, apenas o Instrutor, mas assim como o
> Instrutor, Estudante é uma Pessoa. E para gerenciar melhor os contatos, o sistema AgePlan (o nome que dei a ele)
> permitirrá ao freelancer integrar o whatsapp web dentro do AgePlan. í‰ como essas extensío dos navegadores que
> transformam
> o whatsapp web em um crm. Mas meu projeto nío é uma extensío, mas sim um web-app fullstack e o whatsapp web serrá
> aberto
> dentro dele em uma prágima do sidebar chamada de Contatos. A questío é que, a classe Pessoa serrá o próprio contato do
> whatsapp web captado pelo sistema. O Instrutor nío vai manipular o whatsapp web pelo sistema, ele vai usar o whatsapp
> web diretamente como se estivesse abrindo pelo navegador, mas dentro do meu sistema. O que acontece é que o AgePlan
> atuarrá como se fosse um escaneador ou um bot de telemetria que vai captar os contatos, suas informações como o
> níºmero
> de
> celular, nome de perfil, foto de perfil e entre muitos outros dados pessoais trazidos pela API do whatsapp via
> WPPConnect que me retorna um enorme JSON como response. As conversas em si nío serío consideradas para o negócio, mas
> sim os atributos de cada contato como as tags que o whatsapp business tem para classificar um contato. Isso serrá
> íºtil
> para eu criar um quadro Kanban e atuar como um workflow comercial onde eu (ou o Instrutor/freelancer) pode categorizar
> se o contato é cliente (Estudante) ou nío para nío misturar contatos como as pessoas da famí­lia ou amigos por
> exemplo.
> O
> kanban pode conter as etapas: nío classificados (primeira coluna), uma vez classificados como Estudantes (ou clientes)
> a
> segunda coluna é "Oportunidades", a 3 é "Negociando" e etc. Lembrando que a definií§ío ou classificaí§ío dos contatos
> através das Tags, pode ser feita tanto pelo whatsapp direto, ou pelo sistema, por exemplo, seleciono ou abro uma
> conversa com alguém, vai aparecer um popup, ou um toast ou uma janelinha, ou pode ser até um botío com o í­cone de uma
> etiqueta que quando eu eu clicar, vai aparecer uma lista de tags e assim poder classificar o contato mais rrápido.
> Também
> haverío filtros que mostrarío coisas como "Aguardando sua resposta", ou "Cliente a responder" etc. Estou usando a
> arquitetura MVC com as camadas Entity, DTO, Repository, Mapper, Factory, Service e Controller. Por exemplo:

package pessoa:

- Pessoa
- PessoaDTO
- PessoaRepository
- PessoaMapper
- PessoaFactory
- PessoaService
- PessoaController

package instrutor:

- Instrutor
- InstrutorDTO
- ...etc

etc...

-------

## Configurações diversas

```java
package com.mongodb_testando.mongodb_teste.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * The type Open api config.
 */
@Configuration
public class OpenApiConfig {

    /**
     * Custom open api open api.
     *
     * @return the open api
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API MongoDB Teste")
                        .description("API para demonstraí§ío com MongoDB")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Vitor Santos")
                                .email("vitor.santos9@estudante.ifms.edu.br")));
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * The type Mongo config.
 */
@Configuration
@EnableMongoAuditing
public class MongoConfig {
}
```

---

```java
package com.mongodb_testando.mongodb_teste.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

/**
 * The type App config.
 */
@Configuration
public class AppConfig {

    /**
     * Rest template rest template.
     *
     * @return the rest template
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### application.properties

```properties
spring.application.name=mongodb_teste
spring.data.mongodb.uri=mongodb://localhost:27017/teste
server.port=8081
spring.data.mongodb.port=27017
spring.data.mongodb.database=teste
spring.data.mongodb.auto-index-creation=true
# Thymeleaf configuration
spring.thymeleaf.cache=false
spring.thymeleaf.mode=HTML
spring.thymeleaf.encoding=UTF-8
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
# Configurações do Swagger/OpenAPI
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
```

### Pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!--
      Definií§ío do projeto pai (Spring Boot)
      Herda configurações, dependíªncias e plugins do Spring Boot versío 3.2.4
    -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.4</version>
        <relativePath/>
    </parent>

    <!--
      Metadados do projeto
      - groupId: Identificador íºnico do grupo/organizaí§ío
      - artifactId: Nome do artefato/projeto
      - version: Versío atual do projeto
      - name: Nome de exibií§ío do projeto
      - description: Descrií§ío breve do projeto
    -->
    <groupId>com.mongodb_testando</groupId>
    <artifactId>mongodb_teste</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mongodb_teste</name>
    <description>mongodb_teste</description>

    <!--
      Propriedades do projeto
      - java.version: Versío do Java utilizada (Java 21)
      - org.mapstruct.version: Versío da biblioteca MapStruct para mapeamento de objetos
    -->
    <properties>
        <java.version>21</java.version>
        <org.mapstruct.version>1.6.3</org.mapstruct.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    </properties>

    <!--
      Repositórios adicionais
      - Repositório Sonatype para snapshots (versíµes de desenvolvimento)
      - Permite acesso a dependíªncias que ainda nío foram laní§adas oficialmente
    -->
    <repositories>
        <repository>
            <id>snapshots</id>
            <name>Sonatype snapshot repository</name>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>

    <!--
      Dependíªncias do projeto
      Agrupadas por funcionalidade/propósito
    -->
    <dependencies>
        <!--
          Spring Data MongoDB
          Fornece integraí§ío com MongoDB, incluindo modelos, conversores e mapeamento de documentos
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>

        <!--
          Spring Boot DevTools
          Ferramentas para desenvolvimento, incluindo reinicializaí§ío automrática e recarga de recursos
          Escopo "runtime" indica que nío é necessrário para compilaí§ío
          "optional" permite que outros projetos que dependem deste nío herdem esta dependíªncia
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!--
          Lombok
          Reduz código boilerplate através de anotações (@Getter, @Setter, @Builder, etc.)
          Gera automaticamente métodos como getters, setters, constructores e equals/hashCode
        -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!--
          Spring Boot Starter Test
          Framework de testes incluindo JUnit, Mockito e AssertJ
          Escopo "test" indica que só é usado durante a fase de testes
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!--
          Spring REST Docs
          Documentaí§ío de APIs RESTful baseada em testes
          Gera documentaí§ío precisa e atualizada a partir dos testes
        -->
        <dependency>
            <groupId>org.springframework.restdocs</groupId>
            <artifactId>spring-restdocs-mockmvc</artifactId>
            <scope>test</scope>
        </dependency>

        <!--
          Spring Boot Web
          Fornece componentes para desenvolvimento de aplicações web, incluindo RESTful APIs
          Inclui Spring MVC, Tomcat embutido e configurações web padrío
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!--
          Spring Boot Validation
          Suporte í  validaí§ío de beans usando Bean Validation (JSR-380)
          Implementa validações como @NotNull, @Size, @Email, etc.
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!--
          Thymeleaf
          Engine de templates para criaí§ío de práginas HTML no servidor
          Permite integraí§ío com Spring MVC para criar views diní¢micas
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <!--
          SpringDoc OpenAPI UI
          Gera documentaí§ío OpenAPI (Swagger) automaticamente para APIs REST
          Fornece interface Swagger UI para explorar e testar endpoints
        -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.5.0</version>
        </dependency>

        <!--
          MapStruct
          Framework para mapeamento entre objetos Java (DTO <-> Entity)
          Implementa mapeamentos tipo-seguro e alto desempenho
        -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${org.mapstruct.version}</version>
        </dependency>

        <!--
          Spring Boot Actuator
          Fornece endpoints para monitoramento e gerenciamento da aplicaí§ío em produí§ío
          Inclui health checks, métricas, info da aplicaí§ío, etc.
        -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>

    <!--
      Configuraí§ío de build
      Define plugins e suas configurações para o processo de build
    -->
    <build>
        <plugins>
            <!--
              Spring Boot Maven Plugin
              Empacota a aplicaí§ío Spring Boot em um JAR executrável
              Inclui dependíªncias, configura o Manifest e permite execuí§ío via 'mvn spring-boot:run'
            -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.3.1</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>

            <!--
              Maven Compiler Plugin
              Configura o compilador Java para o projeto
              Define versío do Java e processadores de anotaí§ío (Lombok e MapStruct)
            -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                    <annotationProcessorPaths>
                        <!-- Configuraí§ío para Lombok -->
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                            <version>${lombok.version}</version>
                        </path>
                        <!-- Configuraí§ío para MapStruct -->
                        <path>
                            <groupId>org.mapstruct</groupId>
                            <artifactId>mapstruct-processor</artifactId>
                            <version>${org.mapstruct.version}</version>
                        </path>
                        <!-- Integraí§ío entre Lombok e MapStruct -->
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok-mapstruct-binding</artifactId>
                            <version>0.2.0</version>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>

            <!--
              JaCoCo Maven Plugin
              Anrálise de cobertura de código para garantia de qualidade
              Gera relatórios de cobertura e verifica se atinge o mí­nimo definido (70%)
            -->
            <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.10</version>
                <executions>
                    <!-- Prepara o agente JaCoCo para coletar métricas -->
                    <execution>
                        <id>prepare-agent</id>
                        <goals>
                            <goal>prepare-agent</goal>
                        </goals>
                    </execution>
                    <!-- Gera relatório após os testes -->
                    <execution>
                        <id>report</id>
                        <phase>test</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                    <!-- Verifica se a cobertura atende ao mí­nimo definido -->
                    <execution>
                        <id>check</id>
                        <goals>
                            <goal>check</goal>
                        </goals>
                        <configuration>
                            <rules>
                                <rule>
                                    <element>BUNDLE</element>
                                    <limits>
                                        <limit>
                                            <counter>INSTRUCTION</counter>
                                            <value>COVEREDRATIO</value>
                                            <minimum>0.70</minimum>
                                        </limit>
                                    </limits>
                                </rule>
                            </rules>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

            <!--
              Asciidoctor Maven Plugin
              Processa documentaí§ío escrita em formato AsciiDoc
              Gera documentaí§ío HTML durante a fase de preparaí§ío do pacote
            -->
            <plugin>
                <groupId>org.asciidoctor</groupId>
                <artifactId>asciidoctor-maven-plugin</artifactId>
                <version>2.2.2</version>
                <executions>
                    <execution>
                        <id>generate-docs</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>process-asciidoc</goal>
                        </goals>
                        <configuration>
                            <backend>html</backend>
                            <doctype>book</doctype>
                            <attributes>
                                <snippets>${project.build.directory}/snippets</snippets>
                            </attributes>
                            <sourceDirectory>src/docs/asciidoc</sourceDirectory>
                            <outputDirectory>${project.build.directory}/generated-docs</outputDirectory>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

---

## Exceptions globais

```java
package com.mongodb_testando.mongodb_teste.exception;

/**
 * The type Resource not found exception.
 */
public class ResourceNotFoundException extends RuntimeException {
    /**
     * Instantiates a new Resource not found exception.
     *
     * @param message the message
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

/**
 * The type Business exception.
 */
public class BusinessException extends RuntimeException {
    /**
     * Instantiates a new Business exception.
     *
     * @param message the message
     */
    public BusinessException(String message) {
        super(message);
    }

    /**
     * Instantiates a new Business exception.
     *
     * @param message the message
     * @param cause   the cause
     */
    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

/**
 * The type Controller not found exception.
 */
public class ControllerNotFoundException extends RuntimeException {
    /**
     * Constrói uma nova ResourceNotFoundException com a mensagem detalhada especificada.
     *
     * @param message a mensagem detalhada.
     */
    public ControllerNotFoundException(String message) {
        super(message);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

import java.io.Serial;

/**
 * Classe de exceí§ío personalizada para lidar com erros relacionados ao banco de dados.
 * Esta classe estende a classe {@link RuntimeException}.
 */
public class DataBaseException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * Constrói uma nova DataBaseException com a mensagem detalhada especificada.
     *
     * @param msg a mensagem detalhada.
     */
    public DataBaseException(String msg) {
        super(msg);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.Instant;

/**
 * The type Global exception handler.
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle resource not found response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<StandardError> handleResourceNotFound(
            ResourceNotFoundException e, HttpServletRequest request) {
        log.error("Resource not found: {}", e.getMessage());
        return buildErrorResponse(HttpStatus.NOT_FOUND, "Resource not found", e.getMessage(), request);
    }

    /**
     * Handle validation errors response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> handleValidationErrors(
            MethodArgumentNotValidException e, HttpServletRequest request) {
        log.error("Validation error: {}", e.getMessage());

        ValidationError error = new ValidationError();
        error.setTimestamp(Instant.now());
        error.setStatus(HttpStatus.BAD_REQUEST.value());
        error.setError("Validation error");
        error.setMessage("Check the field(s) errors");
        error.setPath(request.getRequestURI());

        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            error.addFieldError(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Handle data integrity errors response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler({
            DuplicateKeyException.class,
            DataIntegrityViolationException.class
    })
    public ResponseEntity<StandardError> handleDataIntegrityErrors(
            Exception e, HttpServletRequest request) {
        log.error("Data integrity error: {}", e.getMessage());
        return buildErrorResponse(HttpStatus.CONFLICT, "Data integrity error",
                "A record with this identifier already exists", request);
    }

    /**
     * Handle bad request format response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler({
            HttpMessageNotReadableException.class,
            MethodArgumentTypeMismatchException.class
    })
    public ResponseEntity<StandardError> handleBadRequestFormat(
            Exception e, HttpServletRequest request) {
        log.error("Bad request format: {}", e.getMessage());
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Bad request format",
                "Check your request format and try again", request);
    }

    /**
     * Handle external service error response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<StandardError> handleExternalServiceError(
            ResourceAccessException e, HttpServletRequest request) {
        log.error("External service error: {}", e.getMessage());
        return buildErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, "External service error",
                "Could not access external service", request);
    }

    /**
     * Handle business exception response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<StandardError> handleBusinessException(
            BusinessException e, HttpServletRequest request) {
        log.error("Business rule violation: {}", e.getMessage());
        return buildErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, "Business rule violation",
                e.getMessage(), request);
    }

    /**
     * Handle generic exception response entity.
     *
     * @param e       the e
     * @param request the request
     * @return the response entity
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> handleGenericException(
            Exception e, HttpServletRequest request) {
        log.error("Unhandled exception", e);
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error",
                "An unexpected error occurred", request);
    }

    private ResponseEntity<StandardError> buildErrorResponse(
            HttpStatus status, String error, String message, HttpServletRequest request) {
        StandardError standardError = new StandardError();
        standardError.setTimestamp(Instant.now());
        standardError.setStatus(status.value());
        standardError.setError(error);
        standardError.setMessage(message);
        standardError.setPath(request.getRequestURI());
        return ResponseEntity.status(status).body(standardError);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

/**
 * The type Standard error.
 */
@Getter
@Setter
@NoArgsConstructor
public class StandardError {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Instant timestamp;
    private Integer status;
    private String error;
    private String message;
    private String path;
}
```

---

```java
package com.mongodb_testando.mongodb_teste.exception;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

/**
 * The type Validation error.
 */
@Getter
public class ValidationError extends StandardError {
    private final List<FieldMessage> fieldErrors = new ArrayList<>();

    /**
     * Add field error.
     *
     * @param fieldName the field name
     * @param message   the message
     */
    public void addFieldError(String fieldName, String message) {
        fieldErrors.add(new FieldMessage(fieldName, message));
    }

    /**
     * The type Field message.
     */
    @Getter
    public static class FieldMessage {
        private final String field;
        private final String message;

        /**
         * Instantiates a new Field message.
         *
         * @param field   the field
         * @param message the message
         */
        public FieldMessage(String field, String message) {
            this.field = field;
            this.message = message;
        }
    }
}
```

---

## Domains ou Entidades de negócio com camadas MVC

### Endereí§o

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.CepInvalidoException;
import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.ViaCepServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Cliente para integraí§ío com a API ViaCEP.
 * <p>
 * Esta classe é responsrável por realizar consultas í  API ViaCEP para obter informações
 * de endereí§os a partir de um CEP. Implementa as validações necessrárias antes de realizar
 * a requisií§ío HTTP e trata possí­veis erros de comunicaí§ío.
 * </p>
 */
@Component
public class ViaCepClient {
    private final RestTemplate restTemplate;

    /**
     * Construtor da classe ViaCepClient.
     *
     * @param restTemplate instí¢ncia de RestTemplate injetada pelo Spring para realizar                     requisições HTTP
     */
    public ViaCepClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Busca informações de endereí§o a partir de um CEP.
     * <p>
     * Este método realiza uma requisií§ío para a API ViaCEP e retorna os dados do endereí§o
     * correspondente ao CEP informado. Antes de realizar a requisií§ío, o método valida se:
     * <ul>
     *   <li>O CEP nío é nulo ou vazio</li>
     *   <li>O CEP contém exatamente 8 dí­gitos numéricos (após a remoí§ío de caracteres nío numéricos)</li>
     * </ul>
     * </p>
     *
     * @param cep o CEP a ser consultado (pode conter formataí§ío como hí­fens ou pontos)
     * @return objeto {@link EnderecoDTO} contendo as informações do endereí§o, ou {@code null} caso o CEP seja invrálido ou ocorra erro na requisií§ío
     * @throws RestClientException caso ocorra algum erro na comunicaí§ío com a API                             (tratado internamente)
     */
    public EnderecoDTO buscarPorCep(String cep) {
        if (cep == null || cep.isEmpty()) {
            throw new CepInvalidoException("CEP nío pode ser vazio");
        }

        // Remove caracteres nío numéricos
        cep = cep.replaceAll("\\D", "");

        if (cep.length() != 8) {
            throw new CepInvalidoException(cep);
        }

        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        try {
            ResponseEntity<EnderecoDTO> response = restTemplate.getForEntity(url, EnderecoDTO.class);
            EnderecoDTO endereco = response.getBody();

            // Check for "erro": true in ViaCEP response
            if (endereco == null || (endereco.getCep() == null && endereco.getErro() != null && endereco.getErro())) {
                throw new CepInvalidoException(cep);
            }

            return endereco;
        } catch (ResourceAccessException e) {
            // Network errors, service unavailable
            throw new ViaCepServiceException("Servií§o indisponí­vel ou problema de rede", e);
        } catch (RestClientException e) {
            // Other REST client errors
            throw new ViaCepServiceException("Erro ao processar requisií§ío", e);
        }
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

/**
 * The enum Tipo logradouro.
 */
public enum TipoLogradouro {
    /**
     * Alameda tipo logradouro.
     */
    ALAMEDA("Alameda"),
    /**
     * Avenida tipo logradouro.
     */
    AVENIDA("Avenida"),
    /**
     * Beco tipo logradouro.
     */
    BECO("Beco"),
    /**
     * Boulevard tipo logradouro.
     */
    BOULEVARD("Boulevard"),
    /**
     * Caminho tipo logradouro.
     */
    CAMINHO("Caminho"),
    /**
     * Estrada tipo logradouro.
     */
    ESTRADA("Estrada"),
    /**
     * Ladeira tipo logradouro.
     */
    LADEIRA("Ladeira"),
    /**
     * Largo tipo logradouro.
     */
    LARGO("Largo"),
    /**
     * Praca tipo logradouro.
     */
    PRACA("Praí§a"),
    /**
     * Rodovia tipo logradouro.
     */
    RODOVIA("Rodovia"),
    /**
     * Rua tipo logradouro.
     */
    RUA("Rua"),
    /**
     * Travessa tipo logradouro.
     */
    TRAVESSA("Travessa"),
    /**
     * Via tipo logradouro.
     */
    VIA("Via"),
    /**
     * Viela tipo logradouro.
     */
    VIELA("Viela"),
    /**
     * Outro tipo logradouro.
     */
    OUTRO("Outro");

    private final String descricao;

    TipoLogradouro(String descricao) {
        this.descricao = descricao;
    }

    /**
     * From string tipo logradouro.
     *
     * @param texto the texto
     * @return the tipo logradouro
     */
    public static TipoLogradouro fromString(String texto) {
        for (TipoLogradouro tipo : TipoLogradouro.values()) {
            if (texto.toUpperCase().startsWith(tipo.name())) {
                return tipo;
            }
        }
        return OUTRO;
    }

    /**
     * Gets descricao.
     *
     * @return the descricao
     */
    public String getDescricao() {
        return descricao;
    }
}
```

```java
package com.mongodb_testando.mongodb_teste.domain.endereco.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Cep invalido exception.
 */
public class CepInvalidoException extends BusinessException {
    /**
     * Instantiates a new Cep invalido exception.
     *
     * @param cep the cep
     */
    public CepInvalidoException(String cep) {
        super("CEP invrálido ou mal formatado: " + cep);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco.exceptions;

import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;

/**
 * The type Cep nao encontrado exception.
 */
public class CepNaoEncontradoException extends ResourceNotFoundException {
    /**
     * Instantiates a new Cep nao encontrado exception.
     *
     * @param cep the cep
     */
    public CepNaoEncontradoException(String cep) {
        super("CEP nío encontrado na base de dados: " + cep);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco.exceptions;

import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;

/**
 * The type Endereco not found exception.
 */
public class EnderecoNotFoundException extends ResourceNotFoundException {
    /**
     * Instantiates a new Endereco not found exception.
     *
     * @param id the id
     */
    public EnderecoNotFoundException(String id) {
        super("Endereí§o nío encontrado com ID: " + id);
    }

    /**
     * Instantiates a new Endereco not found exception.
     *
     * @param field the field
     * @param value the value
     */
    public EnderecoNotFoundException(String field, String value) {
        super("Endereí§o nío encontrado com " + field + ": " + value);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * Exception thrown when there's an error communicating with the ViaCEP service.
 */
public class ViaCepServiceException extends BusinessException {

    /**
     * Constructs a new ViaCepServiceException with the specified detail message.
     *
     * @param message the detail message
     */
    public ViaCepServiceException(String message) {
        super(message);
    }

    /**
     * Constructs a new ViaCepServiceException with the specified detail message and cause.
     *
     * @param message the detail message
     * @param cause   the cause
     */
    public ViaCepServiceException(String message, Throwable cause) {
        super("Erro ao consultar servií§o ViaCEP: " + message, cause);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * The type Endereco.
 */
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "enderecos")
public class Endereco {

    @Id
    private String id;

    @Indexed(name = "idx_cep", background = true)
    private String cep;
    private TipoLogradouro tipoLogradouro;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String estado;
    private String pais = "Brasil";

    // Campos adicionais retornados pela API do ViaCEP
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;


    @Override
    public String toString() {
        return (tipoLogradouro != null ? tipoLogradouro.getDescricao() + " " : "") +
                logradouro + ", " + numero +
                (complemento != null && !complemento.isEmpty() ? ", " + complemento : "") +
                " - " + bairro + ", " + cidade + " - " + estado +
                ", CEP: " + cep + ", " + pais;
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * The type Endereco dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnderecoDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    private Boolean erro;

    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "\\d{8}", message = "CEP deve conter 8 dí­gitos")
    private String cep;

    private TipoLogradouro tipoLogradouro;

    private String nomeLogradouro;
    private String numero;
    private String complemento;
    private String bairro;

    @NotBlank(message = "Cidade é obrigatória")
    private String localidade; // cidade

    @NotBlank(message = "Estado é obrigatório")
    private String uf; // estado

    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;


}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * The interface Endereco repository.
 */
@Repository
public interface EnderecoRepository extends MongoRepository<Endereco, String> {
    /**
     * Find by cep optional.
     *
     * @param cep the cep
     * @return the optional
     */
    Optional<Endereco> findByCep(String cep);

    /**
     * Find by logradouro containing ignore case list.
     *
     * @param logradouro the logradouro
     * @return the list
     */
    List<Endereco> findByLogradouroContainingIgnoreCase(String logradouro);

    /**
     * Find by cidade ignore case list.
     *
     * @param cidade the cidade
     * @return the list
     */
    List<Endereco> findByCidadeIgnoreCase(String cidade);

    /**
     * Find by estado ignore case list.
     *
     * @param estado the estado
     * @return the list
     */
    List<Endereco> findByEstadoIgnoreCase(String estado);

    /**
     * Find by cep and logradouro and numero and bairro and cidade and estado optional.
     *
     * @param cep        the cep
     * @param logradouro the logradouro
     * @param numero     the numero
     * @param bairro     the bairro
     * @param cidade     the cidade
     * @param estado     the estado
     * @return the optional
     */
    Optional<Endereco> findByCepAndLogradouroAndNumeroAndBairroAndCidadeAndEstado(
            String cep, String logradouro, String numero,
            String bairro, String cidade, String estado);

    /**
     * Exists by cep boolean.
     *
     * @param cep the cep
     * @return the boolean
     */
    boolean existsByCep(String cep);
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import org.mapstruct.*;

import java.util.List;

/**
 * Interface para mapeamento entre entidades Endereco e DTOs EnderecoDTO.
 * <p>
 * Esta interface utiliza o MapStruct para implementar a conversío bidirecional
 * entre os objetos de domí­nio e objetos de transferíªncia de dados,
 * garantindo a correta transformaí§ío dos campos especí­ficos do endereí§o.
 * </p>
 */
@Mapper(componentModel = "spring")
public interface EnderecoMapper {

    /**
     * Converte uma entidade Endereco para um DTO EnderecoDTO.
     * <p>
     * Mapeia explicitamente os campos com nomes diferentes entre as classes.
     * </p>
     *
     * @param endereco entidade a ser convertida
     * @return um novo objeto EnderecoDTO com os dados da entidade
     */
    @Mapping(source = "cidade", target = "localidade")
    @Mapping(source = "estado", target = "uf")
    EnderecoDTO toDTO(Endereco endereco);

    /**
     * Converte um DTO EnderecoDTO para uma entidade Endereco.
     * <p>
     * Mapeia explicitamente os campos com nomes diferentes entre as classes.
     * </p>
     *
     * @param dto DTO a ser convertido
     * @return uma nova entidade Endereco com os dados do DTO
     */
    @Mapping(source = "localidade", target = "cidade")
    @Mapping(source = "uf", target = "estado")
    @Mapping(target = "pais", constant = "Brasil")
    Endereco toEntity(EnderecoDTO dto);

    /**
     * Converte uma lista de entidades Endereco para uma lista de DTOs EnderecoDTO.
     *
     * @param enderecos lista de entidades a ser convertida
     * @return uma nova lista de DTOs
     */
    List<EnderecoDTO> toDTOList(List<Endereco> enderecos);

    /**
     * Converte uma lista de DTOs EnderecoDTO para uma lista de entidades Endereco.
     *
     * @param dtos lista de DTOs a ser convertida
     * @return uma nova lista de entidades
     */
    List<Endereco> toEntityList(List<EnderecoDTO> dtos);

    /**
     * Atualiza uma entidade Endereco existente com os dados de um EnderecoDTO.
     * <p>
     * Propriedades nulas no DTO nío sobrescrevem os valores na entidade existente.
     * </p>
     *
     * @param dto      DTO contendo os novos dados
     * @param endereco entidade a ser atualizada
     * @return a entidade atualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(source = "localidade", target = "cidade")
    @Mapping(source = "uf", target = "estado")
    @Mapping(target = "id", ignore = true)
    Endereco updateEntityFromDTO(EnderecoDTO dto, @MappingTarget Endereco endereco);
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Factory class for creating test instances of Endereco and EnderecoDTO objects.
 */
public class EnderecoFactory {

    /**
     * Creates a default EnderecoDTO instance with sample data
     *
     * @return a new EnderecoDTO with default test values
     */
    public static EnderecoDTO createEnderecoDTO() {
        EnderecoDTO dto = new EnderecoDTO();
        dto.setId(UUID.randomUUID().toString());
        dto.setCep("12345678");
        dto.setTipoLogradouro(TipoLogradouro.RUA);
        dto.setNomeLogradouro("Das Flores");
        dto.setNumero("123");
        dto.setComplemento("Apto 101");
        dto.setBairro("Centro");
        dto.setLocalidade("Sío Paulo");
        dto.setUf("SP");
        dto.setIbge("3550308");
        dto.setDdd("11");
        return dto;
    }

    /**
     * Creates a EnderecoDTO with custom CEP
     *
     * @param cep The CEP to use
     * @return a new EnderecoDTO with the specified CEP
     */
    public static EnderecoDTO createEnderecoDTOWithCep(String cep) {
        EnderecoDTO dto = createEnderecoDTO();
        dto.setCep(cep);
        return dto;
    }

    /**
     * Creates a EnderecoDTO with custom location data
     *
     * @param cidade The city name
     * @param uf     The state code
     * @return a new EnderecoDTO with the specified location
     */
    public static EnderecoDTO createEnderecoDTOWithLocation(String cidade, String uf) {
        EnderecoDTO dto = createEnderecoDTO();
        dto.setLocalidade(cidade);
        dto.setUf(uf);
        return dto;
    }

    /**
     * Creates a list of EnderecoDTO instances
     *
     * @param count Number of instances to create
     * @return List of EnderecoDTO instances
     */
    public static List<EnderecoDTO> createEnderecoDTOList(int count) {
        List<EnderecoDTO> enderecos = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            EnderecoDTO dto = createEnderecoDTO();
            dto.setCep(String.format("%08d", 10000000 + i));
            dto.setNumero(String.valueOf(100 + i));
            enderecos.add(dto);
        }
        return enderecos;
    }

    /**
     * Creates a list of predefined EnderecoDTO instances for sample data
     *
     * @return List of sample EnderecoDTO instances
     */
    public static List<EnderecoDTO> createSampleEnderecoDTOList() {
        return Arrays.asList(
                createEnderecoDTOWithLocation("Sío Paulo", "SP"),
                createEnderecoDTOWithLocation("Rio de Janeiro", "RJ"),
                createEnderecoDTOWithLocation("Belo Horizonte", "MG")
        );
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.CepInvalidoException;
import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.CepNaoEncontradoException;
import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.EnderecoNotFoundException;
import com.mongodb_testando.mongodb_teste.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * The type Endereco service.
 */
@Service
@RequiredArgsConstructor
public class EnderecoService {

    private static final String ENDERECO_NAO_ENCONTRADO_ID = "Endereí§o nío encontrado com ID: ";
    private static final String ENDERECO_NAO_ENCONTRADO_CEP = "Endereí§o nío encontrado com CEP: ";

    private final EnderecoRepository enderecoRepository;
    private final ViaCepClient viaCepClient;
    private final EnderecoMapper enderecoMapper;

    /**
     * Find all list.
     *
     * @return the list
     */
    public List<EnderecoDTO> findAll() {
        return enderecoRepository.findAll().stream()
                .map(enderecoMapper::toDTO)
                .toList();
    }

    /**
     * Find all page.
     *
     * @param pageable the pageable
     * @return the page
     */
    public Page<EnderecoDTO> findAll(Pageable pageable) {
        return enderecoRepository.findAll(pageable)
                .map(enderecoMapper::toDTO);
    }

    /**
     * Find by id endereco dto.
     *
     * @param id the id
     * @return the endereco dto
     */
    public EnderecoDTO findById(String id) {
        return enderecoRepository.findById(id)
                .map(enderecoMapper::toDTO)
                .orElseThrow(() -> new EnderecoNotFoundException(id));
    }

    /**
     * Find by cep endereco dto.
     *
     * @param cep the cep
     * @return the endereco dto
     */
    public EnderecoDTO findByCep(String cep) {
        validateCepFormat(cep);

        return enderecoRepository.findByCep(cep)
                .map(enderecoMapper::toDTO)
                .orElseThrow(() -> new CepNaoEncontradoException(cep));
    }

    /**
     * Finds an existing address with identical location data or creates a new one
     *
     * @param enderecoDTO the endereco dto
     * @return the endereco dto
     */
    public EnderecoDTO findOrCreateAddress(EnderecoDTO enderecoDTO) {
        // Normalize the address data
        String cepNormalized = enderecoDTO.getCep().replaceAll("\\D", "");

        // Try to find an exactly matching address
        Optional<Endereco> existingAddress = enderecoRepository.findByCepAndLogradouroAndNumeroAndBairroAndCidadeAndEstado(
                cepNormalized,
                enderecoDTO.getNomeLogradouro(),
                enderecoDTO.getNumero(),
                enderecoDTO.getBairro(),
                enderecoDTO.getLocalidade(),
                enderecoDTO.getUf()
        );

        if (existingAddress.isPresent()) {
            return enderecoMapper.toDTO(existingAddress.get());
        } else {
            // Create new if no match found
            return create(enderecoDTO);
        }
    }

    /**
     * Consultar cep endereco dto.
     *
     * @param cep the cep
     * @return the endereco dto
     */
    public EnderecoDTO consultarCep(String cep) {
        String cepLimpo = validateAndCleanCep(cep);

        if (enderecoRepository.existsByCep(cepLimpo)) {
            return findByCep(cepLimpo);
        }

        EnderecoDTO enderecoDTO = viaCepClient.buscarPorCep(cepLimpo);
        if (enderecoDTO == null || enderecoDTO.getCep() == null) {
            throw new CepNaoEncontradoException(cep);
        }

        processarTipoLogradouro(enderecoDTO);

        // Validate mandatory fields returned by the API
        validateViaCepResponse(enderecoDTO);

        Endereco endereco = enderecoMapper.toEntity(enderecoDTO);
        Endereco enderecoSalvo = enderecoRepository.save(endereco);
        return enderecoMapper.toDTO(enderecoSalvo);
    }

    private void processarTipoLogradouro(EnderecoDTO enderecoDTO) {
        String logradouroCompleto = enderecoDTO.getNomeLogradouro();
        if (logradouroCompleto != null && !logradouroCompleto.isEmpty()) {
            String[] partes = logradouroCompleto.split(" ", 2);
            if (partes.length > 1) {
                enderecoDTO.setTipoLogradouro(TipoLogradouro.fromString(partes[0]));
                enderecoDTO.setNomeLogradouro(partes[1]);
            } else {
                enderecoDTO.setTipoLogradouro(TipoLogradouro.OUTRO);
            }
        }
    }

    /**
     * Create endereco dto.
     *
     * @param enderecoDTO the endereco dto
     * @return the endereco dto
     */
    public EnderecoDTO create(EnderecoDTO enderecoDTO) {
        // Validate the address data
        validateAddressData(enderecoDTO);

        enderecoDTO.setId(null);
        Endereco endereco = enderecoMapper.toEntity(enderecoDTO);
        Endereco savedEndereco = enderecoRepository.save(endereco);
        return enderecoMapper.toDTO(savedEndereco);
    }

    /**
     * Update endereco dto.
     *
     * @param id          the id
     * @param enderecoDTO the endereco dto
     * @return the endereco dto
     */
    public EnderecoDTO update(String id, EnderecoDTO enderecoDTO) {
        if (!enderecoRepository.existsById(id)) {
            throw new EnderecoNotFoundException(id);
        }

        // Validate the address data
        validateAddressData(enderecoDTO);

        Endereco existingEndereco = enderecoRepository.findById(id)
                .orElseThrow(() -> new EnderecoNotFoundException(id));
        enderecoMapper.updateEntityFromDTO(enderecoDTO, existingEndereco);
        existingEndereco.setId(id);
        Endereco savedEndereco = enderecoRepository.save(existingEndereco);
        return enderecoMapper.toDTO(savedEndereco);
    }

    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(String id) {
        if (!enderecoRepository.existsById(id)) {
            throw new EnderecoNotFoundException(id);
        }
        enderecoRepository.deleteById(id);
    }

    private String validateAndCleanCep(String cep) {
        if (cep == null || cep.trim().isEmpty()) {
            throw new CepInvalidoException("CEP nío pode ser vazio");
        }

        String cepLimpo = cep.replaceAll("\\D", "");

        if (cepLimpo.length() != 8) {
            throw new CepInvalidoException(cep);
        }

        return cepLimpo;
    }

    private void validateCepFormat(String cep) {
        if (cep == null || !cep.matches("\\d{8}")) {
            throw new CepInvalidoException(cep);
        }
    }

    private void validateAddressData(EnderecoDTO endereco) {
        // Validações especí­ficas de negócio para endereí§os
        if (endereco == null) {
            throw new BusinessException("Dados de endereí§o nío podem ser nulos");
        }

        validateCepFormat(endereco.getCep());

        if (endereco.getNomeLogradouro() == null || endereco.getNomeLogradouro().trim().isEmpty()) {
            throw new BusinessException("Logradouro é obrigatório");
        }

        if (endereco.getLocalidade() == null || endereco.getLocalidade().trim().isEmpty()) {
            throw new BusinessException("Cidade é obrigatória");
        }

        if (endereco.getUf() == null || endereco.getUf().trim().isEmpty()) {
            throw new BusinessException("Estado é obrigatório");
        }
    }

    private void validateViaCepResponse(EnderecoDTO enderecoDTO) {
        if (enderecoDTO.getLocalidade() == null || enderecoDTO.getLocalidade().trim().isEmpty()) {
            throw new BusinessException("Cidade nío retornada pela API ViaCEP");
        }

        if (enderecoDTO.getUf() == null || enderecoDTO.getUf().trim().isEmpty()) {
            throw new BusinessException("Estado nío retornado pela API ViaCEP");
        }
    }

    /**
     * Count long.
     *
     * @return the long
     */
    public long count() {
        return enderecoRepository.count();
    }

    /**
     * Exists by id boolean.
     *
     * @param id the id
     * @return the boolean
     */
    public boolean existsById(String id) {
        return enderecoRepository.existsById(id);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.endereco;

import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.CepInvalidoException;
import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.CepNaoEncontradoException;
import com.mongodb_testando.mongodb_teste.domain.endereco.exceptions.ViaCepServiceException;
import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

/**
 * Controlador REST responsrável pelo gerenciamento de endereí§os no sistema.
 * <p>
 * Esta classe fornece endpoints para operações CRUD de endereí§os, além de funcionalidades
 * especializadas para consulta e validaí§ío de CEPs, tanto na base de dados local quanto
 * através de integraí§ío com servií§os externos.
 * <p>
 * O controlador segue os princí­pios RESTful, utilizando os verbos HTTP apropriados
 * para cada operaí§ío e retornando códigos de status adequados nas respostas.
 * <p>
 * As exceções relacionadas a validações de CEP sío delegadas ao GlobalExceptionHandler
 * para processamento centralizado de erros.
 *
 * @author [Seu Nome]
 * @version 1.0
 * @since 2025 -03-12
 */
@RestController
@RequestMapping("/api/enderecos")
@RequiredArgsConstructor
@Tag(name = "Endereí§os", description = "API para gerenciamento de endereí§os")
public class EnderecoController {

    private final EnderecoService enderecoService;

    /**
     * Recupera todos os endereí§os cadastrados no sistema.
     * <p>
     * Este método retorna uma lista nío paginada de todos os endereí§os.
     * Para grandes volumes de dados, considere utilizar o endpoint paginado.
     *
     * @return ResponseEntity contendo uma lista de objetos EnderecoDTO
     */
    @GetMapping
    @Operation(summary = "Listar todos os endereí§os",
            description = "Retorna uma lista com todos os endereí§os cadastrados no sistema")
    @ApiResponse(responseCode = "200", description = "Operaí§ío bem-sucedida")
    public ResponseEntity<List<EnderecoDTO>> findAll() {
        List<EnderecoDTO> enderecos = enderecoService.findAll();
        return ResponseEntity.ok(enderecos);
    }

    /**
     * Recupera endereí§os de forma paginada.
     * <p>
     * Permite controlar a paginaí§ío e ordenaí§ío dos resultados através dos parí¢metros
     * padrío do Spring Data (page, size, sort).
     *
     * @param pageable objeto de paginaí§ío contendo parí¢metros como prágina, tamanho e ordenaí§ío
     * @return ResponseEntity contendo uma prágina de objetos EnderecoDTO
     */
    @GetMapping("/paged")
    @Operation(summary = "Listar endereí§os com paginaí§ío",
            description = "Retorna uma lista paginada de endereí§os com suporte a ordenaí§ío")
    @ApiResponse(responseCode = "200", description = "Operaí§ío bem-sucedida")
    public ResponseEntity<Page<EnderecoDTO>> findAllPaged(
            @Parameter(description = "Parí¢metros de paginaí§ío (page, size, sort)") Pageable pageable) {
        Page<EnderecoDTO> enderecos = enderecoService.findAll(pageable);
        return ResponseEntity.ok(enderecos);
    }

    /**
     * Busca um endereí§o especí­fico pelo seu identificador íºnico.
     *
     * @param id identificador íºnico do endereí§o a ser recuperado
     * @return ResponseEntity contendo o EnderecoDTO correspondente ao ID fornecido
     * @throws ResourceNotFoundException se nenhum endereí§o for encontrado com o ID especificado
     */
    @GetMapping("/{id}")
    @Operation(summary = "Buscar endereí§o por ID",
            description = "Retorna um endereí§o especí­fico com base no ID fornecido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Endereí§o encontrado"),
            @ApiResponse(responseCode = "404", description = "Endereí§o nío encontrado",
                    content = @Content)
    })
    public ResponseEntity<EnderecoDTO> findById(
            @Parameter(description = "ID do endereí§o", required = true) @PathVariable String id) {
        EnderecoDTO endereco = enderecoService.findById(id);
        return ResponseEntity.ok(endereco);
    }

    /**
     * Busca um endereí§o pelo CEP.
     * <p>
     * Este método tenta primeiro encontrar o CEP na base de dados local. Se nío encontrar,
     * consulta automaticamente o servií§o externo ViaCEP para obter as informações.
     *
     * @param cep níºmero do CEP a ser pesquisado (apenas dí­gitos ou formato 00000-000)
     * @return ResponseEntity contendo o EnderecoDTO correspondente ao CEP fornecido
     * @throws CepInvalidoException   se o formato do CEP for invrálido
     * @throws ViaCepServiceException se ocorrer um erro na consulta ao servií§o externo
     */
    @GetMapping("/cep/{cep}")
    @Operation(summary = "Buscar endereí§o por CEP",
            description = "Busca um endereí§o pelo CEP na base local ou consulta servií§o externo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Endereí§o encontrado"),
            @ApiResponse(responseCode = "400", description = "CEP em formato invrálido",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Erro ao consultar servií§o externo",
                    content = @Content)
    })
    public ResponseEntity<EnderecoDTO> findByCep(
            @Parameter(description = "CEP a ser pesquisado", required = true,
                    example = "12345-678") @PathVariable String cep) {
        try {
            EnderecoDTO endereco = enderecoService.findByCep(cep);
            return ResponseEntity.ok(endereco);
        } catch (CepNaoEncontradoException e) {
            // Se nío encontrou localmente, tenta consultar API externa
            return ResponseEntity.ok(enderecoService.consultarCep(cep));
        } catch (CepInvalidoException e) {
            // Em caso de CEP invrálido, o GlobalExceptionHandler irrá processar
            throw e;
        }
    }

    /**
     * Consulta diretamente o servií§o externo ViaCEP para obter informações de um CEP.
     * <p>
     * Este método nío verifica a base de dados local, fazendo a consulta diretamente no
     * servií§o externo.
     *
     * @param cep níºmero do CEP a ser consultado (apenas dí­gitos ou formato 00000-000)
     * @return ResponseEntity contendo o EnderecoDTO com as informações do CEP
     * @throws CepInvalidoException   se o formato do CEP for invrálido
     * @throws ViaCepServiceException se ocorrer um erro na consulta ao servií§o externo
     */
    @GetMapping("/consultar-cep/{cep}")
    @Operation(summary = "Consultar CEP no servií§o externo",
            description = "Consulta diretamente o servií§o ViaCEP para obter informações de um CEP")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Endereí§o encontrado"),
            @ApiResponse(responseCode = "400", description = "CEP em formato invrálido",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Erro ao consultar servií§o externo",
                    content = @Content)
    })
    public ResponseEntity<EnderecoDTO> consultarCep(
            @Parameter(description = "CEP a ser consultado", required = true,
                    example = "12345-678") @PathVariable String cep) {
        try {
            EnderecoDTO endereco = enderecoService.consultarCep(cep);
            return ResponseEntity.ok(endereco);
        } catch (ViaCepServiceException e) {
            // O GlobalExceptionHandler irrá processar
            throw e;
        }
    }

    /**
     * Cria um novo registro de endereí§o no sistema.
     * <p>
     * O objeto recebido é validado conforme as regras definidas na classe EnderecoDTO.
     * Em caso de sucesso, retorna o endereí§o criado e o URI para acessrá-lo.
     *
     * @param enderecoDTO objeto contendo os dados do endereí§o a ser criado
     * @return ResponseEntity contendo o EnderecoDTO criado e o URI para acessrá-lo
     */
    @PostMapping
    @Operation(summary = "Criar novo endereí§o",
            description = "Cria um novo registro de endereí§o no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Endereí§o criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados invrálidos",
                    content = @Content)
    })
    public ResponseEntity<EnderecoDTO> create(
            @Parameter(description = "Dados do endereí§o", required = true,
                    schema = @Schema(implementation = EnderecoDTO.class))
            @Valid @RequestBody EnderecoDTO enderecoDTO) {
        // Let the GlobalExceptionHandler handle exceptions here
        EnderecoDTO createdEndereco = enderecoService.create(enderecoDTO);
        return ResponseEntity
                .created(ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(createdEndereco.getId())
                        .toUri())
                .body(createdEndereco);
    }

    /**
     * Atualiza um endereí§o existente no sistema.
     * <p>
     * O objeto recebido é validado conforme as regras definidas na classe EnderecoDTO.
     * O ID no path deve corresponder a um endereí§o existente.
     *
     * @param id          identificador íºnico do endereí§o a ser atualizado
     * @param enderecoDTO objeto contendo os novos dados do endereí§o
     * @return ResponseEntity contendo o EnderecoDTO atualizado
     * @throws ResourceNotFoundException       se nenhum endereí§o for encontrado com o ID especificado
     * @throws MethodArgumentNotValidException se houver erros de validaí§ío nos campos
     */
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar endereí§o",
            description = "Atualiza um endereí§o existente no sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Endereí§o atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados invrálidos",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Endereí§o nío encontrado",
                    content = @Content)
    })
    public ResponseEntity<EnderecoDTO> update(
            @Parameter(description = "ID do endereí§o", required = true) @PathVariable String id,
            @Parameter(description = "Novos dados do endereí§o", required = true,
                    schema = @Schema(implementation = EnderecoDTO.class))
            @Valid @RequestBody EnderecoDTO enderecoDTO) {
        EnderecoDTO updatedEndereco = enderecoService.update(id, enderecoDTO);
        return ResponseEntity.ok(updatedEndereco);
    }

    /**
     * Remove um endereí§o do sistema.
     *
     * @param id identificador íºnico do endereí§o a ser removido
     * @return ResponseEntity sem conteíºdo, apenas com código de status 204 (No Content)
     * @throws ResourceNotFoundException se nenhum endereí§o for encontrado com o ID especificado
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir endereí§o",
            description = "Remove um endereí§o do sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Endereí§o excluí­do com sucesso"),
            @ApiResponse(responseCode = "404", description = "Endereí§o nío encontrado",
                    content = @Content)
    })
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID do endereí§o", required = true) @PathVariable String id) {
        enderecoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retorna o níºmero total de endereí§os cadastrados no sistema.
     *
     * @return ResponseEntity contendo o níºmero total de endereí§os
     */
    @GetMapping("/count")
    @Operation(summary = "Contar endereí§os",
            description = "Retorna o níºmero total de endereí§os cadastrados no sistema")
    @ApiResponse(responseCode = "200", description = "Operaí§ío bem-sucedida")
    public ResponseEntity<Long> count() {
        long count = enderecoService.count();
        return ResponseEntity.ok(count);
    }

    /**
     * Verifica se existe um endereí§o com o ID especificado.
     *
     * @param id identificador íºnico do endereí§o a ser verificado
     * @return ResponseEntity contendo um booleano indicando se o endereí§o existe
     */
    @GetMapping("/exists/{id}")
    @Operation(summary = "Verificar existíªncia de endereí§o",
            description = "Verifica se existe um endereí§o com o ID especificado")
    @ApiResponse(responseCode = "200", description = "Operaí§ío bem-sucedida")
    public ResponseEntity<Boolean> exists(
            @Parameter(description = "ID do endereí§o", required = true) @PathVariable String id) {
        boolean exists = enderecoService.existsById(id);
        return ResponseEntity.ok(exists);
    }
}
```

### Pessoa (contato do whatsapp)

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Duplicate cpf exception.
 */
public class DuplicateCpfException extends BusinessException {
    /**
     * Instantiates a new Duplicate cpf exception.
     *
     * @param cpf the cpf
     */
    public DuplicateCpfException(String cpf) {
        super("CPF jrá cadastrado no sistema: " + cpf);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Duplicate email exception.
 */
public class DuplicateEmailException extends BusinessException {
    /**
     * Instantiates a new Duplicate email exception.
     *
     * @param email the email
     */
    public DuplicateEmailException(String email) {
        super("Email jrá cadastrado no sistema: " + email);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Invalid data exception.
 */
public class InvalidDataException extends BusinessException {
    /**
     * Instantiates a new Invalid data exception.
     *
     * @param message the message
     */
    public InvalidDataException(String message) {
        super(message);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa.exceptions;

import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;

/**
 * The type Pessoa not found exception.
 */
public class PessoaNotFoundException extends ResourceNotFoundException {
    /**
     * Instantiates a new Pessoa not found exception.
     *
     * @param id the id
     */
    public PessoaNotFoundException(String id) {
        super("Pessoa nío encontrada com ID: " + id);
    }

    /**
     * Instantiates a new Pessoa not found exception.
     *
     * @param field the field
     * @param value the value
     */
    public PessoaNotFoundException(String field, String value) {
        super("Pessoa nío encontrada com " + field + ": " + value);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.Endereco;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The type Pessoa.
 */
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "pessoas")
public class Pessoa {

    @Id
    private String id;

    private String nomeCompleto;

    @Indexed(unique = true)
    private String email;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\d{8,9}", message = "Telefone deve conter 8 ou 9 dí­gitos")
    private String telefone;

    @NotBlank(message = "DDD é obrigatório")
    @Pattern(regexp = "\\d{2}", message = "DDD deve conter 2 dí­gitos")
    private String ddd;

    @Indexed(unique = true)
    private String cpf;

    private LocalDate dataNascimentoLocalDate;

    private boolean menor;

    private List<TipoPessoa> tipos = new ArrayList<>();
    private Map<String, Object> atributosExtras = new HashMap<>();

    // For instructors
    private List<String> especialidades;

    // For students
    private String nivel;

    @DBRef
    private List<Endereco> enderecos = new ArrayList<>();

    @CreatedDate
    private LocalDateTime dataCriacao;

    @LastModifiedDate
    private LocalDateTime dataAtualizacao;

    /**
     * Is menor de idade boolean.
     *
     * @return the boolean
     */
    public boolean isMenorDeIdade() {
        if (dataNascimentoLocalDate == null) {
            return menor; // Use the flag if date is not available
        }
        return dataNascimentoLocalDate.plusYears(18).isAfter(LocalDate.now());
    }

    /**
     * Add endereco.
     *
     * @param endereco the endereco
     */
// Add or update an address to the person
    public void addEndereco(Endereco endereco) {
        if (enderecos == null) {
            enderecos = new ArrayList<>();
        }
        enderecos.add(endereco);
    }

    /**
     * Remove endereco boolean.
     *
     * @param enderecoId the endereco id
     * @return the boolean
     */
// Remove an address from the person
    public boolean removeEndereco(String enderecoId) {
        if (enderecos == null) {
            return false;
        }
        return enderecos.removeIf(e -> e.getId().equals(enderecoId));
    }

}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoDTO;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * The type Pessoa dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PessoaDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String id;

    @NotBlank(message = "Nome é obrigatório")
    private String nomeCompleto;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email invrálido")
    private String email;

    @NotBlank(message = "DDD é obrigatório")
    @Pattern(regexp = "\\d{2}", message = "DDD deve conter 2 dí­gitos")
    private String ddd;

    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "\\d{8,9}", message = "Telefone deve conter 8 ou 9 dí­gitos")
    private String telefone;

    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dí­gitos")
    private String cpf;

    @NotBlank(message = "Data de nascimento é obrigatória")
    private String dataNascimento;

    private List<EnderecoDTO> enderecos = new ArrayList<>();
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * The interface Pessoa repository.
 */
public interface PessoaRepository extends MongoRepository<Pessoa, String> {

    /**
     * Find by email optional.
     *
     * @param email the email
     * @return the optional
     */
    Optional<Pessoa> findByEmail(String email);

    /**
     * Find by cpf optional.
     *
     * @param cpf the cpf
     * @return the optional
     */
    Optional<Pessoa> findByCpf(String cpf);

    /**
     * Find by nome completo containing ignore case list.
     *
     * @param nome the nome
     * @return the list
     */
    List<Pessoa> findByNomeCompletoContainingIgnoreCase(String nome);

    /**
     * Find by data nascimento containing list.
     *
     * @param dataParcial the data parcial
     * @return the list
     */
    @Query("{'dataNascimento': {$regex: ?0, $options: 'i'}}")
    List<Pessoa> findByDataNascimentoContaining(String dataParcial);

    /**
     * Exists by email boolean.
     *
     * @param email the email
     * @return the boolean
     */
    boolean existsByEmail(String email);

    /**
     * Exists by cpf boolean.
     *
     * @param cpf the cpf
     * @return the boolean
     */
    boolean existsByCpf(String cpf);

}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoMapper;
import org.mapstruct.*;

import java.util.List;

/**
 * Interface para mapeamento entre entidades Pessoa e DTOs PessoaDTO.
 * <p>
 * Esta interface utiliza o MapStruct para gerar automaticamente código de mapeamento
 * entre os objetos de domí­nio e os objetos de transferíªncia de dados. O MapStruct
 * reduz significativamente o código boilerplate e diminui a possibilidade de erros.
 * </p>
 */
@Mapper(componentModel = "spring",
        uses = {EnderecoMapper.class},
        injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PessoaMapper {

    /**
     * Converte uma entidade Pessoa para um DTO PessoaDTO.
     * <p>
     * O mapeamento entre campos com nomes diferentes é especificado explicitamente.
     * </p>
     *
     * @param pessoa entidade a ser convertida
     * @return um novo objeto PessoaDTO com os dados da entidade
     */
    @Mapping(source = "enderecos", target = "enderecos")
    PessoaDTO toDTO(Pessoa pessoa);

    /**
     * Converte um DTO PessoaDTO para uma entidade Pessoa.
     * <p>
     * O mapeamento entre campos com nomes diferentes é especificado explicitamente.
     * </p>
     *
     * @param dto DTO a ser convertido
     * @return uma nova entidade Pessoa com os dados do DTO
     */
    @Mapping(source = "enderecos", target = "enderecos")
    Pessoa toEntity(PessoaDTO dto);

    /**
     * Converte uma lista de entidades Pessoa para uma lista de DTOs PessoaDTO.
     *
     * @param pessoas lista de entidades a ser convertida
     * @return uma nova lista de DTOs
     */
    List<PessoaDTO> toDTOList(List<Pessoa> pessoas);

    /**
     * Converte uma lista de DTOs PessoaDTO para uma lista de entidades Pessoa.
     *
     * @param dtos lista de DTOs a ser convertida
     * @return uma nova lista de entidades
     */
    List<Pessoa> toEntityList(List<PessoaDTO> dtos);

    /**
     * Atualiza os atributos de uma entidade Pessoa existente com base nos dados de um DTO.
     * <p>
     * Este método atualiza apenas os campos que podem ser alterados,
     * preservando os atributos que nío devem ser atualizados, como dataCriacao.
     * </p>
     *
     * @param dto    DTO contendo os novos dados
     * @param pessoa entidade a ser atualizada
     * @return a entidade atualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dataCriacao", ignore = true)
    Pessoa updateEntityFromDTO(PessoaDTO dto, @MappingTarget Pessoa pessoa);
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoDTO;
import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoFactory;

import java.time.LocalDate;
import java.util.*;

/**
 * Factory class for creating test instances of Pessoa and PessoaDTO objects.
 */
public class PessoaFactory {

    /**
     * Creates a default PessoaDTO instance with sample data
     *
     * @return a new PessoaDTO with default test values
     */
    public static PessoaDTO createPessoaDTO() {
        PessoaDTO dto = new PessoaDTO();
        dto.setId(UUID.randomUUID().toString());
        dto.setNomeCompleto("Joío da Silva");
        dto.setEmail("joao.silva@example.com");
        dto.setDdd("11");
        dto.setTelefone("987654321");
        dto.setCpf("12345678901");
        dto.setDataNascimento(LocalDate.now().minusYears(30).toString());
        dto.setEnderecos(new ArrayList<>());
        return dto;
    }

    /**
     * Creates a PessoaDTO with custom name and email
     *
     * @param nome  The person's name
     * @param email The person's email
     * @return a new PessoaDTO with the specified name and email
     */
    public static PessoaDTO createPessoaDTOWithNameEmail(String nome, String email) {
        PessoaDTO dto = createPessoaDTO();
        dto.setNomeCompleto(nome);
        dto.setEmail(email);
        return dto;
    }

    /**
     * Creates a PessoaDTO with custom CPF
     *
     * @param cpf The CPF to use
     * @return a new PessoaDTO with the specified CPF
     */
    public static PessoaDTO createPessoaDTOWithCpf(String cpf) {
        PessoaDTO dto = createPessoaDTO();
        dto.setCpf(cpf);
        return dto;
    }

    /**
     * Creates a PessoaDTO with custom birth date
     *
     * @param dataNascimento The birth date as string in YYYY-MM-DD format
     * @return a new PessoaDTO with the specified birth date
     */
    public static PessoaDTO createPessoaDTOWithDataNascimento(String dataNascimento) {
        PessoaDTO dto = createPessoaDTO();
        dto.setDataNascimento(dataNascimento);
        return dto;
    }

    /**
     * Creates a PessoaDTO with an address
     *
     * @return a new PessoaDTO with an address
     */
    public static PessoaDTO createPessoaDTOWithEndereco() {
        PessoaDTO dto = createPessoaDTO();
        EnderecoDTO endereco = EnderecoFactory.createEnderecoDTO();
        dto.getEnderecos().add(endereco);
        return dto;
    }

    /**
     * Creates a list of PessoaDTO instances
     *
     * @param count Number of instances to create
     * @return List of PessoaDTO instances
     */
    public static List<PessoaDTO> createPessoaDTOList(int count) {
        List<PessoaDTO> pessoas = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            PessoaDTO dto = createPessoaDTO();
            dto.setNomeCompleto("Pessoa " + (i + 1));
            dto.setEmail("pessoa" + (i + 1) + "@example.com");
            dto.setCpf(String.format("%011d", 10000000000L + i));
            pessoas.add(dto);
        }
        return pessoas;
    }

    /**
     * Creates a list of predefined PessoaDTO instances for sample data
     *
     * @return List of sample PessoaDTO instances
     */
    public static List<PessoaDTO> createSamplePessoaDTOList() {
        return Arrays.asList(
                createPessoaDTOWithNameEmail("Joío Silva", "joao@example.com"),
                createPessoaDTOWithNameEmail("Maria Santos", "maria@example.com"),
                createPessoaDTOWithNameEmail("Pedro Oliveira", "pedro@example.com")
        );
    }

    /**
     * Creates a Pessoa entity from a DTO
     *
     * @param dto The DTO to convert
     * @return A new Pessoa entity
     */
    public static Pessoa createPessoaFromDTO(PessoaDTO dto) {
        Pessoa pessoa = new Pessoa();
        pessoa.setId(dto.getId());
        pessoa.setNomeCompleto(dto.getNomeCompleto());
        pessoa.setEmail(dto.getEmail());
        pessoa.setDdd(dto.getDdd());
        pessoa.setTelefone(dto.getTelefone());
        pessoa.setCpf(dto.getCpf());

        if (dto.getDataNascimento() != null) {
            pessoa.setDataNascimentoLocalDate(LocalDate.parse(dto.getDataNascimento()));
            pessoa.setMenor(pessoa.isMenorDeIdade());
        }

        pessoa.setEnderecos(new ArrayList<>());
        pessoa.setTipos(new ArrayList<>());
        pessoa.setAtributosExtras(new HashMap<>());

        return pessoa;
    }

    /**
     * Creates a Pessoa entity with custom type
     *
     * @param tipo The TipoPessoa to set
     * @return A new Pessoa entity with specified type
     */
    public static Pessoa createPessoaWithTipo(TipoPessoa tipo) {
        Pessoa pessoa = createPessoaFromDTO(createPessoaDTO());
        pessoa.getTipos().add(tipo);
        return pessoa;
    }

    /**
     * Creates an instructor Pessoa entity
     *
     * @return A new instructor Pessoa entity
     */
    public static Pessoa createInstrutor() {
        Pessoa pessoa = createPessoaWithTipo(TipoPessoa.INSTRUTOR);
        List<String> especialidades = Arrays.asList("Java", "Spring Boot", "MongoDB");
        pessoa.setEspecialidades(especialidades);
        return pessoa;
    }

    /**
     * Creates a student Pessoa entity
     *
     * @return A new student Pessoa entity
     */
    public static Pessoa createEstudante() {
        Pessoa pessoa = createPessoaWithTipo(TipoPessoa.ESTUDANTE);
        pessoa.setNivel("Intermedirário");
        return pessoa;
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoDTO;
import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoMapper;
import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoService;
import com.mongodb_testando.mongodb_teste.exception.BusinessException;
import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

/**
 * The type Pessoa service.
 */
@Service
@RequiredArgsConstructor
public class PessoaService {

    private static final String PESSOA_NAO_ENCONTRADA_ID = "Pessoa nío encontrada com ID: ";
    private static final String PESSOA_NAO_ENCONTRADA_EMAIL = "Pessoa nío encontrada com email: ";
    private static final String PESSOA_NAO_ENCONTRADA_CPF = "Pessoa nío encontrada com CPF: ";
    private static final String ENDERECO_NAO_ENCONTRADO = "Endereí§o nío encontrado com ID: ";
    private static final String ENDERECO_NAO_PERTENCE = "Endereí§o nío pertence í  pessoa informada";

    private final PessoaRepository pessoaRepository;
    private final EnderecoService enderecoService;
    private final PessoaMapper pessoaMapper;
    private final EnderecoMapper enderecoMapper;

    /**
     * Find all list.
     *
     * @return the list
     */
    public List<PessoaDTO> findAll() {
        return pessoaMapper.toDTOList(pessoaRepository.findAll());
    }

    /**
     * Find all page.
     *
     * @param pageable the pageable
     * @return the page
     */
    public Page<PessoaDTO> findAll(Pageable pageable) {
        return pessoaRepository.findAll(pageable)
                .map(pessoaMapper::toDTO);
    }

    /**
     * Find by id pessoa dto.
     *
     * @param id the id
     * @return the pessoa dto
     */
    public PessoaDTO findById(String id) {
        return pessoaRepository.findById(id)
                .map(pessoaMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + id));
    }

    /**
     * Find by email pessoa dto.
     *
     * @param email the email
     * @return the pessoa dto
     */
    public PessoaDTO findByEmail(String email) {
        return pessoaRepository.findByEmail(email)
                .map(pessoaMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_EMAIL + email));
    }

    /**
     * Find by cpf pessoa dto.
     *
     * @param cpf the cpf
     * @return the pessoa dto
     */
    public PessoaDTO findByCpf(String cpf) {
        return pessoaRepository.findByCpf(cpf)
                .map(pessoaMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_CPF + cpf));
    }

    /**
     * Find by nome containing list.
     *
     * @param nome the nome
     * @return the list
     */
    public List<PessoaDTO> findByNomeContaining(String nome) {
        return pessoaMapper.toDTOList(pessoaRepository.findByNomeCompletoContainingIgnoreCase(nome));
    }

    /**
     * Find by data nascimento containing list.
     *
     * @param data the data
     * @return the list
     */
    public List<PessoaDTO> findByDataNascimentoContaining(String data) {
        return pessoaMapper.toDTOList(pessoaRepository.findByDataNascimentoContaining(data));
    }

    /**
     * Create pessoa dto.
     *
     * @param pessoaDTO the pessoa dto
     * @return the pessoa dto
     */
    public PessoaDTO create(PessoaDTO pessoaDTO) {
        pessoaDTO.setId(null);

        // Validate CPF format and uniqueness
        validateCpf(pessoaDTO.getCpf(), null);

        // Validate email uniqueness
        validateEmail(pessoaDTO.getEmail(), null);

        // Validate birth date
        validateBirthDate(pessoaDTO.getDataNascimento());

        Pessoa pessoa = pessoaMapper.toEntity(pessoaDTO);
        Pessoa savedPessoa = pessoaRepository.save(pessoa);
        return pessoaMapper.toDTO(savedPessoa);
    }

    /**
     * Update pessoa dto.
     *
     * @param id        the id
     * @param pessoaDTO the pessoa dto
     * @return the pessoa dto
     */
    public PessoaDTO update(String id, PessoaDTO pessoaDTO) {
        if (!pessoaRepository.existsById(id)) {
            throw new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + id);
        }

        // Validate CPF format and uniqueness (ignoring current person)
        validateCpf(pessoaDTO.getCpf(), id);

        // Validate email uniqueness (ignoring current person)
        validateEmail(pessoaDTO.getEmail(), id);

        // Validate birth date
        validateBirthDate(pessoaDTO.getDataNascimento());

        Pessoa pessoaExistente = pessoaRepository.findById(id).get();
        pessoaMapper.updateEntityFromDTO(pessoaDTO, pessoaExistente);
        pessoaExistente.setId(id); // Ensure ID is set correctly
        Pessoa savedPessoa = pessoaRepository.save(pessoaExistente);

        return pessoaMapper.toDTO(savedPessoa);
    }

    // Add these methods to PessoaService class

    /**
     * Delete.
     *
     * @param id the id
     */
    public void delete(String id) {
        if (!pessoaRepository.existsById(id)) {
            throw new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + id);
        }
        pessoaRepository.deleteById(id);
    }

    /**
     * Exists by email boolean.
     *
     * @param email the email
     * @return the boolean
     */
    public boolean existsByEmail(String email) {
        return pessoaRepository.existsByEmail(email);
    }

    /**
     * Exists by cpf boolean.
     *
     * @param cpf the cpf
     * @return the boolean
     */
    public boolean existsByCpf(String cpf) {
        return pessoaRepository.existsByCpf(cpf);
    }

    /**
     * Count long.
     *
     * @return the long
     */
    public long count() {
        return pessoaRepository.count();
    }

    /**
     * Listar enderecos list.
     *
     * @param pessoaId the pessoa id
     * @return the list
     */
    public List<EnderecoDTO> listarEnderecos(String pessoaId) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + pessoaId));
        return enderecoMapper.toDTOList(pessoa.getEnderecos());
    }

    /**
     * Adicionar endereco pessoa dto.
     *
     * @param pessoaId    the pessoa id
     * @param enderecoDTO the endereco dto
     * @return the pessoa dto
     */
    public PessoaDTO adicionarEndereco(String pessoaId, EnderecoDTO enderecoDTO) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + pessoaId));

        // Validate address data
        validateAddressData(enderecoDTO);

        // Check duplicate address
        if (isDuplicateAddress(pessoa, enderecoDTO)) {
            throw new BusinessException("Este endereí§o jrá estrá associado a esta pessoa");
        }

        // Use the deduplication method instead
        enderecoDTO = enderecoService.findOrCreateAddress(enderecoDTO);

        pessoa.getEnderecos().add(enderecoMapper.toEntity(enderecoDTO));
        Pessoa savedPessoa = pessoaRepository.save(pessoa);
        return pessoaMapper.toDTO(savedPessoa);
    }

    /**
     * Remover endereco pessoa dto.
     *
     * @param pessoaId   the pessoa id
     * @param enderecoId the endereco id
     * @return the pessoa dto
     */
    public PessoaDTO removerEndereco(String pessoaId, String enderecoId) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + pessoaId));

        boolean enderecoRemovido = pessoa.getEnderecos().removeIf(endereco -> endereco.getId().equals(enderecoId));

        if (!enderecoRemovido) {
            throw new ResourceNotFoundException(ENDERECO_NAO_ENCONTRADO + enderecoId);
        }

        Pessoa savedPessoa = pessoaRepository.save(pessoa);
        return pessoaMapper.toDTO(savedPessoa);
    }

    /**
     * Atualizar endereco pessoa dto.
     *
     * @param pessoaId    the pessoa id
     * @param enderecoId  the endereco id
     * @param enderecoDTO the endereco dto
     * @return the pessoa dto
     */
    public PessoaDTO atualizarEndereco(String pessoaId, String enderecoId, EnderecoDTO enderecoDTO) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + pessoaId));

        // Find the address in the person's address list
        boolean enderecoEncontrado = pessoa.getEnderecos().stream()
                .anyMatch(end -> end.getId().equals(enderecoId));

        if (!enderecoEncontrado) {
            throw new ResourceNotFoundException(ENDERECO_NAO_PERTENCE);
        }

        // Update the address in the service
        enderecoDTO.setId(enderecoId);
        enderecoService.update(enderecoId, enderecoDTO);

        // Get updated person
        Pessoa updatedPessoa = pessoaRepository.findById(pessoaId).get();
        return pessoaMapper.toDTO(updatedPessoa);
    }

    /**
     * Obter endereco da pessoa endereco dto.
     *
     * @param pessoaId   the pessoa id
     * @param enderecoId the endereco id
     * @return the endereco dto
     */
    public EnderecoDTO obterEnderecoDaPessoa(String pessoaId, String enderecoId) {
        Pessoa pessoa = pessoaRepository.findById(pessoaId)
                .orElseThrow(() -> new ResourceNotFoundException(PESSOA_NAO_ENCONTRADA_ID + pessoaId));

        return pessoa.getEnderecos().stream()
                .filter(endereco -> endereco.getId().equals(enderecoId))
                .findFirst()
                .map(enderecoMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException(ENDERECO_NAO_ENCONTRADO + enderecoId));
    }

    // Métodos de validaí§ío

    private void validateCpf(String cpf, String currentPersonId) {
        if (cpf == null || !cpf.matches("\\d{11}")) {
            throw new BusinessException("CPF invrálido. Deve conter 11 dí­gitos numéricos");
        }

        // Check if CPF already exists (excluding current person when updating)
        pessoaRepository.findByCpf(cpf).ifPresent(pessoa -> {
            if (currentPersonId == null || !pessoa.getId().equals(currentPersonId)) {
                throw new BusinessException("CPF jrá cadastrado no sistema");
            }
        });
    }

    private void validateEmail(String email, String currentPersonId) {
        if (email == null || !email.matches("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new BusinessException("Email invrálido");
        }

        // Check if email already exists (excluding current person when updating)
        pessoaRepository.findByEmail(email).ifPresent(pessoa -> {
            if (currentPersonId == null || !pessoa.getId().equals(currentPersonId)) {
                throw new BusinessException("Email jrá cadastrado no sistema");
            }
        });
    }

    private void validateBirthDate(String birthDate) {
        try {
            LocalDate date = LocalDate.parse(birthDate);
            if (date.isAfter(LocalDate.now())) {
                throw new BusinessException("Data de nascimento nío pode ser no futuro");
            }
            if (date.isBefore(LocalDate.now().minusYears(120))) {
                throw new BusinessException("Data de nascimento invrálida");
            }
        } catch (DateTimeParseException e) {
            throw new BusinessException("Formato de data invrálido. Use o formato YYYY-MM-DD");
        }
    }

    private void validateAddressData(EnderecoDTO endereco) {
        if (endereco.getCep() == null || endereco.getCep().trim().isEmpty()) {
            throw new BusinessException("CEP é obrigatório para o endereí§o");
        }

        if (endereco.getLocalidade() == null || endereco.getLocalidade().trim().isEmpty()) {
            throw new BusinessException("Cidade é obrigatória para o endereí§o");
        }

        if (endereco.getUf() == null || endereco.getUf().trim().isEmpty()) {
            throw new BusinessException("Estado é obrigatório para o endereí§o");
        }
    }

    private boolean isDuplicateAddress(Pessoa pessoa, EnderecoDTO newAddress) {
        return pessoa.getEnderecos().stream()
                .anyMatch(addr -> addr.getCep().equals(newAddress.getCep()) &&
                        addr.getLogradouro().equals(newAddress.getNomeLogradouro()) &&
                        addr.getNumero().equals(newAddress.getNumero()));
    }


    public Page<PessoaDTO> findAllPaged(Pageable pageable) {
        Page<Pessoa> page = pessoaRepository.findAll(pageable);
        return page.map(pessoaMapper::toDTO);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import lombok.Getter;

/**
 * The enum Tipo pessoa.
 */
@Getter
public enum TipoPessoa {

    // INSTRUTOR, ESTUDANTE, OUTRO

    /**
     * Instrutor tipo pessoa.
     */
    INSTRUTOR("Instrutor"),
    /**
     * Estudante tipo pessoa.
     */
    ESTUDANTE("Estudante"),
    /**
     * Outro tipo pessoa.
     */
    OUTRO("Outro");

    private final String descricao;

    TipoPessoa(String descricao) {
        this.descricao = descricao;
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.pessoa;

import com.mongodb_testando.mongodb_teste.domain.endereco.EnderecoDTO;
import com.mongodb_testando.mongodb_teste.exception.BusinessException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * The type Pessoa controller.
 */
@RestController
@RequestMapping("/api/pessoas")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    /**
     * Find all response entity.
     *
     * @return the response entity
     */
    @GetMapping
    public ResponseEntity<List<PessoaDTO>> findAll() {
        List<PessoaDTO> pessoas = pessoaService.findAll();
        return ResponseEntity.ok(pessoas);
    }

    /**
     * Find all paged response entity.
     *
     * @param pageable the pageable
     * @return the response entity
     */
    @GetMapping("/paged")
    public ResponseEntity<Page<PessoaDTO>> findAllPaged(Pageable pageable) {
        Page<PessoaDTO> pessoas = pessoaService.findAll(pageable);
        return ResponseEntity.ok(pessoas);
    }

    /**
     * Find by id response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<PessoaDTO> findById(@PathVariable String id) {
        PessoaDTO pessoa = pessoaService.findById(id);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Find by email response entity.
     *
     * @param email the email
     * @return the response entity
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<PessoaDTO> findByEmail(@PathVariable String email) {
        PessoaDTO pessoa = pessoaService.findByEmail(email);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Find by cpf response entity.
     *
     * @param cpf the cpf
     * @return the response entity
     */
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<PessoaDTO> findByCpf(@PathVariable String cpf) {
        PessoaDTO pessoa = pessoaService.findByCpf(cpf);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Find by nome containing response entity.
     *
     * @param nome the nome
     * @return the response entity
     */
    @GetMapping("/search")
    public ResponseEntity<List<PessoaDTO>> findByNomeContaining(@RequestParam String nome) {
        List<PessoaDTO> pessoas = pessoaService.findByNomeContaining(nome);
        return ResponseEntity.ok(pessoas);
    }

    /**
     * Find by data nascimento containing response entity.
     *
     * @param data the data
     * @return the response entity
     */
    @GetMapping("/aniversario")
    public ResponseEntity<List<PessoaDTO>> findByDataNascimentoContaining(@RequestParam String data) {
        List<PessoaDTO> pessoas = pessoaService.findByDataNascimentoContaining(data);
        return ResponseEntity.ok(pessoas);
    }

    /**
     * Create response entity.
     *
     * @param pessoaDto the pessoa dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<PessoaDTO> create(@Valid @RequestBody PessoaDTO pessoaDto) {
        try {
            PessoaDTO createdPessoa = pessoaService.create(pessoaDto);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(createdPessoa.getId())
                    .toUri();

            return ResponseEntity.created(location).body(createdPessoa);
        } catch (BusinessException e) {
            // Let GlobalExceptionHandler handle it
            throw e;
        }
    }

    /**
     * Update response entity.
     *
     * @param id        the id
     * @param pessoaDto the pessoa dto
     * @return the response entity
     */
    @PutMapping("/{id}")
    public ResponseEntity<PessoaDTO> update(@PathVariable String id, @Valid @RequestBody PessoaDTO pessoaDto) {
        PessoaDTO updatedPessoa = pessoaService.update(id, pessoaDto);
        return ResponseEntity.ok(updatedPessoa);
    }

    /**
     * Delete response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        pessoaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Exists by email response entity.
     *
     * @param email the email
     * @return the response entity
     */
    @GetMapping("/exists/email/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        boolean exists = pessoaService.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    /**
     * Exists by cpf response entity.
     *
     * @param cpf the cpf
     * @return the response entity
     */
    @GetMapping("/exists/cpf/{cpf}")
    public ResponseEntity<Boolean> existsByCpf(@PathVariable String cpf) {
        boolean exists = pessoaService.existsByCpf(cpf);
        return ResponseEntity.ok(exists);
    }

    /**
     * Count response entity.
     *
     * @return the response entity
     */
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        long count = pessoaService.count();
        return ResponseEntity.ok(count);
    }

    /**
     * Listar enderecos response entity.
     *
     * @param id the id
     * @return the response entity
     */
// Endereí§o integration endpoints
    @GetMapping("/{id}/enderecos")
    public ResponseEntity<List<EnderecoDTO>> listarEnderecos(@PathVariable String id) {
        List<EnderecoDTO> enderecos = pessoaService.listarEnderecos(id);
        return ResponseEntity.ok(enderecos);
    }

    /**
     * Adicionar endereco response entity.
     *
     * @param id          the id
     * @param enderecoDTO the endereco dto
     * @return the response entity
     */
    @PostMapping("/{id}/enderecos")
    public ResponseEntity<PessoaDTO> adicionarEndereco(
            @PathVariable String id,
            @Valid @RequestBody EnderecoDTO enderecoDTO) {
        PessoaDTO pessoa = pessoaService.adicionarEndereco(id, enderecoDTO);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Remover endereco response entity.
     *
     * @param pessoaId   the pessoa id
     * @param enderecoId the endereco id
     * @return the response entity
     */
    @DeleteMapping("/{pessoaId}/enderecos/{enderecoId}")
    public ResponseEntity<PessoaDTO> removerEndereco(
            @PathVariable String pessoaId,
            @PathVariable String enderecoId) {
        PessoaDTO pessoa = pessoaService.removerEndereco(pessoaId, enderecoId);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Atualizar endereco response entity.
     *
     * @param pessoaId    the pessoa id
     * @param enderecoId  the endereco id
     * @param enderecoDTO the endereco dto
     * @return the response entity
     */
    @PutMapping("/{pessoaId}/enderecos/{enderecoId}")
    public ResponseEntity<PessoaDTO> atualizarEndereco(
            @PathVariable String pessoaId,
            @PathVariable String enderecoId,
            @Valid @RequestBody EnderecoDTO enderecoDTO) {
        PessoaDTO pessoa = pessoaService.atualizarEndereco(pessoaId, enderecoId, enderecoDTO);
        return ResponseEntity.ok(pessoa);
    }

    /**
     * Obter endereco da pessoa response entity.
     *
     * @param pessoaId   the pessoa id
     * @param enderecoId the endereco id
     * @return the response entity
     */
    @GetMapping("/{pessoaId}/enderecos/{enderecoId}")
    public ResponseEntity<EnderecoDTO> obterEnderecoDaPessoa(
            @PathVariable String pessoaId,
            @PathVariable String enderecoId) {
        EnderecoDTO endereco = pessoaService.obterEnderecoDaPessoa(pessoaId, enderecoId);
        return ResponseEntity.ok(endereco);
    }
}
```

### Relacionamento entre entidades

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Circular relacionamento exception.
 */
public class CircularRelacionamentoException extends BusinessException {
    /**
     * Instantiates a new Circular relacionamento exception.
     */
    public CircularRelacionamentoException() {
        super("Relacionamento circular nío é permitido");
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Duplicate relacionamento exception.
 */
public class DuplicateRelacionamentoException extends BusinessException {
    /**
     * Instantiates a new Duplicate relacionamento exception.
     *
     * @param pessoaId            the pessoa id
     * @param pessoaRelacionadaId the pessoa relacionada id
     * @param tipo                the tipo
     */
    public DuplicateRelacionamentoException(String pessoaId, String pessoaRelacionadaId, String tipo) {
        super("Jrá existe um relacionamento do tipo " + tipo + " entre estas pessoas");
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions;

import com.mongodb_testando.mongodb_teste.exception.BusinessException;

/**
 * The type Invalid relacionamento exception.
 */
public class InvalidRelacionamentoException extends BusinessException {
    /**
     * Instantiates a new Invalid relacionamento exception.
     *
     * @param message the message
     */
    public InvalidRelacionamentoException(String message) {
        super(message);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions;

import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;

/**
 * The type Relacionamento not found exception.
 */
public class RelacionamentoNotFoundException extends ResourceNotFoundException {
    /**
     * Instantiates a new Relacionamento not found exception.
     *
     * @param id the id
     */
    public RelacionamentoNotFoundException(String id) {
        super("Relacionamento nío encontrado com ID: " + id);
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

/**
 * The type Relacionamento.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Document(collection = "relacionamentos")
public class Relacionamento {
    @Id
    private String id;

    // ID of the first person in the relationship
    private String pessoaId;

    // ID of the related person
    private String pessoaRelacionadaId;

    private TipoRelacionamento tipoRelacionamento;

    // If this relationship represents legal guardianship
    private boolean responsavelLegal;

    // When the relationship or guardianship started
    private LocalDate dataInicio;

    // Optional end date (for expired guardianships)
    private LocalDate dataFim;
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

/**
 * The type Relacionamento dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RelacionamentoDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "ID da pessoa é obrigatório")
    private String pessoaId;

    @NotBlank(message = "ID da pessoa relacionada é obrigatório")
    private String pessoaRelacionadaId;

    @NotNull(message = "Tipo de relacionamento é obrigatório")
    private TipoRelacionamento tipoRelacionamento;

    private boolean responsavelLegal;

    @NotNull(message = "Data de iní­cio é obrigatória")
    @PastOrPresent(message = "Data de iní­cio nío pode ser futura")
    private LocalDate dataInicio;

    @PastOrPresent(message = "Data de fim nío pode ser futura")
    private LocalDate dataFim;

    // Add nome fields for better UI display
    private String nomePessoa;
    private String nomePessoaRelacionada;
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * The interface Relacionamento repository.
 */
public interface RelacionamentoRepository extends MongoRepository<Relacionamento, String> {
    /**
     * Find by pessoa id list.
     *
     * @param pessoaId the pessoa id
     * @return the list
     */
    List<Relacionamento> findByPessoaId(String pessoaId);

    /**
     * Find by pessoa relacionada id list.
     *
     * @param pessoaRelacionadaId the pessoa relacionada id
     * @return the list
     */
    List<Relacionamento> findByPessoaRelacionadaId(String pessoaRelacionadaId);

    /**
     * Find by pessoa id and responsavel legal true list.
     *
     * @param pessoaId the pessoa id
     * @return the list
     */
    List<Relacionamento> findByPessoaIdAndResponsavelLegalTrue(String pessoaId);
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import org.mapstruct.*;

import java.util.List;

/**
 * Interface para mapeamento entre entidades Relacionamento e DTOs RelacionamentoDTO.
 * <p>
 * Esta interface utiliza o MapStruct para implementar a conversío bidirecional
 * entre os objetos de domí­nio e objetos de transferíªncia de dados.
 * </p>
 */
@Mapper(componentModel = "spring")
public interface RelacionamentoMapper {

    /**
     * Converte uma entidade Relacionamento para um DTO RelacionamentoDTO.
     *
     * @param relacionamento entidade a ser convertida
     * @return um novo objeto RelacionamentoDTO com os dados da entidade
     */
    RelacionamentoDTO toDTO(Relacionamento relacionamento);

    /**
     * Converte um DTO RelacionamentoDTO para uma entidade Relacionamento.
     *
     * @param dto DTO a ser convertido
     * @return uma nova entidade Relacionamento com os dados do DTO
     */
    Relacionamento toEntity(RelacionamentoDTO dto);

    /**
     * Converte uma lista de entidades Relacionamento para uma lista de DTOs RelacionamentoDTO.
     *
     * @param relacionamentos lista de entidades a ser convertida
     * @return uma nova lista de DTOs
     */
    List<RelacionamentoDTO> toDTOList(List<Relacionamento> relacionamentos);

    /**
     * Converte uma lista de DTOs RelacionamentoDTO para uma lista de entidades Relacionamento.
     *
     * @param dtos lista de DTOs a ser convertida
     * @return uma nova lista de entidades
     */
    List<Relacionamento> toEntityList(List<RelacionamentoDTO> dtos);

    /**
     * Atualiza uma entidade Relacionamento existente com os dados de um RelacionamentoDTO.
     * <p>
     * Propriedades nulas no DTO nío sobrescrevem os valores na entidade existente.
     * </p>
     *
     * @param dto            DTO contendo os novos dados
     * @param relacionamento entidade a ser atualizada
     * @return a entidade atualizada
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    Relacionamento updateEntityFromDTO(RelacionamentoDTO dto, @MappingTarget Relacionamento relacionamento);
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import lombok.Getter;

/**
 * The enum Tipo relacionamento.
 */
@Getter
public enum TipoRelacionamento {
    /**
     * Pai tipo relacionamento.
     */
    PAI("Pai"),
    /**
     * Mae tipo relacionamento.
     */
    MAE("Mí£e"),
    /**
     * Filho tipo relacionamento.
     */
    FILHO("Filho"),
    /**
     * Filha tipo relacionamento.
     */
    FILHA("Filha"),
    /**
     * Avo tipo relacionamento.
     */
    AVO("Aví´"),
    /**
     * Avoa tipo relacionamento.
     */
    AVOA("Avó"),
    /**
     * Irmao tipo relacionamento.
     */
    IRMAO("Irmío"),
    /**
     * Irma tipo relacionamento.
     */
    IRMA("Irmí£"),
    /**
     * Tio tipo relacionamento.
     */
    TIO("Tio"),
    /**
     * Tia tipo relacionamento.
     */
    TIA("Tia"),
    /**
     * Marido tipo relacionamento.
     */
    MARIDO("Marido"),
    /**
     * Esposa tipo relacionamento.
     */
    ESPOSA("Esposa"),
    /**
     * The Responsavel.
     */
    RESPONSAVEL("Responsrável Legal"),
    /**
     * Outro tipo relacionamento.
     */
    OUTRO("Outro");

    private final String descricao;

    TipoRelacionamento(String descricao) {
        this.descricao = descricao;
    }

}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Factory class for creating test instances of Relacionamento and RelacionamentoDTO objects.
 */
public class RelacionamentoFactory {

    /**
     * Creates a default RelacionamentoDTO instance with sample data
     *
     * @return a new RelacionamentoDTO with default test values
     */
    public static RelacionamentoDTO createRelacionamentoDTO() {
        RelacionamentoDTO dto = new RelacionamentoDTO();
        dto.setPessoaId(UUID.randomUUID().toString());
        dto.setPessoaRelacionadaId(UUID.randomUUID().toString());
        dto.setTipoRelacionamento(TipoRelacionamento.PAI);
        dto.setResponsavelLegal(false);
        dto.setDataInicio(LocalDate.now().minusYears(5));
        dto.setNomePessoa("Joío Silva");
        dto.setNomePessoaRelacionada("Maria Silva");
        return dto;
    }

    /**
     * Creates a RelacionamentoDTO with specified person IDs
     *
     * @param pessoaId            ID of the first person
     * @param pessoaRelacionadaId ID of the related person
     * @return a new RelacionamentoDTO with the specified person IDs
     */
    public static RelacionamentoDTO createRelacionamentoDTOWithPessoas(
            String pessoaId, String pessoaRelacionadaId) {
        RelacionamentoDTO dto = createRelacionamentoDTO();
        dto.setPessoaId(pessoaId);
        dto.setPessoaRelacionadaId(pessoaRelacionadaId);
        return dto;
    }

    /**
     * Creates a RelacionamentoDTO with specified relationship type
     *
     * @param tipo             The relationship type
     * @param responsavelLegal Whether this is a legal guardianship
     * @return a new RelacionamentoDTO with the specified relationship type
     */
    public static RelacionamentoDTO createRelacionamentoDTOWithTipo(
            TipoRelacionamento tipo, boolean responsavelLegal) {
        RelacionamentoDTO dto = createRelacionamentoDTO();
        dto.setTipoRelacionamento(tipo);
        dto.setResponsavelLegal(responsavelLegal);
        return dto;
    }

    /**
     * Creates a list of RelacionamentoDTO instances with different relationship types
     *
     * @param pessoaId ID of the person for all relationships
     * @return List of RelacionamentoDTO instances
     */
    public static List<RelacionamentoDTO> createRelacionamentoDTOList(String pessoaId) {
        List<RelacionamentoDTO> relacionamentos = new ArrayList<>();

        // Parent relationship
        RelacionamentoDTO paiDto = createRelacionamentoDTOWithTipo(TipoRelacionamento.PAI, true);
        paiDto.setPessoaId(pessoaId);
        paiDto.setNomePessoaRelacionada("José Silva");
        relacionamentos.add(paiDto);

        // Sibling relationship
        RelacionamentoDTO irmaoDto = createRelacionamentoDTOWithTipo(TipoRelacionamento.IRMAO, false);
        irmaoDto.setPessoaId(pessoaId);
        irmaoDto.setNomePessoaRelacionada("Carlos Silva");
        relacionamentos.add(irmaoDto);

        return relacionamentos;
    }

    /**
     * Creates a Relacionamento entity from a DTO
     *
     * @param dto The DTO to convert
     * @return A new Relacionamento entity
     */
    public static Relacionamento createRelacionamentoFromDTO(RelacionamentoDTO dto) {
        Relacionamento relacionamento = new Relacionamento();
        relacionamento.setId(UUID.randomUUID().toString());
        relacionamento.setPessoaId(dto.getPessoaId());
        relacionamento.setPessoaRelacionadaId(dto.getPessoaRelacionadaId());
        relacionamento.setTipoRelacionamento(dto.getTipoRelacionamento());
        relacionamento.setResponsavelLegal(dto.isResponsavelLegal());
        relacionamento.setDataInicio(dto.getDataInicio());
        relacionamento.setDataFim(dto.getDataFim());
        return relacionamento;
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import com.mongodb_testando.mongodb_teste.domain.pessoa.PessoaDTO;
import com.mongodb_testando.mongodb_teste.domain.pessoa.PessoaService;
import com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions.CircularRelacionamentoException;
import com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions.DuplicateRelacionamentoException;
import com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions.InvalidRelacionamentoException;
import com.mongodb_testando.mongodb_teste.domain.relacionamento.exceptions.RelacionamentoNotFoundException;
import com.mongodb_testando.mongodb_teste.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

/**
 * The type Relacionamento service.
 */
@Service
@RequiredArgsConstructor
public class RelacionamentoService {
    private final RelacionamentoRepository relacionamentoRepository;
    private final PessoaService pessoaService;
    private final RelacionamentoMapper relacionamentoMapper;

    /**
     * Find relacionamentos by pessoa id list.
     *
     * @param pessoaId the pessoa id
     * @return the list
     */
    public List<RelacionamentoDTO> findRelacionamentosByPessoaId(String pessoaId) {
        // Verify person exists first
        try {
            pessoaService.findById(pessoaId);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("Pessoa nío encontrada com ID: " + pessoaId);
        }

        List<Relacionamento> relacionamentos = relacionamentoRepository.findByPessoaId(pessoaId);
        List<RelacionamentoDTO> dtos = relacionamentoMapper.toDTOList(relacionamentos);

        // Add person names to DTOs
        dtos.forEach(this::adicionarNomesPessoas);

        return dtos;
    }

    /**
     * Find by id relacionamento dto.
     *
     * @param id the id
     * @return the relacionamento dto
     */
    public RelacionamentoDTO findById(String id) {
        Relacionamento relacionamento = relacionamentoRepository.findById(id)
                .orElseThrow(() -> new RelacionamentoNotFoundException(id));

        RelacionamentoDTO dto = relacionamentoMapper.toDTO(relacionamento);
        adicionarNomesPessoas(dto);
        return dto;
    }

    /**
     * Create relacionamento relacionamento dto.
     *
     * @param dto the dto
     * @return the relacionamento dto
     */
    public RelacionamentoDTO createRelacionamento(RelacionamentoDTO dto) {
        // Validate relationship data
        validateRelacionamentoData(dto);

        // Validate both people exist
        PessoaDTO pessoa = pessoaService.findById(dto.getPessoaId());
        PessoaDTO pessoaRelacionada = pessoaService.findById(dto.getPessoaRelacionadaId());

        // Check if relationship already exists
        validateNoExistingRelationship(dto);

        // Check if relationship is circular
        if (dto.getPessoaId().equals(dto.getPessoaRelacionadaId())) {
            throw new CircularRelacionamentoException();
        }

        // Check relationship type compatibility
        validateRelationshipType(dto);

        Relacionamento relacionamento = relacionamentoMapper.toEntity(dto);
        relacionamento = relacionamentoRepository.save(relacionamento);

        RelacionamentoDTO savedDto = relacionamentoMapper.toDTO(relacionamento);
        adicionarNomesPessoas(savedDto);

        return savedDto;
    }

    /**
     * Update relacionamento relacionamento dto.
     *
     * @param id  the id
     * @param dto the dto
     * @return the relacionamento dto
     */
    public RelacionamentoDTO updateRelacionamento(String id, RelacionamentoDTO dto) {
        // Check if relationship exists
        Relacionamento relacionamento = relacionamentoRepository.findById(id)
                .orElseThrow(() -> new RelacionamentoNotFoundException(id));

        // Validate update data
        validateRelacionamentoUpdateData(dto, relacionamento);

        // Update entity
        relacionamentoMapper.updateEntityFromDTO(dto, relacionamento);
        Relacionamento updatedRelacionamento = relacionamentoRepository.save(relacionamento);

        RelacionamentoDTO updatedDto = relacionamentoMapper.toDTO(updatedRelacionamento);
        adicionarNomesPessoas(updatedDto);

        return updatedDto;
    }

    /**
     * Delete relacionamento.
     *
     * @param id the id
     */
    public void deleteRelacionamento(String id) {
        if (!relacionamentoRepository.existsById(id)) {
            throw new RelacionamentoNotFoundException(id);
        }
        relacionamentoRepository.deleteById(id);
    }

    private void adicionarNomesPessoas(RelacionamentoDTO dto) {
        try {
            PessoaDTO pessoa = pessoaService.findById(dto.getPessoaId());
            PessoaDTO pessoaRelacionada = pessoaService.findById(dto.getPessoaRelacionadaId());

            dto.setNomePessoa(pessoa.getNomeCompleto());
            dto.setNomePessoaRelacionada(pessoaRelacionada.getNomeCompleto());
        } catch (ResourceNotFoundException e) {
            // Use placeholder for missing persons
            if (dto.getNomePessoa() == null) {
                dto.setNomePessoa("Pessoa nío encontrada");
            }
            if (dto.getNomePessoaRelacionada() == null) {
                dto.setNomePessoaRelacionada("Pessoa nío encontrada");
            }
        }
    }

    private void validateRelacionamentoData(RelacionamentoDTO dto) {
        if (dto.getPessoaId() == null || dto.getPessoaId().trim().isEmpty()) {
            throw new InvalidRelacionamentoException("ID da pessoa é obrigatório");
        }

        if (dto.getPessoaRelacionadaId() == null || dto.getPessoaRelacionadaId().trim().isEmpty()) {
            throw new InvalidRelacionamentoException("ID da pessoa relacionada é obrigatório");
        }

        if (dto.getTipoRelacionamento() == null) {
            throw new InvalidRelacionamentoException("Tipo de relacionamento é obrigatório");
        }

        if (dto.getDataInicio() == null) {
            throw new InvalidRelacionamentoException("Data de iní­cio do relacionamento é obrigatória");
        }

        if (dto.getDataInicio() != null && dto.getDataFim() != null &&
                dto.getDataFim().isBefore(dto.getDataInicio())) {
            throw new InvalidRelacionamentoException("Data de fim nío pode ser anterior í  data de iní­cio");
        }

        if (dto.getDataInicio().isAfter(LocalDate.now())) {
            throw new InvalidRelacionamentoException("Data de iní­cio nío pode ser futura");
        }
    }

    private void validateNoExistingRelationship(RelacionamentoDTO dto) {
        List<Relacionamento> existingRelationships = relacionamentoRepository.findByPessoaId(dto.getPessoaId());

        boolean duplicateExists = existingRelationships.stream()
                .anyMatch(r -> r.getPessoaRelacionadaId().equals(dto.getPessoaRelacionadaId()) &&
                        r.getTipoRelacionamento() == dto.getTipoRelacionamento());

        if (duplicateExists) {
            throw new DuplicateRelacionamentoException(
                    dto.getPessoaId(),
                    dto.getPessoaRelacionadaId(),
                    dto.getTipoRelacionamento().getDescricao());
        }
    }

    private void validateRelationshipType(RelacionamentoDTO dto) {
        // Example validation - implement according to your business rules
        if (dto.isResponsavelLegal()) {
            // Check if person is minor
            PessoaDTO pessoa = pessoaService.findById(dto.getPessoaId());
            // Assuming there's an age or status check in your model
            if (pessoa.getDataNascimento() == null) {
                throw new InvalidRelacionamentoException(
                        "Data de nascimento é necessrária para verificar se pessoa pode ter responsrável legal");
            }
        }
    }

    private void validateRelacionamentoUpdateData(RelacionamentoDTO dto, Relacionamento existingRelacionamento) {
        // Prevent changing key relationship properties
        if (dto.getPessoaId() != null && !dto.getPessoaId().equals(existingRelacionamento.getPessoaId())) {
            throw new InvalidRelacionamentoException("Nío é permitido alterar a pessoa do relacionamento");
        }

        if (dto.getPessoaRelacionadaId() != null &&
                !dto.getPessoaRelacionadaId().equals(existingRelacionamento.getPessoaRelacionadaId())) {
            throw new InvalidRelacionamentoException("Nío é permitido alterar a pessoa relacionada");
        }

        // Other validations as needed
        if (dto.getDataInicio() != null && dto.getDataFim() != null &&
                dto.getDataFim().isBefore(dto.getDataInicio())) {
            throw new InvalidRelacionamentoException("Data de fim nío pode ser anterior í  data de iní­cio");
        }
    }
}
```

---

```java
package com.mongodb_testando.mongodb_teste.domain.relacionamento;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

/**
 * The type Relacionamento controller.
 */
@RestController
@RequestMapping("/api/relacionamentos")
@RequiredArgsConstructor
public class RelacionamentoController {
    private final RelacionamentoService relacionamentoService;

    /**
     * Find by pessoa id response entity.
     *
     * @param pessoaId the pessoa id
     * @return the response entity
     */
    @GetMapping("/pessoa/{pessoaId}")
    public ResponseEntity<List<RelacionamentoDTO>> findByPessoaId(@PathVariable String pessoaId) {
        List<RelacionamentoDTO> relacionamentos = relacionamentoService.findRelacionamentosByPessoaId(pessoaId);
        return ResponseEntity.ok(relacionamentos);
    }

    /**
     * Find by id response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<RelacionamentoDTO> findById(@PathVariable String id) {
        RelacionamentoDTO relacionamento = relacionamentoService.findById(id);
        return ResponseEntity.ok(relacionamento);
    }

    /**
     * Create response entity.
     *
     * @param relacionamentoDTO the relacionamento dto
     * @return the response entity
     */
    @PostMapping
    public ResponseEntity<RelacionamentoDTO> create(@Valid @RequestBody RelacionamentoDTO relacionamentoDTO) {
        RelacionamentoDTO created = relacionamentoService.createRelacionamento(relacionamentoDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getPessoaId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    /**
     * Update response entity.
     *
     * @param id                the id
     * @param relacionamentoDTO the relacionamento dto
     * @return the response entity
     */
    @PutMapping("/{id}")
    public ResponseEntity<RelacionamentoDTO> update(
            @PathVariable String id,
            @Valid @RequestBody RelacionamentoDTO relacionamentoDTO) {
        RelacionamentoDTO updated = relacionamentoService.updateRelacionamento(id, relacionamentoDTO);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        relacionamentoService.deleteRelacionamento(id);
        return ResponseEntity.noContent().build();
    }
}
```
