import { Component } from '@angular/core';
import { Product } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-app-angular-jsonserver';

  product: Product = {
    _id: '000011',
    category: {
      _id: 'idCat1',
      name: 'Ctegory 1,',
    },
    name: 'Voiture',
    price: '25',
    description: 'eeeeeeeeeeeeezzzz zgyyye',
  };
}
