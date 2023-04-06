import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../security/service/token.service';
import {FoodService} from '../../food/food.service';
import {Food} from '../../entity/food/food';
import {FoodJson} from '../../entity/food/food-json';
import {Category} from '../../entity/food/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  titleProduct = '';
  categoryId: any = '';
  page: number = 0;
  foods: Food[] = [];
  food: Food = {price: 0};
  foodEdit:Food={price: 0};
  categorys: Category[] = [];
  foodPage!: FoodJson;
  selectedImage: any = null;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined;
  src: string | undefined;

  constructor(private storage: AngularFireStorage,private tokenService: TokenService, private foodService: FoodService) {
    this.titleProduct='titleList';
    this.productForm = new FormGroup({
      idFood: new FormControl(),
      name: new FormControl('',[Validators.required]),
      img: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      promotion: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getListFood(this.categoryId, this.page);
    this.getListCategory();
    this.food={price:0};

  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // @ts-ignore
          this.downloadURL.subscribe(url => {
            if (url) {
              // lấy lại url
              this.fb = url;
              this.foodEdit.img=url;
            }
            this.productForm.patchValue({img: url});
            // console.log('link: ', this.fb);
          });
        })
      )
      .subscribe();
  }

  titleList() {
    this.titleProduct = 'titleList';
    this.getListFood('',0);
  }

  titleEdit() {
    this.productForm.reset();
    this.foodEdit=this.food;
    this.titleProduct = 'titleEdit';
    if (!this.food.idFood){
      this.titleList();
      Swal.fire(
        'Thông báo!',
        'Chọn sản phẩm cần chỉnh sửa!',
        'warning'
      )
    }
    this.productForm.patchValue(this.food);
    this.ngOnInit();
  }

  titleDelete() {
    this.titleProduct = 'titleDelete';
    if (!this.food.idFood){
      this.titleList();
      Swal.fire(
        'Thông báo!',
        'Chọn sản phẩm cần xóa!',
        'warning'
      )
    }
  }

  titleCreate() {
    this.productForm.reset();
    this.food={price:0};
    this.titleProduct = 'titleCreate';
    this.ngOnInit();

  }

  getIdClick(food: any) {
    this.food = food;
  }

  changePage(page: number) {
    this.page=page;
    this.getListFood(this.categoryId, page);
  }

  getListFood(category: any, page: number) {
    this.foodService.getListFood(category, page).subscribe(data => {
      this.foods = data.content;
      this.foodPage = data;
    });
  }

  getListCategory() {
    this.foodService.getListCategory().subscribe(data => {
      this.categorys = data;
    });
  }

  search(categoryId: any) {
    // console.log(categoryId);
    this.categoryId = categoryId;
    this.getListFood(categoryId, 0);
  }

  create() {
    this.food = this.productForm.value;
    this.foodService.saveFood(this.food).subscribe(data => {
      // console.log(data);
      this.titleList();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Thêm mới sản phẩm thành công!',
        showConfirmButton: false,
        timer: 2500
      });
    });
    this.productForm.reset();
  }

  compareWithCategory(o1: Category, o2: Category): boolean {
    return o1 && o2 ? o1.idCategory === o2.idCategory : o1 === o2;
  }

  edit() {
    this.foodService.editFood(this.productForm.value).subscribe(data=>{
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Chỉnh sửa sản phẩm thành công!',
        showConfirmButton: false,
        timer: 2500
      })
      this.titleList();
      this.ngOnInit();
    });
    this.productForm.reset();
  }

  delete(idFood: any) {
    this.foodService.deleteFood(idFood).subscribe(data=>{
      this.titleProduct = 'titleList';
      this.ngOnInit();
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Xóa thành công!',
        showConfirmButton: false,
        timer: 2500
      });
    });

  }

  noDelete() {
    this.titleProduct = 'titleList';
    this.ngOnInit();

  }

  get productFormValue(){
    return this.productForm.controls;
  }
}
