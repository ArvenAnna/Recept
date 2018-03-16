package com.anna.recept.service;

import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Recept;

import java.util.List;

public interface IDetailService {
    List<Detail> findReceptsDetails(Integer receptId);

    int saveDetail(Detail detail);

    void deleteDetail(Integer id);

    void saveFilePath(String path, Integer detailId);

    Detail findDetail(Integer detailId);

    Recept findReceptByDetailId(Integer detailId);
}
