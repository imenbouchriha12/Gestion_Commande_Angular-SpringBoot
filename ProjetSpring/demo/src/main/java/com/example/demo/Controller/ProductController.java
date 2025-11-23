package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Product;
import com.example.demo.Service.ProductService;

@CrossOrigin(origins = "*", allowedHeaders ="*")
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService service;
    @RequestMapping(value="/Products", method= RequestMethod.GET)
    List<Product> getAll(){
        List<Product> Products= service.getAll();
        return Products;
    }
    @RequestMapping(value = "/Product/{id}",method = RequestMethod.GET)
    Product getProductbyid(@PathVariable Long id){
        Product Product= service.getProduct(id);
        return Product;

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addProduct")
    Product addProduct(@RequestBody Product Product){

        return service.addProduct(Product);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/deleteProduct/{id}",method = RequestMethod.DELETE)
    public void deleteProductById(@PathVariable Long id){
        Product Product = service.getProduct(id);
        service.deletProduct(Product);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value="/updateProduct", method=RequestMethod.PUT)
    public void updateProductById(@RequestBody Product Product){
        Product p=service.getProduct(Product.getId());

       p.setNom(Product.getNom());
       p.setPrix(Product.getPrix());
       p.setDescription(Product.getDescription());
       p.setStock(Product.getStock());
       p.setPhoto(Product.getPhoto());
       p.setPhotoBase64(Product.getPhotoBase64());
        service.updateProduct(p);
    }
    @GetMapping("/Products/paginated")
    public Page<Product> getProductsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        return service.getProductsAvecPaginationEtTri(page, size);
    }
    
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/deleteproducts")
public void deleteMultipleProducts(@RequestBody Long[] ids) {
    service.deleteProduits(ids);
}



}
