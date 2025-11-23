package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Model.Product;
import com.example.demo.Repository.ProductRepository;

@Service
public class ProductService {
       @Autowired
    ProductRepository rep;
    public List<Product> getAll(){
        return rep.findAll();
    }
    public Product getProduct(Long id){
        Optional<Product> oPersonne;
        oPersonne = rep.findById(id);
        if(oPersonne.isPresent()){
            return oPersonne.get();
        }
        else{
            return null;
        }
    }

    public Product addProduct(Product Product){

        return rep.save(Product);
    }
    public void deletProduct(Product Product){
        rep.delete(Product);
    }
    public Product updateProduct(Product Product){
        return rep.save(Product);
    }
    public Page<Product> getProductsAvecPaginationEtTri(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "nom"));
        return rep.findAll(pageable);
    }
@Transactional
public void deleteProduits(Long[] ids) {
    for (Long id : ids) {
        if (rep.existsById(id)) {
            rep.deleteById(id);
        }
    }
}


 
}
