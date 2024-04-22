import React from 'react';
import { GrClose} from 'react-icons/gr';
import { useDispatch } from 'react-redux';



const Modal = ({title, countet, btnText, btnFunc}) => {
    const dispatch = useDispatch();
   

  return (
    <div className='fixed top-0 bottom-0 right-0 w-full h-screen flex items-center justify-center'>
        modal
        <div className='w-1/3 bg-white shadow-lg rounded-md p-4'>

        <div className='border-b py-3 flex items-center justify-between'>
        <div className='text-2xl'>{title}</div>
        <GrClose onClick={() => dispatch(modalFunc())} size={24}/>
            </div>
            <input type={"text"} placeholder={"Ürün Ekle"} name={"name"} id={"name"} onChange={ e=> onChangeFunc(e, "name")} />
            <input type={"text"} placeholder={"Fiyat Ekle"} name={"price"} id={"price"} onChange={ e => onChangeFunc(e, "price")} />
            <input type={"file"} placeholder={"Resim Seç"} name={"url"} id={"url"} onChange={e => onChangeFunc(e, "url")} />
             <Button btnText={btnText} onClick={btnFunc} />
      </div>
</div>
  )
}

export default Modal