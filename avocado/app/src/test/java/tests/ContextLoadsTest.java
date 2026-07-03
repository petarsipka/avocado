package tests;

import com.app.AppApplication;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = AppApplication.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class ContextLoadsTest {

    @Test
    public void contextLoads() {
    }
}
