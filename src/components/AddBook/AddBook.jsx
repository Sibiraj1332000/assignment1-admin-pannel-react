import React, { useRef, useState } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';



const AddBook = () => {


    const [bookName, setBookName] = useState('');
    const [auther, setAuther] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [copy, setCopy] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('');

    const bookNameRef = useRef();
    const autherRef = useRef(null);
    const imageRef = useRef(null);
    const categoryRef = useRef(null);
    const copyRef = useRef(null);
    const priceRef = useRef(null);
    const languageRef = useRef(null);


    // const myRef = useRef(null);

    const handleBookName = (event) => setBookName(event.target.value);
    const handleAuther = (event) => setAuther(event.target.value);
    const handleImage = (event) => setImage(event.target.files[0]);
    const handleCategory = (event) => setCategory(event.target.value);
    const handleCopy = (event) => setCopy(event.target.value);
    const handlePrice = (event) => setPrice(event.target.value);
    const handleLanguage = (event) => setLanguage(event.target.value);

    const handleOnClick = async () => {
        console.log("Handle onClick");
        console.log(bookName, auther, image, category, copy, price, language);
        const formData = new FormData();

        formData.append('bookName', bookName);
        formData.append('auther', auther);
        formData.append('category', category);
        formData.append('copiesRemaining', copy);
        formData.append('price', price);
        formData.append('language', language);
        formData.append('bookImage', image);

        console.log(formData);
        // (bookName, auther, image, category, copy, price, language)
        await axios.post('http://localhost:3001/admin/add_book', formData)
            .then(res => {
                if (res.status === 200) {
                    bookNameRef.current.value = ''
                    autherRef.current.value = ''
                    copyRef.current.value = ''
                    priceRef.current.value = ''
                    imageRef.current.value = ''
                    setLanguage('')
                    setCategory('')
                    setImage('')
                    setBookName('')
                    setAuther('')
                    setCopy('')
                    setPrice('')
                }
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data);

            })

        // bookNameRef.current.value = ''
        // autherRef.current.value = ''
        // copyRef.current.value = ''
        // priceRef.current.value = ''
        // imageRef.current.value = ''
        // setLanguage('')
        // setCategory('')
        // setImage('')
        // setBookName('')
        // setAuther('')
        // setCopy('')
        // setPrice('')

    }






    return (
        <Box
            display='flex'
            maxWidth={900}
            flexDirection='column'
            alignItems='center'
            justifyContent={'center'}
            margin='auto'
            marginTop={15}
            padding={3}
            borderRadius={5}
            boxShadow={'5px 5px 10px #ccc'}
            sx={{
                ":hover": {
                    boxShadow: '10px 10px 20px #ccc'
                }
            }}
        >

            <Grid container spacing={2}>

                <Grid item xs={12}>

                    <Typography
                        variant='h4'
                        padding={3}
                        textAlign='left'
                    > ADD BOOK</Typography>

                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        // value={bookName}
                        type={'text'}
                        variant='outlined'
                        label="Book Name"
                        name='bookName'
                        margin='normal'
                        inputRef={bookNameRef}
                        onChange={handleBookName}
                    ></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth

                        type={'text'}
                        variant='outlined'
                        label="Auther"
                        name='auther'
                        margin='normal'
                        inputRef={autherRef}

                        onChange={handleAuther}
                    // value={auther}
                    ></TextField>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            name="category"
                            label="Category"
                            inputRef={categoryRef}
                            onChange={handleCategory}
                        >
                            <MenuItem value={2}>Poem</MenuItem>
                            <MenuItem value={3}>Novel</MenuItem>
                            <MenuItem value={4}>Story</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            name="language"
                            label="Language"
                            onChange={handleLanguage}
                            // ref={myRef}
                            inputRef={languageRef}
                        >
                            <MenuItem value={1}>English</MenuItem>
                            <MenuItem value={2}>Hindi</MenuItem>
                            <MenuItem value={3}>Malayalam</MenuItem>
                            <MenuItem value={4}>Tamil</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // value={copy}
                        fullWidth
                        type={'number'}
                        variant='outlined'
                        label="Number Of Copy"
                        name='copy'
                        margin='normal'
                        onChange={handleCopy}
                        // ref={myRef}
                        inputRef={copyRef}
                    ></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type={'text'}
                        variant='outlined'
                        label="Price"
                        name='price'
                        margin='normal'
                        onChange={handlePrice}
                        // ref={myRef}
                        inputRef={priceRef}
                    ></TextField>
                </Grid>

                <Grid item xs={12}>
                    {/* <FormControl fullWidth margin='normal'>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel> */}
                    <TextField
                        fullWidth
                        type={'file'}
                        variant='outlined'
                        // label="Number Of Copy"
                        name='image'
                        margin='normal'
                        onChange={handleImage}
                        // ref={myRef}
                        inputRef={imageRef}
                    ></TextField>
                    {/* </FormControl> */}
                </Grid>
                <Grid
                    item xs={12}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent={'center'}
                    margin='auto'
                >
                    <Button
                        variant='contained'
                        color='success'
                        sx={{
                            marginTop: 1,
                            borderRadius: 3,
                        }}
                        onClick={handleOnClick}
                    >Add Book</Button>
                </Grid>
            </Grid>
        </Box >

    )
}

export default AddBook