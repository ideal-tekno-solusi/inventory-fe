import { JwtClaims } from '@app/types/api.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface UserState {
  isLoggedIn: boolean;
  claims: JwtClaims;
  permissions: string[];
}

const initialState: UserState = {
  isLoggedIn: false,
  claims: {
    exp: null,
    iss: null,
    sub: null,
  },
  permissions: [],
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>(initialState),
  withMethods((store) => ({
    setUser: (user: JwtClaims) => {
      patchState(store, (state) => ({ ...state, isLoggedIn: true, claims: user }));
    },
    setPermissions: (permissions: string[]) => {
      patchState(store, (state) => ({ ...state, permissions }));
    },
  })),
);
