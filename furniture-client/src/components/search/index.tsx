import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {
    CircularProgress,
    InputAdornment,
    ListItem,
    Popper
} from '@mui/material';

import theme from '../../assets/theme';
import { AppDispatch, RootState } from '../../store/store';
import { clearSearchResults, searchRequest } from '../../store/slice/catalog/catalog.slice';
import {
    ListItemSearchText,
    SearchBox,
    SearchBtnBox,
    SearchResultList,
    SearchTextField
} from '../../styles/Search.styles';
import { IProduct } from '../../types/catalog.interface';


const Search: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [inputValue, setInputValue] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { searchResults, loading } = useSelector((state: RootState) => state.catalog);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (inputValue.trim().length > 1) {
                dispatch(searchRequest(inputValue));
            } else {
                dispatch(clearSearchResults());
            }
        }, 500);

        return (): void => clearTimeout(delayDebounce);
    }, [inputValue, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                dispatch(clearSearchResults());
                setAnchorEl(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
        setAnchorEl(event.currentTarget);
    };

    return  (
        <>
            <SearchBox ref={containerRef}>
                <SearchTextField
                    value={inputValue}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Search..."
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchBtnBox>
                                    <SearchIcon sx={{
                                        color: theme.palette.text.primary,
                                        fontSize: '26px'
                                    }} />
                                </SearchBtnBox>
                            </InputAdornment>
                        )
                    }}
                />
            </SearchBox>

            <Popper
                open={(!!searchResults.length || loading) && !!anchorEl}
                anchorEl={anchorEl}
                placement="bottom-start"
                sx={{maxWidth: '364px', width: '100%'}}
            >
                <SearchResultList>
                    {loading && (
                        <ListItem>
                            <CircularProgress size={20} />
                        </ListItem>
                    )}
                    {!loading && searchResults.map((item: IProduct) => (
                        <ListItem
                            key={item.id}
                            component="div"
                            onClick={() => {
                                setInputValue(item.name);
                                dispatch(clearSearchResults());
                            }}
                        >
                            <ListItemSearchText primary={item.name} />
                        </ListItem>
                    ))}
                </SearchResultList>
            </Popper>
        </>
    )
}

export default Search;