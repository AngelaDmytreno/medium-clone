import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap, tap} from 'rxjs/operators'

import {
    loginAction,
    loginSuccessAction,
    loginFailerAction
  } from '../actions/login.action'
import {AuthService} from '../../services/auth.service'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {of} from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { Router } from '@angular/router'


@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token)
            this.persistanceServices.set('accessToken', currentUser.token);
            return loginSuccessAction({currentUser})
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailerAction({errors: errorResponse.error.errors
            }))
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      console.log('sucs')
      this.router.navigateByUrl('/')
    })
  ),
  {dispatch: false}
  )

  constructor(private actions$: Actions, private authService: AuthService, private persistanceServices: PersistanceService,
     private router: Router) {}
}
