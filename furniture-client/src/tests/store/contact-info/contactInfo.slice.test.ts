import reducer, {
    fetchContactInfoRequest,
    fetchContactInfoSuccess,
    createContactInfoSuccess,
    updateContactInfoSuccess,
    deleteContactInfoSuccess,
    clearSuccess,
    clearUpdateError
} from '../../../store/slice/contactInfo/contactInfo.slice';
import {
    IContactInfoState,
    IAllContactInfo,
    IContactInfoResponse
} from '../../../types/contactInfo.interface';


const initialState: IContactInfoState = {
    contactInfo: [],
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    success: false,
    deleteSuccess: false,
    updateSuccess: false,
    updateError: null,
};

const mockInfo: IAllContactInfo = {
    id: '1',
    createdAt: '',
    updatedAt: '',
    phone: '123456',
    address: '123 St',
    zipCode: '00000',
    city: 'City',
    region: 'Region',
    country: 'Country',
    companyName: null,
    companyTaxId: null,
};

describe('contactInfoSlice', () => {
    it('should handle fetchContactInfoRequest', () => {
        const state = reducer(initialState, fetchContactInfoRequest({ page: 2, pageSize: 10 }));
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
        expect(state.currentPage).toBe(2);
    });

    it('should handle fetchContactInfoSuccess', () => {
        const payload: IContactInfoResponse = {
            contactInfo: [mockInfo],
            totalPages: 5,
        };
        const state = reducer(initialState, fetchContactInfoSuccess(payload));
        expect(state.contactInfo.length).toBe(1);
        expect(state.totalPages).toBe(5);
        expect(state.loading).toBe(false);
    });

    it('should handle createContactInfoSuccess', () => {
        const state = reducer(initialState, createContactInfoSuccess(mockInfo));
        expect(state.contactInfo.length).toBe(1);
        expect(state.success).toBe(true);
        expect(state.currentPage).toBe(1);
    });

    it('should handle updateContactInfoSuccess', () => {
        const preloaded = { ...initialState, contactInfo: [mockInfo] };
        const updated = { ...mockInfo, phone: '999' };
        const state = reducer(preloaded, updateContactInfoSuccess(updated));
        expect(state.contactInfo[0].phone).toBe('999');
        expect(state.updateSuccess).toBe(true);
    });

    it('should handle deleteContactInfoSuccess', () => {
        const preloaded = { ...initialState, contactInfo: [mockInfo] };
        const state = reducer(preloaded, deleteContactInfoSuccess('1'));
        expect(state.contactInfo.length).toBe(0);
        expect(state.deleteSuccess).toBe(true);
    });

    it('should handle clearSuccess and clearUpdateError', () => {
        let state = reducer({ ...initialState, success: true }, clearSuccess());
        expect(state.success).toBe(false);
        state = reducer({ ...initialState, updateError: 'error' }, clearUpdateError());
        expect(state.updateError).toBeNull();
    });
});