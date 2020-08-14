import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop';

const PhotoUpload=()=>{
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
    };

    const getBase64=(img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload=(file)=>{
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
            console.log(info)
            // if(info.fileList.length>1){
                
            // }
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageURL) =>{
            setLoading(false)
            setImageUrl(imageURL)
          });
        }
    };

    const uploadButton =(
        <div>
            {loading? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    )

    return(
        <ImgCrop>
            <Upload
                name="photoUpload"
                listType="picture-card"
                showUploadList={false}
                customRequest={dummyRequest}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </ImgCrop>
        
    )
}

export default PhotoUpload