package com.anna.recept.configuration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

public class WebInitializer implements WebApplicationInitializer {
    public void onStartup(ServletContext servletContext) throws ServletException {
        //map to properties file
        //servletContext.setInitParameter("resource.root.location", "C:/D/Java/Recipe/src/main/webapp");

        //servletContext.setInitParameter("upload.location", System.getenv("FOTO_LOCATION"));
        servletContext.setInitParameter("resource.xml.location", "C:/D/Java/Recipe/xml");
        servletContext.setInitParameter("resource.temp.location", "tempfiles");

        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(WebConfig.class);
        ctx.setServletContext(servletContext);

        servletContext.addListener(new ContextLoaderListener(ctx));

        FilterRegistration.Dynamic filter = servletContext.addFilter("encodingFilter", CharacterEncodingFilter.class);
        filter.addMappingForUrlPatterns(null, false, "/");
        filter.setInitParameter("encoding", "UTF-8");
        filter.setInitParameter("forceEncoding", "true");

//
//        FilterRegistration.Dynamic filter2 = servletContext.addFilter("log4jServletFilter", Log4jServletFilter.class);

        ServletRegistration.Dynamic servlet = servletContext.addServlet(
                "dispatcher", new DispatcherServlet(ctx));

        servlet.setLoadOnStartup(1);
        servlet.addMapping("/api/*");
    }
}
