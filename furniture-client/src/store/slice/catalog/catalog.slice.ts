import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { ICatalogState, IProduct } from '../../../types/catalog.interface';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: ICatalogState = {
    bestSellers: [],
    searchResults: [],
    allProducts: [],
    loading: false,
    error: null,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        fetchBestSellersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBestSellersSuccess(state, action: PayloadAction<IProduct[]>) {
            state.loading = false;
            state.bestSellers = action.payload;
        },
        fetchBestSellersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        searchRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
        },
        searchSuccess(state, action: PayloadAction<IProduct[]>) {
            state.searchResults = action.payload;
            state.loading = false;
        },
        searchFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearSearchResults(state) {
            state.searchResults = [];
        }
    },
});

export const {
    fetchBestSellersRequest, fetchBestSellersSuccess, fetchBestSellersFailure,
    searchRequest, searchSuccess, searchFailure, clearSearchResults
} = catalogSlice.actions;


export const selectCatalog = (state: RootState): ICatalogState => state.catalog;

export default catalogSlice.reducer;
