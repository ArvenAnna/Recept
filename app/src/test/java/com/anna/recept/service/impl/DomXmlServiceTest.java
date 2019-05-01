//package com.anna.recipe.service.impl;
//
//import com.anna.recipe.entity.Department;
//import com.anna.recipe.entity.Recipe;
//import com.anna.recipe.service.*;
//import org.apache.commons.io.FileUtils;
//import org.junit.Before;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.mockito.Matchers.any;
//import static org.mockito.Mockito.when;
//
////@RunWith(MockitoJUnitRunner.class)
//public class DomXmlServiceTest {
//
//    private static final String RECEPT_SCHEME = "xml/recept_scheme.xsd";
//    private static final String LANG_CONFIG = "xml/Lang.xml";
//    private static final Integer RECEPT_ID = 23;
//
//    @Mock
//    private IFileService fileService;
//    @Mock
//    private IRecipeService receptService;
//    @Mock
//    private IDepartService departService;
//    @Mock
//    private ITagService tagService;
//    @Mock
//    private IReferenceService refService;
//    @Mock
//    private IIngredientService ingService;
//    @Mock
//    private IProportionService propService;
//
//    @InjectMocks
//    private DomXmlService sut;
//
//    private Integer receptId;
//    private String receptName = "Куриные гнёзда";
//    private String receptDesc = "Приготовить";
//    private String receptDepart = "Вторые блюда";
//    private String receptIng = "Яйца";
//    private String receptNorma = "7-8 шт";
//    private String tag = "Вкусно";
//    private String referenceName = "Каша";
//
//    @Before
//    public void configureMocks() throws IOException {
//        when(fileService.getXsdScheme()).thenReturn(new File(RECEPT_SCHEME));
//        when(receptService.saveRecipe(any())).thenReturn(RECEPT_ID);
//        when(departService.findAllDepartments()).thenReturn(constructDepart());
//        when(fileService.getLangConfig()).thenReturn(new File(LANG_CONFIG));
//    }
//
////    @Test
////    public void shouldGetReceptFromXml() throws IOException {
////        MultipartFile mpFile = getMultipartMockFile();
////
////        receptId = sut.getReceptFromXml(mpFile);
////
////        assertThat(receptId, is(RECEPT_ID));
////    }
//
////    @Test()
////    public void shouldGetPdfFromRecept() throws IOException {
////        byte[] pdf = sut.getPdfFromRecept(RECEPT_ID);
////
////        assertNotNull(pdf);
////    }
//
//    private MultipartFile getMultipartMockFile() throws IOException {
//        File file = new File("test.xml");
//        String data = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Recipe><Name>" + receptName + "</Name><Description>" +
//                receptDesc + "</Description><Depart>" + receptDepart + "</Depart><Proportions><Proportion><Ingredient>" +
//                receptIng + "</Ingredient><Norma>" + receptNorma + "</Norma></Proportion></Proportions>" +
//                "<Tags><Tag>" + tag + "</Tag></Tags><References><Reference>" + referenceName + "</Reference></References></Recipe>";
//        FileUtils.writeStringToFile(file, data);
//        Path path = Paths.get(file.getAbsolutePath());
//        byte[] mpBytes = Files.readAllBytes(path);
//        MultipartFile mpFile = new MockMultipartFile("test.xml", mpBytes);
//        file.delete();
//        return mpFile;
//    }
//
//    private List<Department> constructDepart() {
//        Department depart = new Department();
//        depart.setName(receptDepart);
//        return Arrays.asList(depart);
//    }
//
//    private Recipe constructReceptDto() {
//        Recipe recipe = new Recipe();
//        recipe.setName("name");
//        recipe.setText("text");
//        Department depart = new Department();
//        depart.setName("depart");
//        return recipe;
//    }
//}