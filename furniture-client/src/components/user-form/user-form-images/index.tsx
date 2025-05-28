import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, TextField, IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { IUserFormImagesProps } from '../../../types/props.interface';
import theme from '../../../assets/theme';


const UserFormImages: React.FC<IUserFormImagesProps> = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({ field: { value, onChange } }) => {
                const images: string[] = value || [];
                const handleAdd = (): void => {
                    onChange([...images, '']);
                };
                const handleRemove = (index: number): void => {
                    const newImages: string[] = images.filter((_, i): boolean => i !== index);
                    onChange(newImages);
                };

                const handleChangeUrl = (index: number, newUrl: string): void => {
                    const newImages: string[] = [...images];
                    newImages[index] = newUrl;
                    onChange(newImages);
                };

                return (
                    <Box>
                        <Typography variant="subtitle1"
                                    sx={{ color: theme.palette.text.secondary}}
                                    gutterBottom
                        >
                            {label}
                        </Typography>
                        {images.length === 0 && (
                            <Typography color="textSecondary" mb={1}>
                                No images added yet
                            </Typography>
                        )}

                        {images.map((img, i) => (
                            <Box key={i} mb={2}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={img}
                                        onChange={(e) =>
                                            handleChangeUrl(i, e.target.value)}
                                        placeholder="Image URL"
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                color: theme.palette.text.secondary,
                                            },
                                        }}
                                    />
                                    <IconButton aria-label="delete" onClick={() => handleRemove(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                {img && (
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`preview-${i}`}
                                        sx={{ mt: 1, width: 120, height: 120, objectFit: 'cover'}}
                                    />
                                )}
                            </Box>
                        ))}
                        <Button variant="outlined" onClick={handleAdd} sx={{ mt: 1 }}>
                            Add Image
                        </Button>
                    </Box>
                );
            }}
        />
    );
};

export default UserFormImages;