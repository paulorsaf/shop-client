import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginComponent } from './components/login/login.component';
import { User } from './model/user/user';
import { AppState } from './store/app-state';
import { logout } from './store/user/user.actions';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.user.user);
  }

  async openLogin() {
    this.menu.close();
    const modal = await this.modalController.create({
      component: LoginComponent
    })
    modal.present();
  }

  logout() {
    this.menu.close();
    this.store.dispatch(logout());
  }

}
