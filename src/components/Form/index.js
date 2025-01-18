import { useState, useEffect } from "react"
import styles from "./Form.module.css";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { getCategories } from "services/api.service";

const validateURL = (url) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%@_.~+&:]*)*' + // port and path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
}

const Form = ({ data, onAdd, onUpdate, onClose, layout }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: data?.title ?? '',
        category: '',
        image: data?.image ?? '',
        video: data?.video ?? '',
        description: data?.description ?? ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
                if (data?.category) {
                    const selectedCategory = categoriesData.find(cat => cat.id == data.category);
                    if (selectedCategory) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            category: selectedCategory.id
                        }));
                    }
                }
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };
        fetchCategories();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let error = '';
        if ((name === 'image' || name === 'video') && !validateURL(value)) {
            error = 'Debe ingresar una URL válida';
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleClear = (e) => {
        setFormData({
            title: '',
            category: '',
            image: '',
            video: '',
            description: ''
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.title) validationErrors.title = 'El título es requerido';
        if (!formData.category) validationErrors.category = 'La categoría es requerida';
        if (!formData.image || !validateURL(formData.image)) validationErrors.image = 'La imagen es requerida';
        if (!formData.video || !validateURL(formData.video)) validationErrors.video = 'El video es requerido';
        if (!formData.description) validationErrors.description = 'La descripción es requerida';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            if (data?.id) {
                onUpdate(data.id, formData);
            } else {
                onAdd(formData);
                handleClear();
            }
            if (onClose) {
                onClose();
            }
        }
    };

    const customTextFieldStyles = {
        input: { color: 'white', fontSize: '16px' },
        label: { color: 'white' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: '#2271d1d9;',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#2271d1d9',
            },
        },
        '& .MuiFormHelperText-root': {
            color: 'red',
        },
        '& .MuiInputBase-root': {
            color: 'white'
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className={layout === "horizontal" ? styles.horizontalRow : ''}>
                <TextField
                    label="Título"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={customTextFieldStyles}
                />
                <FormControl fullWidth margin="dense" size="small" error={!!errors.category} sx={customTextFieldStyles}>
                    <InputLabel id="category-select">Categoria</InputLabel>
                    <Select
                        labelId="category-select"
                        value={formData.category}
                        label="Categoría"
                        onChange={handleChange}
                        name="category"
                        error={!!errors.category}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        ))}
                    </Select>
                    {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
            </div>
            <div className={layout === "horizontal" ? styles.horizontalRow : ''}>
                <TextField
                    label="Imagen"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    error={!!errors.image}
                    helperText={errors.image}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={customTextFieldStyles}
                />
                <TextField
                    label="Video"
                    name="video"
                    value={formData.video}
                    onChange={handleChange}
                    error={!!errors.video}
                    helperText={errors.video}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={customTextFieldStyles}
                />
            </div>
            <TextField
                label="Descripción"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                margin="dense"
                size="small"
                sx={customTextFieldStyles}
            />
            <div className={styles.btn}>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>Guardar</Button>
                <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={handleClear}>Limpiar</Button>
            </div>
        </form>
    );
};

export default Form