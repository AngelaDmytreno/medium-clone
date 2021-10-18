import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from "src/app/auth/store/selectors";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

@Component({
    selector: 'mc-topBar',
    templateUrl: './topBar.components.html',
    styleUrls: ['./topBar.components.scss']
})

export class TopBarComponent implements OnInit{
 isLoggedIn$: Observable<boolean>
 isAnonymous$: Observable<boolean>
 currentUser$: Observable<CurrentUserInterface | null>
 constructor(private store: Store){}

 ngOnInit(){
   this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
   this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
   this.currentUser$ = this.store.pipe(select(currentUserSelector))
 }
}