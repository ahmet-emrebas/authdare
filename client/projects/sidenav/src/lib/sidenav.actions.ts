import { createAction, createReducer, on, props } from '@ngrx/store';
import { SidenavListItem } from './sidenav.component';

export interface SidenavStoreState {
  sidenavTitle: string;
  sidenavItems: SidenavListItem[];
}

export const setSidenavItems = createAction(
  `[SIDENAV MODULE] SET SIDENAV ITEMS`,
  props<{ sidenavItems: SidenavListItem[] }>()
);

export const addSidenavItem = createAction(
  `[SIDENAV MODULE] SET SIDENAV ITEM`,
  props<{ sidenavItem: SidenavListItem }>()
);

export const setSidenavTitle = createAction(
  `[SIDENAV MODULE] SET SIDENAV TITLE`,
  props<{ sidenavTitle: string }>()
);

export const sidenavReducer = createReducer<SidenavStoreState>(
  {
    sidenavTitle: '',
    sidenavItems: [],
  },

  on(setSidenavTitle, (state, payload) => {
    return { ...state, ...payload };
  }),

  on(setSidenavItems, (state, payload) => {
    return { ...state, ...payload };
  }),

  on(addSidenavItem, (state, payload) => {
    return {
      ...state,
      sidenavItems: [...state.sidenavItems, payload.sidenavItem],
    };
  })
);
