import React, { useEffect, useState } from 'react';
import Product from '../src/components/ProductCard' ;
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../src/components/Modal';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import { createDataFunc, updateDataFunc } from '../src/redux/dataSlice';
import {modalFunc} from '../src/redux/modalSlice'
import { useLocation, useNavigate } from 'react-router-dom';

const Product = () => {
    const {modal} = useSelector (state => state.modal);
    const {data, keyword} = useSelector (state => state.data);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({name: "", price: "", url: ""})

    const onChangeFunc=(e, type) => {
        if(type == "url") {
            setProductInfo(prev => ({...prev, [e.target.name]: URL.createObjectURL(e.target.files[0])}))
        } else{
            setProductInfo(prev => ({...prev, [e.target.name]: e.target.value}))

        }
    }
    
    let loc = location?.search.split('=')[1]

    useEffect(() =>{
     if(loc) {
        setProductInfo(data.find(dt => dt.id == loc))
     }
    },[loc])


    console.log(location?.search.split('=') [1], "data")

    const buttonFunc = () => {
        dispatch(createDataFunc({...productInfo, id: data.length +1}))
        dispatch(modalFunc());
    }

    const buttonUpdateFunc = () => {
        dispatch(updateDataFunc({...productInfo, id:loc}))
        dispatch(modalFunc());
        navigate('/')
    }

    const contentModal = {
        <div>
        <Input value={productInfo.name} type={"text"} placeholder={"Ürün Ekle"} name={"name"} id={"name"} onChange={ e=> onChangeFunc(e, "name")} />
        <Input value={productInfo.price} type={"text"} placeholder={"Fiyat Ekle"} name={"price"} id={"price"} onChange={ e => onChangeFunc(e, "price")} />
        <Input type={"file"} placeholder={"Resim Seç"} name={"url"} id={"url"} onChange={e => onChangeFunc(e, "url")} />
         <Button btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"} onClick={loc ? buttonUpdateFunc : buttonFunc} />
  <div/>
    }

    const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword));

   return (
    <div className='flex items-center flex-wrap'>
        {
         filteredItems?.map((dt,i) =>(
          <ProductCard key={i} dt={dt} /> 
         ))
        }
        </div>



    <div>
        <ProductCard/>
        {modal && <Modal countent={contentModal} title={loc ? "Ürün Güncelle"} : {"Ürün Oluştur"}/>}
    </div>
  )
}

export default Product