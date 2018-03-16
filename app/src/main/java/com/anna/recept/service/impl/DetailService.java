package com.anna.recept.service.impl;

import com.anna.recept.entity.Detail;
import com.anna.recept.entity.Recept;
import com.anna.recept.repository.DetailRepository;
import com.anna.recept.repository.ReceptRepository;
import com.anna.recept.service.IDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DetailService implements IDetailService {

    @Autowired
    private DetailRepository detailRep;

    @Autowired
    private ReceptRepository receptRep;


    @Override
    @Transactional
    public List<Detail> findReceptsDetails(Integer receptId) {
        return receptRep.findOne(receptId).getDetails();
    }

    @Override
    @Transactional
    public int saveDetail(Detail detail) {
        return detailRep.save(detail).getId();
    }

    @Override
    public void deleteDetail(Integer id) {
        detailRep.delete(id);
    }

    @Override
    @Transactional
    public void saveFilePath(String path, Integer detailId) {
        Detail detail = detailRep.findOne(detailId);
        detail.setFilePath(path);
        detailRep.flush();
    }

    @Override
    public Detail findDetail(Integer detailId) {
        return detailRep.findOne(detailId);
    }

    @Override
    public Recept findReceptByDetailId(Integer detailId) {
        //no more info about recept - see how used
        return detailRep.findReceptByDetail(detailId);
    }
}
