import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthService } from './services/auth.service';
import { SidenavsService } from './services/sidenavs.service';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';
import { ShowForRolesService } from './services/show-for-roles.service';
import { AuthUserModel } from './models/authUserModel';
import { GlobalMessageComponent } from './components/messages/global-message/global-message.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatNavList } from '@angular/material/list';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, 
    MatToolbarModule, MatSidenavModule, MatIconModule,
    ShowForRolesDirective, GlobalMessageComponent, MatTooltipModule, MatMenu, 
    MatMenuModule, MatNavList
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'metatierrascol-web';
  showMessages=false;
  @ViewChild('appDrawerLeft') appDrawerLeft: MatDrawer = {} as MatDrawer;
  @ViewChild('appDrawerRight') appDrawerRight: MatDrawer = {} as MatDrawer;

  authUserModel:AuthUserModel = new AuthUserModel({});
  userGroupsString:string='';

  constructor (private authService: AuthService, private sidenavsService: SidenavsService,
    private showForRolesService: ShowForRolesService){

    authService.authUserSubject.subscribe({
      next: (value) => {
        this.authUserModel=value;
        this.userGroupsString=this.authUserModel.getGroupsAsString();
      }
    })
    authService.isValidToken();
  }
  toggleAppDrawerLeft(){
    this.sidenavsService.toggleAppDrawerLeft();
  }
  toggleAppDrawerRight(){
    this.sidenavsService.toggleAppDrawerRight();
  }
  toggleShowMessages(){
    this.showMessages=!this.showMessages;
  }

  getAllowedRoles(elementTemplateName:string):string[]{
    return this.showForRolesService.getAllowedRoles(elementTemplateName);
  }

  ngAfterViewInit(): void {
    /**
     * After the view is completed I can get the elements
     * and put them into the service, in order to be
     * available for the rest of the components
     */
    this.sidenavsService.setAppDrawerLeft(this.appDrawerLeft);
    this.sidenavsService.setAppDrawerRight(this.appDrawerRight);
  }
  navigateToAdmin(){
    let url= environment.apiUrl + 'admin/'
    window.open(url,'_blank');
  }
}
