package com.anna.recept.service.impl;

import com.anna.recept.entity.Detail;
import com.anna.recept.repository.DetailRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class DetailServiceTest {

    @InjectMocks
    private DetailService sut;

    @Mock
    private DetailRepository detRep;

    private static final Integer DETAIL_LIST_SIZE = 1;
    private static final Integer RECEPT_ID = 34;
    private static final Integer DETAIL_ID = 4;
    private static final String PATH = "file/path";


    @Before
    public void setUp() {
        when(detRep.findOne(anyInt())).thenReturn(createDetail());
        when(detRep.save(any(Detail.class))).thenReturn(createDetail());
    }

//    @Test
//    public void shouldFindReceptsDetails() {
//        List<Detail> detailsList = sut.findReceptsDetails(RECEPT_ID);
//        assertNotNull(detailsList);
//
//        verify(detRep).findOne(RECEPT_ID);
//    }

    @Test
    public void shouldSaveDetail() {
        Integer detId = sut.saveDetail(new Detail());

        //verify(detRep).save(any());
        assertThat(detId, is(DETAIL_ID));
    }

    @Test
    public void shouldDeleteDetail() {
        sut.deleteDetail(DETAIL_ID);

        verify(detRep).delete(DETAIL_ID);
    }

    @Test
    public void shouldSaveFilePath() {
        sut.saveFilePath(PATH, DETAIL_ID);

        verify(detRep).findOne(DETAIL_ID);
        verify(detRep).flush();
    }

    @Test
    public void shouldFindDetail() {
        sut.findDetail(DETAIL_ID);

        verify(detRep).findOne(DETAIL_ID);
    }

    @Test
    public void shouldFindReceptByDetailId() {
        sut.findReceptByDetailId(DETAIL_ID);

        verify(detRep).findReceptByDetail(DETAIL_ID);
    }

    private List<Detail> createDetailList(int detailNumber) {
        List<Detail> detailList = new ArrayList<>();
        for (int i = 0; i < detailNumber; i++) {
            detailList.add(createDetail());
        }
        return detailList;
    }

    private Detail createDetail() {
        Detail detail = new Detail();
        detail.setId(DETAIL_ID);
        return detail;
    }

}