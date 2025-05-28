import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box, Button, Typography
} from '@mui/material';

import { EUserRole } from '../../../types/admin.interface';
import { fetchUsersRequest, selectAdmin } from '../../../store/slice/admin/admin.slice';
import {UserAccordionTitle, UserListItemInfo, UserListItemName} from "../../../styles/Admin.styles";
import { AppDispatch } from '../../../store/store';
import theme from '../../../assets/theme';
import UserDetails from './user-details';
import UserEdit from './user-edit';
import { selectUser } from '../../../store/slice/user/user.slice';
import ErrorInfo from '../../status/error';
import { roleLabels } from '../../../common/common-items';
import UserAdd from './user-add';


const Users: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user: adminUser } = useSelector(selectUser);
    const { users, updateUserSuccess } = useSelector(selectAdmin);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    const [isUserEditOpen, setIsUserEditOpen] = useState(false);
    const [expandedRole, setExpandedRole] = useState<EUserRole | false>(false);

    const handleAccordionChange = (role: EUserRole) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedRole(isExpanded ? role : false);
        if (isExpanded) {
            dispatch(fetchUsersRequest({ role }));
        }
    };

    const handleUserDetails = (): void  => {
        setIsUserDetailsOpen(true);
    }

    const handleUserEdit = (): void  => {
        setIsUserEditOpen(true);
    }

    useEffect((): void => {
        if (updateUserSuccess && expandedRole) {
            dispatch(fetchUsersRequest({ role: expandedRole }));
        }
    }, [updateUserSuccess, expandedRole, dispatch]);

    if (!adminUser) {
        return <ErrorInfo />;
    }

    return (
        <Box>
            <Box sx={{mb: 8}}>
                <UserAdd />
            </Box>
            {Object.values(EUserRole).map((role) => (
                <Accordion
                    key={role}
                    expanded={expandedRole === role}
                    onChange={handleAccordionChange(role)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${role}-content`}
                        id={`${role}-header`}
                    >
                        <UserAccordionTitle>{roleLabels[role]}</UserAccordionTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            users.length > 0 ? (
                                users.map((user, index) => (
                                    <Box key={index} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent:' space-between'
                                    }}>
                                        <UserListItemInfo>
                                            <Box>
                                                <UserListItemName>
                                                    {user.firstName} {user.lastName}
                                                </UserListItemName>
                                            </Box>
                                            <Box>
                                                <Typography sx={{color: theme.palette.text.secondary}}>
                                                    {user.email}
                                                </Typography>
                                            </Box>

                                        </UserListItemInfo>
                                        <Box>
                                            <Button color="info" onClick={handleUserDetails}>
                                                <VisibilityIcon sx={{fontSize: '21px'}}/>
                                            </Button>
                                            <Button color="info" disabled={adminUser.role !== 'SUPER_ADMIN'}  onClick={handleUserEdit}>
                                                <ModeEditIcon sx={{fontSize: '21px'}}/>
                                            </Button>
                                        </Box>
                                        {
                                            isUserDetailsOpen &&
                                            <UserDetails
                                                item={user}
                                                isOpen={isUserDetailsOpen}
                                                setIsOpen={setIsUserDetailsOpen}
                                            />
                                        }
                                        {
                                            isUserEditOpen &&
                                            <UserEdit
                                                item={user}
                                                isOpen={isUserEditOpen}
                                                setIsOpen={setIsUserEditOpen}
                                            />
                                        }
                                    </Box>
                                ))
                            ) : (
                                <Typography sx={{color: theme.palette.text.secondary}}>
                                    This section is empty.
                                </Typography>
                            )
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

export default Users;