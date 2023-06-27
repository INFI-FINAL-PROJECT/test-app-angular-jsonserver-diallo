import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/product/product.service';

interface CompanyLength {
  value: string;
  viewValue: string;
}

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  phoneNumberControl!: FormControl;

  companyNameControl!: FormControl;
  companyLengthControl!: FormControl;
  companyLocationControl!: FormControl;

  products!: Product[];

  categories!: string[];

  companyLengths: CompanyLength[] = [
    { value: '0-9', viewValue: '0 à 9' },
    { value: '10-29', viewValue: '10 à 29' },
    { value: '30-49', viewValue: '30 à 49' },
  ];

  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];
  selectedCategory!: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initfirstFormGroupControl();
    this.initfirstFormGroupGroup();

    this.initSecondForm();

    this.getProducts();
  }

  private initfirstFormGroupGroup(): void {
    this.firstFormGroup = this.fb.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      phoneNumber: this.phoneNumberControl,
    });
  }

  private initfirstFormGroupControl(): void {
    this.firstNameControl = new FormControl('', Validators.required);
    this.lastNameControl = new FormControl('', Validators.required);
    this.emailControl = new FormControl('test@gmail.com', [
      Validators.required,
      Validators.email,
    ]);
    this.phoneNumberControl = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]);
  }

  private initSecondForm(): void {
    this.initsecondFormGroupControl();
    this.initsecondFormGroup();
  }

  private initsecondFormGroupControl(): void {
    this.companyNameControl = new FormControl('', Validators.required);
    this.companyLengthControl = new FormControl('', Validators.required);
    this.companyLocationControl = new FormControl('', Validators.required);
  }

  private initsecondFormGroup(): void {
    this.secondFormGroup = this.fb.group({
      companyName: this.companyNameControl,
      companyLength: this.companyLengthControl,
      companyLocation: this.companyLocationControl,
    });
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Veuillez saisir au moins 10 caractères';
    } else if (ctrl.hasError('maxlength')) {
      return 'Trop long';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  getProducts() {
    this.productService.getProducts().subscribe((products) => {
      console.log('Les produits' + products);
      this.products = products;
    });

    this.getCategories(this.products);
  }

  getCategories(products: Product[]) {
    this.categories = products.reduce(
      (acc: string[], elem: Product) =>
        acc.includes(elem.category.name) ? acc : acc.concat(elem.category.name),
      []
    );
  }

  getProductsByCategory(category: string): void {
    this.products.filter(
      (product: Product) => product.category.name === category
    );
  }

  selectCategory(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.getProductsByCategory(this.selectedCategory);
  }
}
